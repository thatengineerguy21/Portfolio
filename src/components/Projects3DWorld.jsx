import React, { useMemo, useRef, useEffect } from 'react';
import { useHyperScroll } from '../hooks/useHyperScroll';
import '../styles/Projects3DWorld.css';

const CONFIG = {
    itemCount: 20,
    starCount: 150,
    zGap: 800,
    loopSize: 20 * 800,
    camSpeed: 2.5,
    colors: ['#ff003c', '#00f3ff', '#ccff00', '#ffffff']
};

const Projects3DWorld = ({ projects, isActive }) => {
    const worldRef = useRef(null);
    const viewportRef = useRef(null);
    const fpsRef = useRef(null);
    const velReadoutRef = useRef(null);
    const coordRef = useRef(null);
    const itemsRef = useRef([]);
    const containerRef = useRef(null);

    // Generate static item positions on mount
    const itemsData = useMemo(() => {
        const arr = [];
        // Determine window dimensions safely
        const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
        const h = typeof window !== 'undefined' ? window.innerHeight : 1080;

        // Cards and Texts
        for (let i = 0; i < CONFIG.itemCount; i++) {
            const isHeading = i % 4 === 0;
            const project = projects[i % projects.length]; // cycle through given projects

            if (isHeading) {
                arr.push({
                    type: 'text',
                    text: "PROJECTS",
                    x: 0, y: 0, rot: 0,
                    baseZ: -i * CONFIG.zGap
                });
            } else {
                const angle = (i / CONFIG.itemCount) * Math.PI * 6;
                const radius = 400 + Math.random() * 200;
                const x = Math.cos(angle) * (w * 0.3); // More centered
                const y = Math.sin(angle) * (h * 0.3);
                const rot = (Math.random() - 0.5) * 30;
                const randId = Math.floor(Math.random() * 9999);

                arr.push({
                    type: 'card',
                    project,
                    cardId: `ID-${randId}`,
                    indexLabel: `0${i}`,
                    x, y, rot,
                    baseZ: -i * CONFIG.zGap
                });
            }
        }

        // Stars
        for (let i = 0; i < CONFIG.starCount; i++) {
            arr.push({
                type: 'star',
                x: (Math.random() - 0.5) * 3000,
                y: (Math.random() - 0.5) * 3000,
                baseZ: -Math.random() * CONFIG.loopSize
            });
        }

        return arr;
    }, [projects]);

    // Hook up scroll physics
    useHyperScroll({
        isActive,
        itemsRef,
        worldRef,
        viewportRef,
        velReadoutRef,
        fpsRef,
        coordRef,
        config: CONFIG,
        containerRef
    });

    const setItemRef = (index, el) => {
        if (!el) return;
        if (!itemsRef.current[index]) {
            itemsRef.current[index] = { ...itemsData[index], el };
        } else {
            itemsRef.current[index].el = el;
        }
    };

    if (!isActive) return null;

    return (
        <div className="brutal-mode-container" ref={containerRef}>
            {/* OVERLAYS */}
            <div className="scanlines"></div>
            <div className="vignette"></div>
            <div className="noise"></div>

            {/* HUD */}
            <div className="hud">
                <div className="hud-top">
                    <span>SYS.READY</span>
                    <div className="hud-line"></div>
                    <span>FPS: <strong ref={fpsRef}>60</strong></span>
                </div>
                <div className="center-nav"
                    style={{
                        alignSelf: 'flex-start',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)'
                    }}>
                    SCROLL VELOCITY // <strong ref={velReadoutRef}>0.00</strong>
                </div>
                <div className="hud-bottom">
                    <span>COORD: <strong ref={coordRef}>000.000</strong></span>
                    <div className="hud-line"></div>
                    <span>VER 2.0.4 [BETA]</span>
                </div>
            </div>

            {/* 3D WORLD */}
            <div className="viewport" ref={viewportRef}>
                <div className="world" ref={worldRef}>
                    {itemsData.map((item, index) => {
                        if (item.type === 'text') {
                            return (
                                <div key={`text-${index}`} className="item" ref={(el) => setItemRef(index, el)}>
                                    <div className="big-text">{item.text}</div>
                                </div>
                            );
                        } else if (item.type === 'card') {
                            const { project, cardId, indexLabel } = item;
                            return (
                                <div key={`card-${index}`} className="item" ref={(el) => setItemRef(index, el)}>
                                    <div className="card-3d">
                                        <div className="card-3d-header">
                                            <span className="card-3d-id">{cardId}</span>
                                            <div style={{ width: '10px', height: '10px', background: 'var(--accent)' }}></div>
                                        </div>
                                        <h2>{project.name}</h2>
                                        
                                        <div className="card-3d-links">
                                            {project.liveUrl && (
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="card-3d-link">Live</a>
                                            )}
                                            {project.repoUrl && (
                                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="card-3d-link">Repo</a>
                                            )}
                                            {project.hackathonUrl && (
                                                <a href={project.hackathonUrl} target="_blank" rel="noopener noreferrer" className="card-3d-link">Hack</a>
                                            )}
                                        </div>

                                        <div className="card-3d-footer">
                                            <span>TECH: {project.tags?.slice(0, 2).join(' x ') || 'N/A'}</span>
                                            <span>DATA: {(Math.random() * 100).toFixed(1)}MB</span>
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', fontSize: '4rem', opacity: 0.1, fontWeight: 900 }}>
                                            {indexLabel}
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (item.type === 'star') {
                            return (
                                <div key={`star-${index}`} className="star" ref={(el) => setItemRef(index, el)}></div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            <div className="scroll-proxy"></div>
        </div>
    );
};

export default Projects3DWorld;
