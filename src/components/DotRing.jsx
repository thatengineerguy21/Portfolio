import React, { useEffect, useRef, useState } from "react";
import "../styles/DotRing.css";

// Global state to persist cursor position across route transitions
let globalMouseX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
let globalMouseY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
        globalMouseX = e.clientX;
        globalMouseY = e.clientY;
    }, { passive: true });
}

const DotRing = () => {
    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const hoveredElRef = useRef(null);
    const isHoveredRef = useRef(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(pointer: coarse)");
        setIsTouchDevice(mediaQuery.matches);
        
        const changeHandler = (e) => setIsTouchDevice(e.matches);
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", changeHandler);
            return () => mediaQuery.removeEventListener("change", changeHandler);
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(changeHandler);
            return () => mediaQuery.removeListener(changeHandler);
        }
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        let animationFrameId;
        let mouseX = globalMouseX;
        let mouseY = globalMouseY;
        let ringX = mouseX;
        let ringY = mouseY;
        let dotX = mouseX;
        let dotY = mouseY;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            globalMouseX = mouseX;
            globalMouseY = mouseY;
        };

        // Find the closest ancestor (or self) with [data-cursor-hover]
        const getHoverTarget = (el) => {
            if (!el) return null;
            return el.closest("[data-cursor-hover]");
        };

        const onMouseOver = (e) => {
            const target = getHoverTarget(e.target);
            if (target && target !== hoveredElRef.current) {
                hoveredElRef.current = target;
                isHoveredRef.current = true;
                target.classList.add("cursor-highlighted");
            }
        };

        const onMouseOut = (e) => {
            const target = getHoverTarget(e.target);
            const related = getHoverTarget(e.relatedTarget);

            // Only unhover if we actually left the hoverable element
            if (target && target !== related) {
                target.classList.remove("cursor-highlighted");
                hoveredElRef.current = null;
                isHoveredRef.current = false;
            }
        };

        const render = () => {
            const ring = ringRef.current;
            const dot = dotRef.current;

            if (!ring || !dot) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            let targetRingX = mouseX;
            let targetRingY = mouseY;

            if (isHoveredRef.current && hoveredElRef.current) {
                // If the element was removed from the DOM (e.g., during a route transition), reset hover state
                if (!document.body.contains(hoveredElRef.current)) {
                    isHoveredRef.current = false;
                    hoveredElRef.current = null;
                } else {
                    const rect = hoveredElRef.current.getBoundingClientRect();
                    const computedStyle = getComputedStyle(hoveredElRef.current);
                    const borderRadius = computedStyle.borderRadius || "15px";
                    const padding = 8; // extra breathing room around the element

                    targetRingX = rect.left + rect.width / 2;
                    targetRingY = rect.top + rect.height / 2;

                    // Morph ring to element shape
                    ring.style.width = `${rect.width + padding * 2}px`;
                    ring.style.height = `${rect.height + padding * 2}px`;
                    ring.style.borderRadius = borderRadius;
                    ring.style.borderColor = "rgba(255, 255, 255, 0.6)";
                    ring.style.borderWidth = "2px";

                    // Hide the dot when hovering
                    dot.style.opacity = "0";
                }
            } 
            
            if (!isHoveredRef.current || !hoveredElRef.current) {
                // Default cursor — follow mouse
                ring.style.width = "32px";
                ring.style.height = "32px";
                ring.style.borderRadius = "100%";
                ring.style.borderColor = "rgb(255, 253, 253)";
                ring.style.borderWidth = "2px";

                dot.style.opacity = "1";
            }

            // Lerp positions
            ringX += (targetRingX - ringX) * 0.2;
            ringY += (targetRingY - ringY) * 0.2;

            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;

            // Apply positions with GPU acceleration
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

            animationFrameId = requestAnimationFrame(render);
        };

        document.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseover", onMouseOver, { passive: true });
        document.addEventListener("mouseout", onMouseOut, { passive: true });
        animationFrameId = requestAnimationFrame(render);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isTouchDevice]);

    if (isTouchDevice) return null;

    return (
        <>
            <div ref={ringRef} className="ring"></div>
            <div ref={dotRef} className="dot"></div>
        </>
    );
};

export default DotRing;
