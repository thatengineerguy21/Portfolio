/**
 * Particle text canvas – ES module.
 * Call initParticleCanvas(text) after DOM is ready.
 */
export default function initParticleCanvas(text) {
    // Create canvas and append to body so it sits behind #root
    let canvas = document.getElementById('canvas1');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'canvas1';
        document.body.prepend(canvas);
    }
    const ctx = canvas.getContext('2d', {
        willReadFrequently: true
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ─── Animation phases ────────────────────────────────────────────────────
    // 'scatter'    – particles start at random positions
    // 'forming'    – particles ease toward their text origins
    // 'connecting' – lines fade in once particles are settled
    // 'physics'    – normal interactive loop with lines fully visible (5s)
    // 'dissolve'   – particles scatter freely, mouse + lines still active
    let phase = 'scatter';
    let linesOpacity = 0;          // 0 → 1 during 'connecting'
    const LINE_FADE_SPEED = 0.015; // ease-in speed for line opacity
    const SETTLE_THRESHOLD = 1.5;  // px distance considered "settled"
    const CONNECT_DIST = 40;       // max px between connected particles
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
    const SCATTER_FRAMES = 60;     // frames to stay in scatter phase
    const PHYSICS_DURATION = 600;  // ~10 seconds at 60fps before dissolve
    let scatterFrame = 0;
    let physicsFrame = 0;

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.canvasWidth;
            this.y = Math.random() * this.effect.canvasHeight;
            this.color = color;
            this.originX = x;
            this.originY = y;
            this.size = this.effect.gap - 2;
            this.dx = 0;
            this.dy = 0;
            this.vx = 0;
            this.vy = 0;
            this.force = 0;
            this.angle = 0;
            this.distance = 0;
            this.friction = Math.random() * 0.6 + 0.15;
            this.ease = Math.random() * 0.1 + 0.005;
        }
        draw() {
            const ctx = this.effect.context;
            const r = this.size / 2;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x + r, this.y + r, r, 0, Math.PI * 2);
            ctx.fill();
        }
        /** Returns true when particle is close enough to its origin. */
        isSettled() {
            const dx = this.originX - this.x;
            const dy = this.originY - this.y;
            return (dx * dx + dy * dy) < SETTLE_THRESHOLD * SETTLE_THRESHOLD;
        }
        update(applyMouse) {
            if (applyMouse) {
                this.dx = this.effect.mouse.x - this.x;
                this.dy = this.effect.mouse.y - this.y;
                this.distance = this.dx * this.dx + this.dy * this.dy;
                this.force = -this.effect.mouse.radius / this.distance;
                if (this.distance < this.effect.mouse.radius) {
                    this.angle = Math.atan2(this.dy, this.dx);
                    this.vx += this.force * Math.cos(this.angle);
                    this.vy += this.force * Math.sin(this.angle);
                }
            }
            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
        /** Free-floating update – no origin pull, just velocity + mouse */
        updateFree() {
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = -this.effect.mouse.radius / this.distance;
            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }
            this.vx *= 0.99;
            this.vy *= 0.99;
            // Keep particles drifting – re-boost if speed drops too low
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed < 0.2) {
                const angle = Math.atan2(this.vy, this.vx) || (Math.random() * Math.PI * 2);
                this.vx = Math.cos(angle) * 0.3;
                this.vy = Math.sin(angle) * 0.3;
            }
            this.x += this.vx;
            this.y += this.vy;
            // Wrap around edges
            const w = this.effect.canvasWidth;
            const h = this.effect.canvasHeight;
            if (this.x < -this.size) this.x = w;
            else if (this.x > w + this.size) this.x = 0;
            if (this.y < -this.size) this.y = h;
            else if (this.y > h + this.size) this.y = 0;
        }
        /** Give particle a random scatter velocity */
        scatter() {
            const speed = Math.random() * 0.5 + 0.2;
            const angle = Math.random() * Math.PI * 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
        }
    }

    class Effect {
        constructor(context, canvasWidth, canvasHeight) {
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.fontSize = 150;
            this.lineHeight = this.fontSize * 1.1;
            this.maxTextWidth = this.canvasWidth * 0.8;
            this.verticalOffset = 0;
            this.particles = [];
            this.gap = 10;
            this.mouse = {
                radius: 20000,
                x: 0,
                y: 0
            };
            window.addEventListener('mousemove', (event) => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
            });
        }
        wrapText(text) {
            const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
            gradient.addColorStop(0.3, 'red');
            gradient.addColorStop(0.5, 'fuchsia');
            gradient.addColorStop(0.7, 'blue');
            this.context.fillStyle = gradient;
            this.context.font = this.fontSize + 'px "Exo 2", sans-serif';
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.strokeStyle = 'blue';
            let linesArray = [];
            let words = text.split(' ');
            let lineCounter = 0;
            let line = '';
            for (let i = 0; i < words.length; i++) {
                let testLine = line + words[i] + ' ';
                if (this.context.measureText(testLine).width > this.maxTextWidth) {
                    line = words[i] + ' ';
                    lineCounter++;
                } else {
                    line = testLine;
                }
                linesArray[lineCounter] = line;
            }
            let textHeight = this.lineHeight * lineCounter;
            let textY = this.canvasHeight / 2 - textHeight / 2 + this.verticalOffset;
            linesArray.forEach((line, index) => {
                this.context.fillText(line, this.textX, textY + (index * this.lineHeight));
            });
            this.convertToParticles();
        }
        convertToParticles() {
            this.particles = [];
            const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            for (let y = 0; y < this.canvasHeight; y += this.gap) {
                for (let x = 0; x < this.canvasWidth; x += this.gap) {
                    const index = (y * this.canvasWidth + x) * 4;
                    const alpha = pixels[index + 3];
                    if (alpha > 0) {
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        const color = `rgb(${red},${green},${blue})`;
                        const rgbaBase = `rgba(${red},${green},${blue},`;
                        const p = new Particle(this, x, y, color);
                        p.rgbaBase = rgbaBase;
                        this.particles.push(p);
                    }
                }
            }
        }
        render(applyMouse) {
            this.particles.forEach(particle => {
                particle.update(applyMouse);
                particle.draw();
            });
        }
        resize(width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.maxTextWidth = this.canvasWidth * 0.8;
        }
    }

    // ─── Grid-based connect – Spatial Hashing for O(n) performance ───────────
    let gridHead = null;
    let gridNext = null;

    function connect(opacity) {
        if (opacity <= 0) return;
        const particles = effect.particles;
        const n = particles.length;
        if (n === 0) return;

        ctx.lineWidth = 1;
        ctx.globalAlpha = opacity;

        // Ensure grid arrays are sized correctly
        const cols = Math.ceil(effect.canvasWidth / CONNECT_DIST) + 1;
        const rows = Math.ceil(effect.canvasHeight / CONNECT_DIST) + 1;
        const cellCount = cols * rows;

        if (!gridHead || gridHead.length < cellCount) {
            gridHead = new Int32Array(cellCount);
        }
        if (!gridNext || gridNext.length < n) {
            gridNext = new Int32Array(n);
        }

        gridHead.fill(-1, 0, cellCount);

        // Populate grid
        for (let i = 0; i < n; i++) {
            const p = particles[i];
            let cx = Math.floor(p.x / CONNECT_DIST);
            let cy = Math.floor(p.y / CONNECT_DIST);

            if (cx < 0) cx = 0; else if (cx >= cols) cx = cols - 1;
            if (cy < 0) cy = 0; else if (cy >= rows) cy = rows - 1;

            const cellIndex = cy * cols + cx;
            gridNext[i] = gridHead[cellIndex];
            gridHead[cellIndex] = i;
        }

        // Iterate particles and check neighboring cells
        for (let i = 0; i < n; i++) {
            const pa = particles[i];
            const cx = Math.floor(pa.x / CONNECT_DIST);
            const cy = Math.floor(pa.y / CONNECT_DIST);

            // Check the 3x3 surrounding cells
            for (let dy = -1; dy <= 1; dy++) {
                const ny = cy + dy;
                if (ny < 0 || ny >= rows) continue;
                for (let dx = -1; dx <= 1; dx++) {
                    const nx = cx + dx;
                    if (nx < 0 || nx >= cols) continue;

                    let currIndex = gridHead[ny * cols + nx];
                    while (currIndex !== -1) {
                        if (currIndex > i) {
                            const pb = particles[currIndex];
                            const rA = pa.size / 2;
                            const rB = pb.size / 2;
                            const deltaX = (pa.x + rA) - (pb.x + rB);
                            const deltaY = (pa.y + rA) - (pb.y + rB);
                            const distSq = deltaX * deltaX + deltaY * deltaY;
                            if (distSq < CONNECT_DIST_SQ) {
                                const alpha = Math.pow(1 - Math.sqrt(distSq) / CONNECT_DIST, 0.4);
                                ctx.strokeStyle = pa.rgbaBase + alpha + ')';
                                ctx.beginPath();
                                ctx.moveTo(pa.x + rA, pa.y + rA);
                                ctx.lineTo(pb.x + rB, pb.y + rB);
                                ctx.stroke();
                            }
                        }
                        currIndex = gridNext[currIndex];
                    }
                }
            }
        }
        ctx.globalAlpha = 1; // restore
    }

    const effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText(text);

    // ─── Check if enough particles have settled ───────────────────────────────
    function checkSettled(fraction = 0.90) {
        const particles = effect.particles;
        if (particles.length === 0) return true;
        let settled = 0;
        for (let i = 0; i < particles.length; i++) {
            if (particles[i].isSettled()) settled++;
        }
        return settled / particles.length >= fraction;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (phase === 'scatter') {
            effect.render(false);
            scatterFrame++;
            if (scatterFrame >= SCATTER_FRAMES) phase = 'forming';

        } else if (phase === 'forming') {
            effect.render(false);
            if (checkSettled(0.90)) phase = 'connecting';

        } else if (phase === 'connecting') {
            effect.render(false);
            linesOpacity = Math.min(1, linesOpacity + LINE_FADE_SPEED);
            connect(linesOpacity);
            if (linesOpacity >= 1) phase = 'physics';

        } else if (phase === 'physics') {
            // Full interactive loop for 5 seconds
            effect.render(true);
            connect(1);
            physicsFrame++;
            if (physicsFrame >= PHYSICS_DURATION) {
                // Kick each particle into a random direction
                effect.particles.forEach(p => p.scatter());
                phase = 'dissolve';
            }

        } else {
            // 'dissolve' – free-floating particles, mouse + lines still active
            effect.particles.forEach(particle => {
                particle.updateFree();
                particle.draw();
            });
            connect(1);
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        effect.resize(canvas.width, canvas.height);
        effect.wrapText(text);
        phase = 'scatter';
        linesOpacity = 0;
        scatterFrame = 0;
        physicsFrame = 0;
    });
}
