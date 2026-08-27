/**
 * CINEMATIC SCROLL-CONTROLLED FRAME ANIMATION (46 FRAMES)
 * Couple: Mubashir Akber & Saleena
 * Placed immediately after RSVP section
 */

(function () {
    'use strict';

    const TOTAL_FRAMES = 46;
    const FRAME_PATH_PREFIX = 'assets/scroll_frames/ezgif-frame-';
    const FRAME_EXTENSION = '.jpg';

    const frameImages = [];
    let isLoaded = false;
    let currentFrameIndex = 0;
    let targetFrameIndex = 0;
    let rafId = null;

    let container, sticky, canvas, ctx, promptOverlay;

    document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimation();
    });

    function initScrollAnimation() {
        container = document.getElementById('scroll-animation-container');
        sticky = document.getElementById('scroll-animation-sticky');
        canvas = document.getElementById('scroll-canvas');
        promptOverlay = document.getElementById('scroll-prompt-overlay');

        if (!container || !canvas) return;

        ctx = canvas.getContext('2d');

        // Set initial canvas sizing
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Preload all 46 frames
        preloadFrames(() => {
            isLoaded = true;
            renderFrame(0);
            startRenderLoop();
        });

        // Listen for scroll
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    function getFramePath(index) {
        const frameNum = String(index + 1).padStart(3, '0');
        return `${FRAME_PATH_PREFIX}${frameNum}${FRAME_EXTENSION}`;
    }

    function preloadFrames(onComplete) {
        let loadedCount = 0;

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);

            const handleLoad = () => {
                loadedCount++;
                if (loadedCount === 1 && i === 0) {
                    // Frame 1 loaded, render immediately
                    renderFrame(0);
                }
                if (loadedCount === TOTAL_FRAMES && onComplete) {
                    onComplete();
                }
            };

            img.onload = handleLoad;
            img.onerror = handleLoad; // prevent stall if single image fails
            frameImages[i] = img;
        }
    }

    function resizeCanvas() {
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        if (isLoaded) {
            renderFrame(Math.round(currentFrameIndex));
        }
    }

    function onScroll() {
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalScrollableDistance = container.offsetHeight - viewportHeight;

        if (totalScrollableDistance <= 0) return;

        // Current scroll position relative to container top
        const scrolledDistance = -rect.top;
        const rawProgress = scrolledDistance / totalScrollableDistance;

        // Clamp progress between 0.0 and 1.0
        const progress = Math.max(0, Math.min(1, rawProgress));

        // Map progress to frame index 0 .. 45
        targetFrameIndex = progress * (TOTAL_FRAMES - 1);

        // Fade prompt overlay out as scrolling starts
        if (promptOverlay) {
            if (progress > 0.02) {
                promptOverlay.style.opacity = '0';
                promptOverlay.style.pointerEvents = 'none';
            } else {
                promptOverlay.style.opacity = '1';
            }
        }
    }

    // Smooth Lerp Render Loop (60 FPS)
    function startRenderLoop() {
        function loop() {
            // Lerp towards target index for silky smooth animation
            const diff = targetFrameIndex - currentFrameIndex;
            if (Math.abs(diff) > 0.001) {
                currentFrameIndex += diff * 0.18; // smooth easing factor
                renderFrame(Math.round(currentFrameIndex));
            }

            rafId = requestAnimationFrame(loop);
        }
        loop();
    }

    function renderFrame(index) {
        if (!ctx || !canvas) return;
        const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
        const img = frameImages[safeIndex];

        if (!img || !img.complete || img.naturalWidth === 0) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        // Aspect ratio cover calculation
        const imgRatio = imgW / imgH;
        const canvasRatio = cw / ch;

        let drawW, drawH, drawX, drawY;

        if (canvasRatio > imgRatio) {
            drawW = cw;
            drawH = cw / imgRatio;
            drawX = 0;
            drawY = (ch - drawH) / 2;
        } else {
            drawH = ch;
            drawW = ch * imgRatio;
            drawX = (cw - drawW) / 2;
            drawY = 0;
        }

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
})();
