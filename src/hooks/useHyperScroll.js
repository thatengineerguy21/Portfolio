import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useHyperScroll = ({
    isActive,
    itemsRef,
    worldRef,
    viewportRef,
    velReadoutRef,
    fpsRef,
    coordRef,
    config,
    containerRef
}) => {
    const stateRef = useRef({
        scroll: 0,
        velocity: 0,
        targetSpeed: 0,
        mouseX: 0,
        mouseY: 0,
        lastTime: 0
    });

    const lenisRef = useRef(null);
    const rafIdRef = useRef(null);

    useEffect(() => {
        if (!isActive) return;

        const state = stateRef.current;

        // --- INIT LENIS ---
        lenisRef.current = new Lenis({
            wrapper: containerRef?.current || window,
            content: containerRef?.current?.querySelector('.scroll-proxy') || document.documentElement,
            smooth: true,
            lerp: 0.08, // Increased weight for heavy feel
            direction: 'vertical',
            gestureDirection: 'vertical',
            smoothTouch: true
        });

        lenisRef.current.on('scroll', ({ scroll, velocity }) => {
            state.scroll = scroll;
            state.targetSpeed = velocity;
        });

        const handleMouseMove = (e) => {
            state.mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            state.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const modC = config.loopSize;
        const camSpeed = config.camSpeed;

        const raf = (time) => {
            lenisRef.current?.raf(time);

            // FPS
            const delta = time - state.lastTime;
            state.lastTime = time;
            if (time % 10 < 1 && fpsRef.current) {
                fpsRef.current.innerText = Math.round(1000 / delta);
            }

            // Smooth Velocity
            state.velocity += (state.targetSpeed - state.velocity) * 0.1;

            // HUD Updates
            if (velReadoutRef.current) velReadoutRef.current.innerText = Math.abs(state.velocity).toFixed(2);
            if (coordRef.current) coordRef.current.innerText = `${state.scroll.toFixed(0)}`;

            // --- RENDER LOGIC ---

            // 1. Camera Tilt & Shake
            const tiltX = state.mouseY * 5 - state.velocity * 0.5;
            const tiltY = state.mouseX * 5;

            if (worldRef.current) {
                worldRef.current.style.transform = `
                    rotateX(${tiltX}deg) 
                    rotateY(${tiltY}deg)
                `;
            }

            // 2. Dynamic Perspective (Warp)
            const baseFov = 1000;
            const fov = baseFov - Math.min(Math.abs(state.velocity) * 10, 600);
            if (viewportRef.current) {
                viewportRef.current.style.perspective = `${fov}px`;
            }

            // 3. Item Loop
            const cameraZ = state.scroll * camSpeed;

            itemsRef.current.forEach(item => {
                if (!item || !item.el) return;
                
                let relZ = item.baseZ + cameraZ;

                // Infinite Wrapping modulo
                let vizZ = ((relZ % modC) + modC) % modC;
                if (vizZ > 500) vizZ -= modC; // Wrap back if too close/behind

                // Determine Opacity
                let alpha = 1;
                if (vizZ < -3000) alpha = 0;
                else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;

                if (vizZ > 100 && item.type !== 'star') alpha = 1 - ((vizZ - 100) / 400);

                if (alpha < 0) alpha = 0;
                item.el.style.opacity = alpha;

                if (alpha > 0) {
                    let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;

                    if (item.type === 'star') {
                        // Warp Stars
                        const stretch = Math.max(1, Math.min(1 + Math.abs(state.velocity) * 0.1, 10));
                        trans += ` scale3d(1, 1, ${stretch})`;
                    } else if (item.type === 'text') {
                        trans += ` rotateZ(${item.rot}deg)`;
                        // RGB Split effect on text (simulated with text-shadow)
                        if (Math.abs(state.velocity) > 1) {
                            const offset = state.velocity * 2;
                            item.el.style.textShadow = `${offset}px 0 red, ${-offset}px 0 cyan`;
                        } else {
                            item.el.style.textShadow = 'none';
                        }
                    } else {
                        // Card floats
                        const t = time * 0.001;
                        const float = Math.sin(t + item.x) * 10;
                        trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
                    }

                    item.el.style.transform = trans;
                } else {
                    // if totally invisible, set a fixed transform out of view to save paint
                    // actually setting opacity 0 is enough, but wait:
                    // item.el.style.transform = `translate3d(0, 0, -10000px)`; 
                }
            });

            rafIdRef.current = requestAnimationFrame(raf);
        };

        rafIdRef.current = requestAnimationFrame(raf);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            if (lenisRef.current) lenisRef.current.destroy();
            lenisRef.current = null;
        };
    }, [isActive, config, itemsRef, worldRef, viewportRef, velReadoutRef, fpsRef, coordRef]);

    return { lenis: lenisRef.current };
};
