/**
 * PREMIUM CINEMATIC GALLERY CAROUSEL
 * Couple: Mubashir Akber & Saleena
 * Supports: Images + Videos | Swipe | Fullscreen Lightbox | Lazy Load
 */

(function () {
    'use strict';

    const state = {
        items: [],
        current: 0,
        total: 0,
        isAnimating: false,
        touchStartX: 0,
        touchStartY: 0,
        isDragging: false,
        lbActive: false
    };

    // ─── DOM references ───────────────────────────────────────────────────
    const els = {
        stage:    null,
        prev:     null,
        next:     null,
        caption:  null,
        counter:  null,
        thumbs:   null,
        lb:       null,
        lbMedia:  null,
        lbCaption:null,
        lbCounter:null,
        lbClose:  null,
        lbPrev:   null,
        lbNext:   null
    };

    // ─── Init ─────────────────────────────────────────────────────────────
    window.initGalleryCarousel = function (galleryItems) {
        state.items = galleryItems || [];
        state.total = state.items.length;
        if (!state.total) return;

        els.stage    = document.getElementById('carousel-stage');
        els.prev     = document.getElementById('carousel-prev');
        els.next     = document.getElementById('carousel-next');
        els.caption  = document.getElementById('carousel-caption');
        els.counter  = document.getElementById('carousel-counter');
        els.thumbs   = document.getElementById('carousel-thumbs');
        els.lb       = document.getElementById('gallery-lightbox');
        els.lbMedia  = document.getElementById('glb-media-wrap');
        els.lbCaption= document.getElementById('glb-caption');
        els.lbCounter= document.getElementById('glb-counter');
        els.lbClose  = document.getElementById('glb-close');
        els.lbPrev   = document.getElementById('glb-prev');
        els.lbNext   = document.getElementById('glb-next');

        buildSlides();
        buildThumbs();
        goTo(0, 'none');
        bindEvents();
    };

    // ─── Build all slides ─────────────────────────────────────────────────
    function buildSlides() {
        els.stage.innerHTML = '';
        state.items.forEach((item, idx) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.dataset.index = idx;

            if (item.type === 'video') {
                slide.innerHTML = buildVideoSlide(item, idx);
            } else {
                slide.innerHTML = buildImageSlide(item, idx);
            }

            els.stage.appendChild(slide);
        });

        // Bind image click → fullscreen
        els.stage.querySelectorAll('.carousel-slide img').forEach(img => {
            img.addEventListener('click', () => openLightbox(state.current));
        });

        // Bind video play overlay
        els.stage.querySelectorAll('.video-play-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                const video = overlay.parentElement.querySelector('video');
                if (video) {
                    overlay.classList.add('hidden');
                    video.play();
                }
            });
        });
    }

    function buildImageSlide(item, idx) {
        // Lazy-load: only first 2 images load immediately
        const loading = idx < 2 ? 'eager' : 'lazy';
        return `<img src="${item.src}" alt="${item.caption || 'Wedding Photo'}" loading="${loading}" draggable="false">`;
    }

    function buildVideoSlide(item, idx) {
        return `
            <video preload="none" playsinline webkit-playsinline muted loop>
                <source src="${item.src}" type="video/mp4">
            </video>
            <div class="video-play-overlay">
                <div class="play-icon-circle">
                    <i class="fas fa-play"></i>
                </div>
            </div>`;
    }

    // ─── Build thumbnail strip ────────────────────────────────────────────
    function buildThumbs() {
        if (!els.thumbs) return;
        els.thumbs.innerHTML = '';
        state.items.forEach((item, idx) => {
            const thumb = document.createElement('div');
            thumb.className = 'carousel-thumb';
            thumb.dataset.index = idx;

            const thumbSrc = item.thumb || item.src;
            const isVideo = item.type === 'video';

            thumb.style.position = 'relative';
            thumb.innerHTML = `
                <img src="${thumbSrc}" alt="Thumbnail ${idx + 1}" loading="lazy">
                ${isVideo ? '<div class="carousel-thumb-video-badge"><i class="fas fa-play"></i></div>' : ''}
            `;
            thumb.addEventListener('click', () => goTo(idx));
            els.thumbs.appendChild(thumb);
        });
    }

    // ─── Navigate ─────────────────────────────────────────────────────────
    function goTo(newIndex, direction) {
        if (state.isAnimating && direction !== 'none') return;
        if (newIndex === state.current && direction !== 'none') return;

        pauseAllVideos();

        const slides = els.stage.querySelectorAll('.carousel-slide');
        const currentSlide = slides[state.current];
        const nextSlide = slides[newIndex];

        if (direction === 'none') {
            // First load — no animation
            slides.forEach(s => s.classList.remove('active', 'exit-left', 'exit-right'));
            nextSlide.classList.add('active');
        } else {
            state.isAnimating = true;

            // Determine exit direction
            const exitClass = direction === 'next' ? 'exit-left' : 'exit-right';
            const enterClass = direction === 'next' ? 'enter-right' : 'enter-left';

            // Reset enter position
            nextSlide.style.transform = direction === 'next' ? 'translateX(40px)' : 'translateX(-40px)';
            nextSlide.style.opacity = '0';
            nextSlide.classList.add('active');

            // Force reflow
            nextSlide.getBoundingClientRect();

            // Animate in next slide
            requestAnimationFrame(() => {
                nextSlide.style.transform = 'translateX(0)';
                nextSlide.style.opacity = '1';
                nextSlide.style.transition = 'opacity 0.55s cubic-bezier(0.25,1,0.5,1), transform 0.55s cubic-bezier(0.25,1,0.5,1)';

                // Animate out current slide
                if (currentSlide && currentSlide !== nextSlide) {
                    currentSlide.style.transform = direction === 'next' ? 'translateX(-40px)' : 'translateX(40px)';
                    currentSlide.style.opacity = '0';
                    currentSlide.style.transition = 'opacity 0.55s cubic-bezier(0.25,1,0.5,1), transform 0.55s cubic-bezier(0.25,1,0.5,1)';
                }
            });

            setTimeout(() => {
                if (currentSlide && currentSlide !== nextSlide) {
                    currentSlide.classList.remove('active');
                    currentSlide.style.transform = '';
                    currentSlide.style.opacity = '';
                    currentSlide.style.transition = '';
                }
                nextSlide.style.transform = '';
                nextSlide.style.opacity = '';
                nextSlide.style.transition = '';
                state.isAnimating = false;
            }, 580);
        }

        state.current = newIndex;
        updateUI();
    }

    function prev() {
        const newIdx = (state.current - 1 + state.total) % state.total;
        goTo(newIdx, 'prev');
    }

    function next() {
        const newIdx = (state.current + 1) % state.total;
        goTo(newIdx, 'next');
    }

    // ─── Update counter, caption, thumbs ──────────────────────────────────
    function updateUI() {
        const item = state.items[state.current];
        if (els.counter) {
            const pad = n => String(n).padStart(2, '0');
            els.counter.textContent = `${pad(state.current + 1)} / ${pad(state.total)}`;
        }
        if (els.caption) {
            els.caption.textContent = item.caption || '';
        }

        // Update active thumb
        if (els.thumbs) {
            els.thumbs.querySelectorAll('.carousel-thumb').forEach((t, i) => {
                t.classList.toggle('active', i === state.current);
            });
        }
    }

    // ─── Pause all videos ─────────────────────────────────────────────────
    function pauseAllVideos() {
        els.stage.querySelectorAll('video').forEach(v => {
            v.pause();
        });
        // Restore play overlays
        els.stage.querySelectorAll('.video-play-overlay').forEach(o => {
            o.classList.remove('hidden');
        });
    }

    // ─── Lightbox ─────────────────────────────────────────────────────────
    function openLightbox(index) {
        state.lbActive = true;
        renderLightboxItem(index);
        els.lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        state.lbActive = false;
        els.lb.classList.remove('active');
        document.body.style.overflow = '';
        // Stop any lb video
        const lbVideo = els.lbMedia.querySelector('video');
        if (lbVideo) lbVideo.pause();
        els.lbMedia.innerHTML = '';
    }

    function renderLightboxItem(index) {
        state.current = index;
        const item = state.items[index];
        els.lbMedia.innerHTML = '';

        if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.src;
            video.controls = true;
            video.playsInline = true;
            video.setAttribute('webkit-playsinline', '');
            video.style.maxWidth = '92vw';
            video.style.maxHeight = '82vh';
            els.lbMedia.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.caption || 'Wedding Photo';
            els.lbMedia.appendChild(img);
        }

        if (els.lbCaption) els.lbCaption.textContent = item.caption || '';
        if (els.lbCounter) {
            const pad = n => String(n).padStart(2, '0');
            els.lbCounter.textContent = `${pad(index + 1)} / ${pad(state.total)}`;
        }
    }

    function lbPrev() {
        const idx = (state.current - 1 + state.total) % state.total;
        renderLightboxItem(idx);
    }
    function lbNext() {
        const idx = (state.current + 1) % state.total;
        renderLightboxItem(idx);
    }

    // ─── Bind all events ──────────────────────────────────────────────────
    function bindEvents() {
        // Arrow buttons
        if (els.prev) els.prev.addEventListener('click', prev);
        if (els.next) els.next.addEventListener('click', next);

        // Lightbox controls
        if (els.lbClose) els.lbClose.addEventListener('click', closeLightbox);
        if (els.lbPrev)  els.lbPrev.addEventListener('click',  lbPrev);
        if (els.lbNext)  els.lbNext.addEventListener('click',  lbNext);

        // Click outside lightbox media → close
        if (els.lb) {
            els.lb.addEventListener('click', e => {
                if (e.target === els.lb) closeLightbox();
            });
        }

        // Keyboard
        document.addEventListener('keydown', e => {
            if (state.lbActive) {
                if (e.key === 'Escape')      closeLightbox();
                if (e.key === 'ArrowLeft')   lbPrev();
                if (e.key === 'ArrowRight')  lbNext();
            } else {
                if (e.key === 'ArrowLeft')   prev();
                if (e.key === 'ArrowRight')  next();
            }
        });

        // ── Touch / Swipe ──────────────────────────────────────────────
        const stage = els.stage;

        stage.addEventListener('touchstart', e => {
            state.touchStartX = e.touches[0].clientX;
            state.touchStartY = e.touches[0].clientY;
            state.isDragging = false;
        }, { passive: true });

        stage.addEventListener('touchmove', e => {
            const dx = e.touches[0].clientX - state.touchStartX;
            const dy = e.touches[0].clientY - state.touchStartY;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
                state.isDragging = true;
            }
        }, { passive: true });

        stage.addEventListener('touchend', e => {
            if (!state.isDragging) return;
            const dx = e.changedTouches[0].clientX - state.touchStartX;
            if (Math.abs(dx) > 40) {
                if (dx < 0) next();
                else prev();
            }
            state.isDragging = false;
        });

        // Lightbox touch swipe
        if (els.lb) {
            els.lb.addEventListener('touchstart', e => {
                state.touchStartX = e.touches[0].clientX;
            }, { passive: true });
            els.lb.addEventListener('touchend', e => {
                const dx = e.changedTouches[0].clientX - state.touchStartX;
                if (Math.abs(dx) > 40) {
                    if (dx < 0) lbNext();
                    else lbPrev();
                }
            });
        }

        // Mouse drag on desktop stage
        let mouseStartX = 0;
        let mouseDown = false;
        stage.addEventListener('mousedown', e => {
            mouseStartX = e.clientX;
            mouseDown = true;
        });
        stage.addEventListener('mouseup', e => {
            if (!mouseDown) return;
            mouseDown = false;
            const dx = e.clientX - mouseStartX;
            if (Math.abs(dx) > 50) {
                if (dx < 0) next();
                else prev();
            }
        });
        stage.addEventListener('mouseleave', () => { mouseDown = false; });
    }

})();
