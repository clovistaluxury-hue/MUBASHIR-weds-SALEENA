/**
 * TRUE SCROLL-TO-SCRUB 9:16 FRAME ANIMATION (46 FRAMES)
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
    let currentFrameIndex = 0; // 0 to 45 (Frame 1 to 46)
    let targetFrameIndex = 0;

    let section, wrapper, frame916, canvas, ctx, promptOverlay;
    let isLocked = false;
    let touchStartY = 0;
    let lockScrollY = 0;
    let accumulatedDelta = 0;
    let exitThresholdCount = 0;
    const SENSITIVITY = 22; // Scroll delta per frame step

    document.addEventListener('DOMContentLoaded', () => {
        initScrollScrubAnimation();
    });

    function initScrollScrubAnimation() {
        section = document.getElementById('scroll-animation-section');
        wrapper = document.getElementById('scroll-frame-wrapper');
        frame916 = document.getElementById('scroll-frame-916');
        canvas = document.getElementById('scroll-canvas');
        promptOverlay = document.getElementById('scroll-prompt-overlay');

        if (!section || !canvas) return;

        ctx = canvas.getContext('2d');

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        preloadFrames(() => {
            isLoaded = true;
            renderFrame(0);
            startRenderLoop();
        });

        // Event Listeners for Lock & Scrub
        window.addEventListener('scroll', checkSectionLock, { passive: true });
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    function preloadFrames(onComplete) {
        let loadedCount = 0;
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const num = String(i + 1).padStart(3, '0');
            const img = new Image();
            img.src = `${FRAME_PATH_PREFIX}${num}${FRAME_EXTENSION}`;
            const onLoad = () => {
                loadedCount++;
                if (loadedCount === 1) renderFrame(0);
                if (loadedCount === TOTAL_FRAMES && onComplete) onComplete();
            };
            img.onload = onLoad;
            img.onerror = onLoad;
            frameImages[i] = img;
        }
    }

    function resizeCanvas() {
        if (!canvas || !frame916) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = frame916.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        if (isLoaded) renderFrame(Math.round(currentFrameIndex));
    }

    function checkSectionLock() {
        if (!section || isLocked) return;

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;

        // When section center is near viewport center
        if (Math.abs(sectionCenter - viewportCenter) < 60) {
            lockSection();
        }
    }

    function lockSection() {
        if (isLocked) return;
        isLocked = true;
        lockScrollY = window.scrollY;
        accumulatedDelta = 0;
        exitThresholdCount = 0;

        if (wrapper) wrapper.classList.add('is-locked');
        document.body.style.overflow = 'hidden';
    }

    function unlockSection(direction) {
        if (!isLocked) return;
        isLocked = false;
        accumulatedDelta = 0;
        exitThresholdCount = 0;

        if (wrapper) wrapper.classList.remove('is-locked');
        document.body.style.overflow = '';

        // Resume page scroll smoothly
        if (direction === 'down') {
            const targetY = section.offsetTop + section.offsetHeight + 10;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        } else if (direction === 'up') {
            const targetY = Math.max(0, section.offsetTop - window.innerHeight - 10);
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    }

    function handleWheel(e) {
        if (!isLocked) {
            checkSectionLock();
            return;
        }

        e.preventDefault();
        processDelta(e.deltaY);
    }

    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        if (!isLocked) checkSectionLock();
    }

    function handleTouchMove(e) {
        if (!isLocked) return;

        e.preventDefault();
        const touchY = e.touches[0].clientY;
        const delta = (touchStartY - touchY) * 1.5; // Swipe up = scroll down
        touchStartY = touchY;

        processDelta(delta);
    }

    function processDelta(delta) {
        accumulatedDelta += delta;

        const steps = Math.trunc(accumulatedDelta / SENSITIVITY);
        if (steps !== 0) {
            accumulatedDelta -= steps * SENSITIVITY;
            let newTarget = targetFrameIndex + steps;

            if (newTarget >= TOTAL_FRAMES - 1) {
                targetFrameIndex = TOTAL_FRAMES - 1;
                if (steps > 0) {
                    exitThresholdCount++;
                    if (exitThresholdCount >= 3) {
                        unlockSection('down');
                        return;
                    }
                }
            } else if (newTarget <= 0) {
                targetFrameIndex = 0;
                if (steps < 0) {
                    exitThresholdCount++;
                    if (exitThresholdCount >= 3) {
                        unlockSection('up');
                        return;
                    }
                }
            } else {
                targetFrameIndex = newTarget;
                exitThresholdCount = 0;
            }
        }

        if (promptOverlay && targetFrameIndex > 0.5) {
            promptOverlay.style.opacity = '0';
        } else if (promptOverlay && targetFrameIndex <= 0.5) {
            promptOverlay.style.opacity = '1';
        }
    }

    function startRenderLoop() {
        function loop() {
            const diff = targetFrameIndex - currentFrameIndex;
            if (Math.abs(diff) > 0.001) {
                currentFrameIndex += diff * 0.35;
                renderFrame(Math.round(currentFrameIndex));
            }
            requestAnimationFrame(loop);
        }
        loop();
    }

    function renderFrame(index) {
        if (!ctx || !canvas) return;
        const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
        const img = frameImages[idx];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        const imgRatio = iw / ih;
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
