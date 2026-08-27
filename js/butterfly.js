/**
 * Elegant Live Butterfly Animation (2 Independent Butterflies)
 * Follows a smooth, organic, randomized flight path across the screen.
 */
(function() {
    'use strict';

    // 1. Inject CSS for Butterflies
    const style = document.createElement('style');
    style.innerHTML = `
        .wedding-butterfly-container {
            position: fixed;
            top: 0; left: 0;
            width: 55px; height: 55px; /* Increased size (approx 1.5x - 1.6x of original) */
            pointer-events: none; /* Never block interactions */
            z-index: 45; /* Below modals/lightboxes (usually 100+), above backgrounds */
            transform-origin: center center;
            will-change: transform;
            filter: drop-shadow(0 6px 8px rgba(0,0,0,0.15)); /* Slightly deeper shadow for depth */
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

    // 2. Gradients and SVG Maker
    // Butterfly 1: Ivory / Champagne with delicate gold accents
    const grad1 = `
        <linearGradient id="bfly-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFDF9" />
            <stop offset="50%" stop-color="#F5E6D3" />
            <stop offset="100%" stop-color="#D4B076" />
        </linearGradient>
    `;
    // Butterfly 2: Subtle Blush / Pale Pink with delicate cream/gold accents
    const grad2 = `
        <linearGradient id="bfly-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF0F5" />
            <stop offset="50%" stop-color="#FCE4EC" />
            <stop offset="100%" stop-color="#D4B076" />
        </linearGradient>
    `;

    function createSVG(gradId, gradDef, strokeColor) {
        return `
            <svg class="wedding-butterfly" viewBox="0 0 100 100">
                <defs>
                    ${gradDef}
                </defs>
                <!-- Left Wing -->
                <g class="bfly-wing bfly-wing-left">
                    <path d="M 50 45 C 30 20, 5 15, 5 40 C 0 60, 20 70, 35 60 C 25 80, 35 95, 48 85 Z" fill="url(#${gradId})" opacity="0.9" stroke="${strokeColor}" stroke-width="1.5"/>
                </g>
                <!-- Right Wing -->
                <g class="bfly-wing bfly-wing-right">
                    <path d="M 50 45 C 70 20, 95 15, 95 40 C 100 60, 80 70, 65 60 C 75 80, 65 95, 52 85 Z" fill="url(#${gradId})" opacity="0.9" stroke="${strokeColor}" stroke-width="1.5"/>
                </g>
                <!-- Body -->
                <ellipse cx="50" cy="48" rx="2" ry="14" fill="#5A4A3A" opacity="0.85"/>
                <!-- Antennae -->
                <path d="M 49 34 C 45 25, 40 20, 38 18" fill="none" stroke="#5A4A3A" stroke-width="1" stroke-linecap="round" opacity="0.8"/>
                <path d="M 51 34 C 55 25, 60 20, 62 18" fill="none" stroke="#5A4A3A" stroke-width="1" stroke-linecap="round" opacity="0.8"/>
            </svg>
        `;
    }

    const isMobile = window.innerWidth <= 768;
    const baseSpeed = isMobile ? 0.7 : 1.2;
    const baseScale = isMobile ? 0.7 : 0.9;

    class Butterfly {
        constructor(gradId, gradDef, strokeColor, speedMultiplier, offsetAngle) {
            this.container = document.createElement('div');
            this.container.className = 'wedding-butterfly-container';
            this.container.innerHTML = createSVG(gradId, gradDef, strokeColor);
            document.body.appendChild(this.container);

            this.wingL = this.container.querySelector('.bfly-wing-left');
            this.wingR = this.container.querySelector('.bfly-wing-right');

            // Spread out start positions
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.angle = (Math.random() * Math.PI * 2) + offsetAngle;
            this.targetAngle = this.angle;
            
            this.speedMultiplier = speedMultiplier;
            this.velocity = 0;
            this.targetVelocity = 1.0 * this.speedMultiplier;
            this.scale = baseScale;
            this.targetScale = baseScale;

            this.flapAngle = Math.random() * 10; // Randomize start flap
            this.flapSpeed = 0.2;
            this.state = 'flying'; // 'flying', 'gliding', 'hovering'
            this.stateTimer = Math.random() * 60;
        }

        update() {
            this.stateTimer--;

            // State Machine
            if (this.stateTimer <= 0) {
                const r = Math.random();
                if (r < 0.6) {
                    this.state = 'flying';
                    this.targetVelocity = baseSpeed * this.speedMultiplier * (1.2 + Math.random() * 1.5);
                    this.stateTimer = 60 + Math.random() * 120;
                } else if (r < 0.85) {
                    this.state = 'gliding';
                    this.targetVelocity = baseSpeed * this.speedMultiplier * (0.8 + Math.random() * 0.5);
                    this.stateTimer = 40 + Math.random() * 80;
                } else {
                    this.state = 'hovering';
                    this.targetVelocity = baseSpeed * this.speedMultiplier * (0.1 + Math.random() * 0.3);
                    this.stateTimer = 30 + Math.random() * 60;
                    // Random turn while hovering
                    this.targetAngle = this.angle + (Math.random() - 0.5) * Math.PI;
                }

                // Depth change (simulate flying closer/further independently)
                if (Math.random() < 0.35) {
                    this.targetScale = baseScale * (0.8 + Math.random() * 0.4);
                }
            }

            // Smooth adjustments
            this.velocity += (this.targetVelocity - this.velocity) * 0.05;
            this.scale += (this.targetScale - this.scale) * 0.01;

            // Steering (wander)
            if (this.state !== 'hovering') {
                this.targetAngle += (Math.random() - 0.5) * 0.18;
            }
            
            // Softly turn towards target angle
            const diff = Math.atan2(Math.sin(this.targetAngle - this.angle), Math.cos(this.targetAngle - this.angle));
            this.angle += diff * 0.05;

            // Soft Boundary Reflection
            const margin = isMobile ? 40 : 80;
            if (this.x < margin) this.targetAngle = 0; // go right
            else if (this.x > window.innerWidth - margin) this.targetAngle = Math.PI; // go left
            if (this.y < margin) this.targetAngle = Math.PI / 2; // go down
            else if (this.y > window.innerHeight - margin) this.targetAngle = -Math.PI / 2; // go up

            // Move
            this.x += Math.cos(this.angle) * this.velocity;
            this.y += Math.sin(this.angle) * this.velocity;

            // Wing Flapping Logic
            if (this.state === 'flying') {
                this.flapSpeed = 0.35 + (this.velocity * 0.1);
            } else if (this.state === 'hovering') {
                this.flapSpeed = 0.45;
            } else if (this.state === 'gliding') {
                this.flapSpeed = 0.05;
                this.flapAngle += (0 - this.flapAngle) * 0.1; // settle wings flat
            }

            if (this.state !== 'gliding') {
                this.flapAngle += this.flapSpeed;
            }

            const maxFlap = 65; // Max degrees of flap
            const wingRotate = Math.sin(this.flapAngle) * maxFlap;
            
            // Orient butterfly (SVG heads UP initially, so add 90 deg)
            const rotateDeg = (this.angle * 180 / Math.PI) + 90; 

            // Apply transforms
            this.container.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${rotateDeg}deg) scale(${this.scale})`;
            
            // Apply 3D wing rotation for flap effect
            this.wingL.style.transform = `rotateY(${wingRotate}deg)`;
            this.wingR.style.transform = `rotateY(${-wingRotate}deg)`;
        }
    }

    const butterflies = [
        new Butterfly('bfly-grad-1', grad1, '#E4C98A', 1.0, 0), // Ivory / Champagne
        new Butterfly('bfly-grad-2', grad2, '#D4B076', 0.85, Math.PI) // Blush / Pale Pink (slightly slower, starts opposite)
    ];

    function update() {
        butterflies.forEach(b => b.update());
        requestAnimationFrame(update);
    }

    // Start Animation
    requestAnimationFrame(update);

    // Handle Resize boundaries
    window.addEventListener('resize', () => {
        butterflies.forEach(b => {
            if (b.x > window.innerWidth) b.x = window.innerWidth - 30;
            if (b.y > window.innerHeight) b.y = window.innerHeight - 30;
        });
    });

})();
