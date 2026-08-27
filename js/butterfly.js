/**
 * Elegant Live Butterfly Animation
 * Follows a smooth, organic, randomized flight path across the screen.
 */
(function() {
    'use strict';

    // 1. Inject CSS for Butterfly
    const style = document.createElement('style');
    style.innerHTML = `
        .wedding-butterfly-container {
            position: fixed;
            top: 0; left: 0;
            width: 35px; height: 35px; /* Elegant, small size */
            pointer-events: none; /* Never block interactions */
            z-index: 45; /* Below modals/lightboxes (usually 100+), above backgrounds */
            transform-origin: center center;
            will-change: transform;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));
        }
        .wedding-butterfly {
            width: 100%; height: 100%;
            overflow: visible;
        }
        .bfly-wing {
            transform-origin: 50% 50%;
            will-change: transform;
        }
    `;
    document.head.appendChild(style);

    // 2. SVG Markup
    const svgMarkup = `
        <svg class="wedding-butterfly" viewBox="0 0 100 100">
            <defs>
                <linearGradient id="bfly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FF007F" />
                    <stop offset="50%" stop-color="#7000FF" />
                    <stop offset="100%" stop-color="#00D2FF" />
                </linearGradient>
            </defs>
            <!-- Left Wing -->
            <g class="bfly-wing bfly-wing-left">
                <path d="M 50 45 C 30 20, 5 15, 5 40 C 0 60, 20 70, 35 60 C 25 80, 35 95, 48 85 Z" fill="url(#bfly-grad)" opacity="0.9" stroke="#FFFFFF" stroke-width="1.5"/>
            </g>
            <!-- Right Wing -->
            <g class="bfly-wing bfly-wing-right">
                <path d="M 50 45 C 70 20, 95 15, 95 40 C 100 60, 80 70, 65 60 C 75 80, 65 95, 52 85 Z" fill="url(#bfly-grad)" opacity="0.9" stroke="#FFFFFF" stroke-width="1.5"/>
            </g>
            <!-- Body -->
            <ellipse cx="50" cy="48" rx="2" ry="14" fill="#5A4A3A" opacity="0.85"/>
            <!-- Antennae -->
            <path d="M 49 34 C 45 25, 40 20, 38 18" fill="none" stroke="#5A4A3A" stroke-width="1" stroke-linecap="round" opacity="0.8"/>
            <path d="M 51 34 C 55 25, 60 20, 62 18" fill="none" stroke="#5A4A3A" stroke-width="1" stroke-linecap="round" opacity="0.8"/>
        </svg>
    `;

    const container = document.createElement('div');
    container.className = 'wedding-butterfly-container';
    container.innerHTML = svgMarkup;
    document.body.appendChild(container);

    const wingL = container.querySelector('.bfly-wing-left');
    const wingR = container.querySelector('.bfly-wing-right');

    // 3. Flight Logic Variables
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let angle = Math.random() * Math.PI * 2;
    let targetAngle = angle;
    let velocity = 0;
    let targetVelocity = 1.0;
    let scale = 0.8;
    let targetScale = 0.8;

    let flapAngle = 0;
    let flapSpeed = 0.2;
    let state = 'flying'; // 'flying', 'gliding', 'hovering'
    let stateTimer = 0;

    // Detect if mobile to adjust scaling and speed
    const isMobile = window.innerWidth <= 768;
    const baseSpeed = isMobile ? 0.7 : 1.2;
    const baseScale = isMobile ? 0.6 : 0.8;

    function update() {
        stateTimer--;

        // State Machine
        if (stateTimer <= 0) {
            const r = Math.random();
            if (r < 0.6) {
                state = 'flying';
                targetVelocity = baseSpeed * (1.2 + Math.random() * 1.5);
                stateTimer = 60 + Math.random() * 120;
            } else if (r < 0.85) {
                state = 'gliding';
                targetVelocity = baseSpeed * (0.8 + Math.random() * 0.5);
                stateTimer = 40 + Math.random() * 80;
            } else {
                state = 'hovering';
                targetVelocity = baseSpeed * (0.1 + Math.random() * 0.3);
                stateTimer = 30 + Math.random() * 60;
                // Random turn while hovering
                targetAngle = angle + (Math.random() - 0.5) * Math.PI;
            }

            // Depth change (simulate flying closer/further)
            if (Math.random() < 0.3) {
                targetScale = baseScale * (0.7 + Math.random() * 0.5);
            }
        }

        // Smooth adjustments
        velocity += (targetVelocity - velocity) * 0.05;
        scale += (targetScale - scale) * 0.01;

        // Steering (wander)
        if (state !== 'hovering') {
            targetAngle += (Math.random() - 0.5) * 0.15;
        }
        
        // Softly turn towards target angle
        const diff = Math.atan2(Math.sin(targetAngle - angle), Math.cos(targetAngle - angle));
        angle += diff * 0.05;

        // Soft Boundary Reflection
        const margin = isMobile ? 30 : 60;
        if (x < margin) targetAngle = 0; // go right
        else if (x > window.innerWidth - margin) targetAngle = Math.PI; // go left
        if (y < margin) targetAngle = Math.PI / 2; // go down
        else if (y > window.innerHeight - margin) targetAngle = -Math.PI / 2; // go up

        // Move
        x += Math.cos(angle) * velocity;
        y += Math.sin(angle) * velocity;

        // Wing Flapping Logic
        if (state === 'flying') {
            flapSpeed = 0.35 + (velocity * 0.1);
        } else if (state === 'hovering') {
            flapSpeed = 0.45;
        } else if (state === 'gliding') {
            flapSpeed = 0.05;
            flapAngle += (0 - flapAngle) * 0.1; // settle wings flat
        }

        if (state !== 'gliding') {
            flapAngle += flapSpeed;
        }

        const maxFlap = 65; // Max degrees of flap
        const wingRotate = Math.sin(flapAngle) * maxFlap;
        
        // Orient butterfly (SVG heads UP initially, so add 90 deg)
        const rotateDeg = (angle * 180 / Math.PI) + 90; 

        // Apply transforms
        container.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotateDeg}deg) scale(${scale})`;
        
        // Apply 3D wing rotation for flap effect
        wingL.style.transform = `rotateY(${wingRotate}deg)`;
        wingR.style.transform = `rotateY(${-wingRotate}deg)`;

        requestAnimationFrame(update);
    }

    // Start Animation
    requestAnimationFrame(update);

    // Handle Resize boundaries
    window.addEventListener('resize', () => {
        if (x > window.innerWidth) x = window.innerWidth - 20;
        if (y > window.innerHeight) y = window.innerHeight - 20;
    });

})();
