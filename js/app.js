/**
 * LUXURY DIGITAL WEDDING INVITATION INTERACTIVE SCRIPT
 * Couple: Mubashir Akber & Saleena
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Configuration & Dynamic Data
    const config = window.WEDDING_CONFIG || {};
    initDynamicContent(config);

    // 2. Initialize Full-Screen Video Intro & Smooth Still Image Dissolve Bridge
    initIntroVideoController(config.introVideo);

    // 3. Initialize Canvas Floating Gold Dust Particles
    initGoldParticles();

    // 4. Initialize Countdown Timer
    initCountdownTimer(config.weddingDateISO);

    // 5. Initialize Audio Controller
    initAudioController(config.audio);

    // 6. Initialize Navigation & Mobile Drawer
    initNavigation();

    // 7. Initialize Photo Lightbox
    initLightbox(config.gallery || []);

    // 8. Initialize RSVP System
    initRSVPSystem(config);

    // 9. Initialize Scroll Reveal Animations
    initScrollReveals();

    // 10. Initialize Gift Details Copy
    initGiftsSection(config.gifts);
});

/* ==========================================================================
   0. CINEMATIC FULL-SCREEN VIDEO INTRO CONTROLLER (SMOOTH STILL IMAGE DISSOLVE)
   ========================================================================== */
function initIntroVideoController(introConfig) {
    const container = document.getElementById('intro-container');
    const video = document.getElementById('intro-video');
    const poster = document.getElementById('intro-poster');
    const overlay = document.getElementById('intro-overlay');
    const touchArea = document.getElementById('intro-touch-area');
    const skipBtn = document.getElementById('intro-skip-btn');

    if (!container || !video) return;

    let isStarted = false;
    let isTransitioning = false;
    const transitionSec = (introConfig && introConfig.transitionDurationSec) || 1.8;

    // Lock page scrolling during intro video playback
    document.body.classList.add('intro-active');

    // Touch to Begin handler
    const startIntroExperience = () => {
        if (isStarted) return;
        isStarted = true;

        if (touchArea) touchArea.classList.add('hidden');
        if (overlay) overlay.classList.add('dimmed');

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                if (poster) poster.style.opacity = '0';
                if (window.playAudio) window.playAudio();
            }).catch(err => {
                console.log("Video playback error fallback:", err);
                triggerSmoothTransition(1.5);
            });
        }
    };

    if (touchArea) touchArea.addEventListener('click', startIntroExperience);
    if (touchArea) touchArea.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startIntroExperience();
    });

    // Video time tracking for smooth transition into still image
    video.addEventListener('timeupdate', () => {
        if (isTransitioning || !video.duration) return;

        const timeLeft = video.duration - video.currentTime;
        if (timeLeft <= transitionSec) {
            triggerSmoothTransition(transitionSec);
        }
    });

    video.addEventListener('ended', () => {
        if (!isTransitioning) {
            triggerSmoothTransition(1.0);
        }
    });

    // Skip Intro Button handler
    if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerSmoothTransition(1.2);
        });
    }

    // SMOOTH TRANSITION ENGINE (Video Container -> Still Image Section)
    function triggerSmoothTransition(durationSeconds) {
        if (isTransitioning) return;
        isTransitioning = true;

        // Apply smooth fade out to intro container
        container.style.transitionDuration = `${durationSeconds}s`;
        container.classList.add('intro-fading');

        // Start ambient music if available
        if (window.playAudio) window.playAudio();

        // After fade duration, hide intro container & unlock page scrolling
        setTimeout(() => {
            container.style.display = 'none';
            document.body.classList.remove('intro-active');
            video.pause();

            // Refresh scroll reveal observers
            if (window.refreshScrollReveals) window.refreshScrollReveals();
        }, durationSeconds * 1000);
    }
}

/* ==========================================================================
   1. DYNAMIC CONTENT POPULATION FROM CONFIG
   ========================================================================== */
function initDynamicContent(config) {
    if (!config.groom || !config.bride) return;

    // Names
    const coupleText = `${config.groom.fullName} & ${config.bride.fullName}`;
    const coupleElements = document.querySelectorAll('.dynamic-couple-names');
    coupleElements.forEach(el => el.textContent = coupleText);

    document.querySelectorAll('.dynamic-groom-name').forEach(el => el.textContent = config.groom.fullName);
    document.querySelectorAll('.dynamic-bride-name').forEach(el => el.textContent = config.bride.fullName);

    // Date
    if (config.weddingDateDisplay) {
        document.querySelectorAll('.dynamic-wedding-date').forEach(el => el.textContent = config.weddingDateDisplay);
    }

    // Render Event Cards
    renderEventCards(config.events || []);

    // Render Venue Details
    renderVenueDetails(config.venues || {});

    // Render Story Timeline
    renderStoryTimeline(config.story || {});

    // Render Photo Gallery
    renderGalleryGrid(config.gallery || []);

    // Render Contact Cards
    renderContactCards(config);
}

/* Render Events (Chronological Order) */
function renderEventCards(events) {
    const container = document.getElementById('events-cards-container');
    if (!container) return;

    const iconsMap = {
        nikah: `<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
        reception: `<svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>`
    };

    container.innerHTML = events.map(evt => `
        <div class="event-card glass-card">
            <div class="event-icon-box">
                ${iconsMap[evt.icon] || iconsMap.nikah}
            </div>
            <h3 class="event-title">${evt.title}</h3>
            <div class="event-date-time">
                ${evt.date}<br>
                <span>${evt.time}</span>
            </div>
            <div class="event-venue-name">${evt.fullLocationName || ('@ ' + evt.venueName)}</div>
            <div class="event-venue-address">${evt.venueAddress}</div>
            <div class="event-actions" style="flex-direction:column; align-items:center; gap:10px;">
                <a href="${evt.mapUrl}" target="_blank" class="btn-gold" style="width:100%; font-size:0.78rem;">
                    <i class="fas fa-map-marker-alt"></i> ${evt.buttonText || 'VIEW LOCATION'}
                </a>
                <button class="btn-gold-outline" style="width:100%; font-size:0.75rem;" onclick="downloadICS('${evt.id}')">
                    <i class="far fa-calendar-plus"></i> Add To Calendar
                </button>
            </div>
        </div>
    `).join('');
}

/* Render Venue Section */
function renderVenueDetails(venues) {
    const nikahBox = document.getElementById('venue-nikah-box');
    const receptionBox = document.getElementById('venue-reception-box');
    const infoGrid = document.getElementById('venue-info-grid');

    if (nikahBox && venues.nikah) {
        nikahBox.innerHTML = `
            <h3 class="event-title" style="font-size:1.5rem">${venues.nikah.title}</h3>
            <p class="event-venue-name">@ ${venues.nikah.name}</p>
            <p class="event-venue-address">${venues.nikah.addressLine1}</p>
            <a href="${venues.nikah.directMapUrl}" target="_blank" class="btn-gold-outline" style="margin-top:12px; font-size:0.75rem;">
                <i class="fas fa-directions"></i> ${venues.nikah.buttonText || 'VIEW NIKKAH LOCATION'}
            </a>
        `;
    }
    if (receptionBox && venues.reception) {
        receptionBox.innerHTML = `
            <h3 class="event-title" style="font-size:1.5rem">${venues.reception.title}</h3>
            <p class="event-venue-name">@ ${venues.reception.name}</p>
            <p class="event-venue-address">${venues.reception.addressLine1}</p>
            <a href="${venues.reception.directMapUrl}" target="_blank" class="btn-gold-outline" style="margin-top:12px; font-size:0.75rem;">
                <i class="fas fa-directions"></i> ${venues.reception.buttonText || 'VIEW RECEPTION LOCATION'}
            </a>
        `;
    }

    if (infoGrid && venues.infoItems) {
        const iconDefs = {
            parking: '🅿️',
            landmark: '📍',
            hotel: '🏨',
            phone: '📞'
        };
        infoGrid.innerHTML = venues.infoItems.map(item => `
            <div class="info-item-card">
                <div class="info-item-icon">${iconDefs[item.icon] || '✨'}</div>
                <h4 class="info-item-title">${item.title}</h4>
                <p class="info-item-desc">${item.text}</p>
            </div>
        `).join('');
    }
}

/* Render Timeline */
function renderStoryTimeline(story) {
    const quoteEl = document.getElementById('story-quote');
    const timelineEl = document.getElementById('story-timeline');

    if (quoteEl && story.quote) {
        quoteEl.textContent = `"${story.quote}"`;
    }

    if (timelineEl && story.timeline) {
        timelineEl.innerHTML = story.timeline.map(step => `
            <div class="timeline-step">
                <div class="timeline-dot"></div>
                <h4 class="timeline-step-title">${step.title}</h4>
                <p class="timeline-step-text">${step.text}</p>
            </div>
        `).join('');
    }
}

/* Render Gallery */
function renderGalleryGrid(gallery) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = gallery.map((item, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})">
            <img src="${item.thumb}" alt="${item.caption || 'Wedding Photo'}" class="gallery-img" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-caption">${item.caption || ''}</div>
            </div>
        </div>
    `).join('');
}

/* Render Contact Cards */
function renderContactCards(config) {
    const grid = document.getElementById('contact-cards-grid');
    if (!grid) return;

    const contacts = [
        {
            title: config.groom.familyContactName || "MUBASHIR'S FAMILY",
            phone: config.groom.familyPhone,
            whatsapp: config.groom.familyWhatsapp
        },
        {
            title: config.bride.familyContactName || "SALEENA'S FAMILY",
            phone: config.bride.familyPhone,
            whatsapp: config.bride.familyWhatsapp
        },
        {
            title: config.coordinator.name || "WEDDING COORDINATOR",
            phone: config.coordinator.phone,
            whatsapp: config.coordinator.whatsapp
        }
    ];

    grid.innerHTML = contacts.map(c => `
        <div class="contact-card glass-card">
            <h3 class="contact-name">${c.title}</h3>
            <a href="tel:${c.phone}" class="contact-phone-link">${c.phone}</a>
            <div style="display:flex; justify-content:center; gap:10px;">
                <a href="tel:${c.phone}" class="btn-gold-outline" style="padding: 10px 18px; font-size:0.75rem;">
                    <i class="fas fa-phone"></i> Call
                </a>
                <a href="https://wa.me/${c.whatsapp}?text=Assalamu%20Alaikum" target="_blank" class="btn-gold" style="padding: 10px 18px; font-size:0.75rem;">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   2. FLOATING GOLD DUST CANVAS ANIMATION
   ========================================================================== */
function initGoldParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const numParticles = Math.min(Math.floor(width / 25), 60);
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5,
            speedY: -(Math.random() * 0.4 + 0.1),
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.6 + 0.2,
            pulse: Math.random() * 0.02 + 0.005
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.opacity += Math.sin(Date.now() * p.pulse) * 0.008;

            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
            if (p.x < -10 || p.x > width + 10) {
                p.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(228, 201, 138, ${Math.max(0.1, Math.min(0.8, p.opacity))})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#E4C98A';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   3. COUNTDOWN TIMER (NIKKAH TARGET: 10 OCT 2026, 12:00 PM IST)
   ========================================================================== */
function initCountdownTimer(targetDateIso) {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    const bannerEl = document.getElementById('countdown-wrapper');

    if (!targetDateIso || !daysEl) return;

    const targetDate = new Date(targetDateIso).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            bannerEl.innerHTML = `
                <div class="section-subtitle" style="color: var(--gold-light); letter-spacing:0.2em;">NIKKAH CEREMONY</div>
                <div class="countdown-arrived" style="margin-top:16px;">OUR WEDDING DAY HAS ARRIVED ❤️</div>
            `;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(mins).padStart(2, '0');
        secsEl.textContent = String(secs).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ==========================================================================
   4. AUDIO CONTROLLER
   ========================================================================== */
let audioPlayer = null;
let isAudioPlaying = false;

function initAudioController(audioConfig) {
    const btn = document.getElementById('audio-player-btn');
    if (!btn || !audioConfig.src) return;

    audioPlayer = new Audio(audioConfig.src);
    audioPlayer.loop = true;

    btn.addEventListener('click', () => {
        toggleAudio();
    });

    window.playAudio = playAudio;
    window.pauseAudio = pauseAudio;
}

function toggleAudio() {
    if (isAudioPlaying) {
        pauseAudio();
        sessionStorage.setItem('audio_preferred', 'false');
    } else {
        playAudio();
        sessionStorage.setItem('audio_preferred', 'true');
    }
}

function playAudio() {
    if (!audioPlayer) return;
    audioPlayer.play().then(() => {
        isAudioPlaying = true;
        document.getElementById('audio-player-btn').classList.add('playing');
        showToast("🎵 Playing Wedding Background Music");
    }).catch(err => console.log("Audio play blocked:", err));
}

function pauseAudio() {
    if (!audioPlayer) return;
    audioPlayer.pause();
    isAudioPlaying = false;
    document.getElementById('audio-player-btn').classList.remove('playing');
    showToast("🔇 Music Muted");
}

/* ==========================================================================
   5. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
    const header = document.querySelector('.nav-header');
    const toggleBtn = document.querySelector('.menu-toggle-btn');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const links = document.querySelectorAll('.nav-link a, .mobile-nav-link a');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const progressBar = document.querySelector('.scroll-progress-bar');

    window.addEventListener('scroll', () => {
        if (document.body.classList.contains('intro-active')) return;

        // Sticky Header
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
            if (backToTopBtn) backToTopBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            if (backToTopBtn) backToTopBtn.classList.remove('visible');
        }

        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    // Mobile menu toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isOpen = drawer.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    links.forEach(l => {
        l.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function openMobileMenu() {
    document.querySelector('.menu-toggle-btn').classList.add('active');
    document.querySelector('.mobile-nav-drawer').classList.add('open');
    document.querySelector('.mobile-nav-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    document.querySelector('.menu-toggle-btn')?.classList.remove('active');
    document.querySelector('.mobile-nav-drawer')?.classList.remove('open');
    document.querySelector('.mobile-nav-overlay')?.classList.remove('open');
    if (!document.body.classList.contains('intro-active')) {
        document.body.style.overflow = '';
    }
}

/* ==========================================================================
   6. PHOTO LIGHTBOX
   ========================================================================== */
let currentGalleryItems = [];
let currentLightboxIndex = 0;

function initLightbox(galleryItems) {
    currentGalleryItems = galleryItems;

    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.querySelector('.lightbox-close-btn');
    const prevBtn = document.querySelector('.lightbox-prev-btn');
    const nextBtn = document.querySelector('.lightbox-next-btn');

    if (!modal) return;

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => changeLightboxImage(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeLightboxImage(1));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeLightboxImage(-1);
        if (e.key === 'ArrowRight') changeLightboxImage(1);
    });
}

window.openLightbox = function(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.add('active');
};

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.remove('active');
}

function changeLightboxImage(dir) {
    currentLightboxIndex = (currentLightboxIndex + dir + currentGalleryItems.length) % currentGalleryItems.length;
    updateLightboxContent();
}

function updateLightboxContent() {
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const item = currentGalleryItems[currentLightboxIndex];
    if (img && item) {
        img.src = item.src;
        caption.textContent = item.caption || '';
    }
}

/* ==========================================================================
   7. RSVP FORM SYSTEM
   ========================================================================== */
function initRSVPSystem(config) {
    const form = document.getElementById('rsvp-form');
    const whatsappBtn = document.getElementById('whatsapp-rsvp-btn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('rsvp-name').value.trim();
            const guests = document.getElementById('rsvp-guests').value;
            const status = form.querySelector('input[name="attendance"]:checked')?.value || 'Attending';
            const notes = document.getElementById('rsvp-notes').value.trim();

            if (!name) {
                alert("Please enter your name.");
                return;
            }

            // Save response in localStorage
            const entry = { name, guests, status, notes, date: new Date().toISOString() };
            const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
            existing.push(entry);
            localStorage.setItem('wedding_rsvps', JSON.stringify(existing));

            showToast("✨ Thank you! Your RSVP has been recorded.");
            form.reset();
        });
    }

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const name = document.getElementById('rsvp-name').value.trim() || 'Guest';
            const guests = document.getElementById('rsvp-guests').value || '1';
            const status = form ? (form.querySelector('input[name="attendance"]:checked')?.value || 'Joyfully Accept') : 'Joyfully Accept';
            const notes = document.getElementById('rsvp-notes').value.trim();

            const text = `Assalamu Alaikum!\n\nI would like to RSVP for Mubashir & Saleena's Wedding:\n• *Name:* ${name}\n• *Guests:* ${guests}\n• *Attendance:* ${status}${notes ? `\n• *Message:* ${notes}` : ''}\n\nThank you!`;
            const encodedText = encodeURIComponent(text);
            const waNumber = config.whatsappRsvpNumber || '919876543210';

            window.open(`https://wa.me/${waNumber}?text=${encodedText}`, '_blank');
        });
    }
}

/* ==========================================================================
   8. GIFTS & BANK COPY FUNCTIONALITY
   ========================================================================== */
function initGiftsSection(giftsConfig) {
    if (!giftsConfig) return;

    const bankBox = document.getElementById('gift-bank-box');
    if (bankBox && giftsConfig.bankTransfer) {
        const b = giftsConfig.bankTransfer;
        bankBox.innerHTML = `
            <div style="font-weight:600; color:var(--gold-dark); margin-bottom:4px;">${b.bankName}</div>
            <div>Account: <strong>${b.accountNumber}</strong></div>
            <div>Name: ${b.accountName}</div>
            <div>IFSC: ${b.ifscCode}</div>
            <button class="btn-gold-outline" style="margin-top:12px; padding:6px 16px; font-size:0.75rem;" onclick="copyToClipboard('${b.accountNumber}', 'Account Number Copied!')">
                <i class="far fa-copy"></i> Copy Account No.
            </button>
        `;
    }
}

/* ==========================================================================
   9. UTILITY FUNCTIONS (ADD TO CALENDAR, TOAST, SHARE)
   ========================================================================== */

/* ICS Calendar File Export Generator */
window.downloadICS = function(eventId) {
    const config = window.WEDDING_CONFIG;
    const evt = (config.events || []).find(e => e.id === eventId);
    if (!evt) return;

    const title = `${evt.title} - ${config.groom.firstName} & ${config.bride.firstName}'s Wedding`;
    const description = `You are warmly invited to ${evt.title} for the wedding of ${config.groom.fullName} and ${config.bride.fullName}.`;

    const formatICSDate = (isoStr) => {
        return new Date(isoStr).toISOString().replace(/-|:|\.\d+/g, '');
    };

    const start = formatICSDate(evt.startDateISO);
    const end = formatICSDate(evt.endDateISO);

    const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mubashir & Saleena Wedding//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${evt.venueName}, ${evt.venueAddress}
DTSTART:${start}
DTEND:${end}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${evt.id}-wedding-event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`📅 Event saved! Opening Calendar.`);
};

/* Copy Link */
window.copyInvitationLink = function() {
    copyToClipboard(window.location.href, "✨ Invitation link copied to clipboard!");
};

/* Native Share */
window.shareInvitation = function() {
    if (navigator.share) {
        navigator.share({
            title: 'Mubashir Akber & Saleena Wedding Invitation',
            text: 'You are warmly invited to celebrate the wedding of Mubashir Akber and Saleena.',
            url: window.location.href
        }).catch(err => console.log('Share error:', err));
    } else {
        copyInvitationLink();
    }
};

/* Helper Copy */
window.copyToClipboard = function(text, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || "Copied to clipboard!");
    }).catch(() => {
        showToast("Failed to copy.");
    });
};

/* Toast Notification Display */
function showToast(msg) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

/* Scroll Reveal Observer */
function initScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    window.refreshScrollReveals = () => {
        document.querySelectorAll('.glass-card, .event-card, .venue-card, .gallery-item, .contact-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    };

    window.refreshScrollReveals();
}
