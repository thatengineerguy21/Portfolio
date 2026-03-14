import React, { useEffect, useRef } from "react";
import "./DotRing.css";

const DotRing = () => {
    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const hoveredElRef = useRef(null);
    const isHoveredRef = useRef(false);

    useEffect(() => {
        let animationFrameId;
        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
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

            if (isHoveredRef.current && hoveredElRef.current) {
                const rect = hoveredElRef.current.getBoundingClientRect();
                const computedStyle = getComputedStyle(hoveredElRef.current);
                const borderRadius = computedStyle.borderRadius || "15px";
                const padding = 8; // extra breathing room around the element

                // Morph ring to element shape
                ring.style.left = `${rect.left + rect.width / 2}px`;
                ring.style.top = `${rect.top + rect.height / 2}px`;
                ring.style.width = `${rect.width + padding * 2}px`;
                ring.style.height = `${rect.height + padding * 2}px`;
                ring.style.borderRadius = borderRadius;
                ring.style.transform = "translate(-50%, -50%)";
                ring.style.borderColor = "rgba(255, 255, 255, 0.6)";
                ring.style.borderWidth = "2px";

                // Hide the dot when hovering
                dot.style.opacity = "0";
            } else {
                // Default cursor — follow mouse
                ring.style.left = `${mouseX}px`;
                ring.style.top = `${mouseY}px`;
                ring.style.width = "22px";
                ring.style.height = "22px";
                ring.style.borderRadius = "100%";
                ring.style.transform = "translate(-50%, -50%)";
                ring.style.borderColor = "rgb(255, 253, 253)";
                ring.style.borderWidth = "2px";

                dot.style.left = `${mouseX}px`;
                dot.style.top = `${mouseY}px`;
                dot.style.opacity = "1";
            }

            animationFrameId = requestAnimationFrame(render);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);
        animationFrameId = requestAnimationFrame(render);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <div ref={ringRef} className="ring"></div>
            <div ref={dotRef} className="dot"></div>
        </>
    );
};

export default DotRing;
