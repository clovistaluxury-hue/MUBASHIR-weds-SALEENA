/**
 * PHOTO GALLERY SELECTION SYSTEM
 * Specify which image filenames or paths from the newly added folder ('photos gallery/last')
 * or assets folder should appear in the Photo Gallery.
 * 
 * ONLY the images listed in this array will be rendered in the Photo Gallery.
 * All previous gallery images have been removed.
 */
window.PHOTO_GALLERY_IMAGES = [
    "WhatsApp Image 2026-08-28 at 3.48.51 PM.jpeg",
    "WhatsApp Image 2026-08-28 at 3.49.14 PM.jpeg",
    "WhatsApp Image 2026-08-28 at 3.49.16 PM.jpeg",
    "WhatsApp Image 2026-08-28 at 3.49.17 PM (1).jpeg",
    "WhatsApp Image 2026-08-28 at 3.49.17 PM.jpeg",
    "WhatsApp Image 2026-08-28 at 3.49.18 PM (1).jpeg",
    "WhatsApp Image 2026-08-28 at 3.49.18 PM.jpeg",
    "WhatsApp Image 2026-08-28 at 3.49.19 PM.jpeg",
    "WhatsApp Image 2026-08-28 at 3.49.21 PM.jpeg",
    "WhatsApp Image 2026-08-28 at 3.49.42 PM.jpeg"
];

window.WEDDING_CONFIG = {
    // INTRO CINEMATIC VIDEO & HERO STILL IMAGE CONFIGURATION
    introVideo: {
        src: "assets/video/wedding_intro.mp4",
        poster: "assets/images/intro_poster.jpg",
        stillImage: "assets/images/hero_card_still.jpg",
        touchText: "TOUCH TO BEGIN",
        subtitleText: "OUR STORY BEGINS HERE",
        transitionDurationSec: 1.8
    },

    // COUPLE INFORMATION
    groom: {
        firstName: "Mubashir",
        lastName: "Akber",
        fullName: "Mubashir Akber",
        phone: "+91 70345 15218",
        whatsapp: "917034515218",
        familyContactName: "Mubashir's Family",
        familyPhone: "+91 70345 15218",
        familyWhatsapp: "917034515218"
    },
    bride: {
        firstName: "Saleena",
        lastName: "",
        fullName: "Saleena",
        phone: "+91 70347 51528",
        whatsapp: "917034751528",
        familyContactName: "Saleena's Family",
        familyPhone: "+91 70347 51528",
        familyWhatsapp: "917034751528"
    },
    coordinator: {
        name: "Wedding Coordinator",
        phone: "+91 99955 62446",
        whatsapp: "919995562446"
    },

    // MAIN WEDDING DATE (Target for Countdown: Wedding Day — 11 October 2026 at 12:00 PM IST)
    weddingDateISO: "2026-10-11T12:00:00+05:30",
    weddingDateDisplay: "SATURDAY, 10 OCTOBER 2026",

    // EVENTS DETAILS (Chronological Order)
    events: [
        {
            id: "nikah",
            title: "NIKKAH CEREMONY",
            date: "SATURDAY, 10 OCTOBER 2026",
            time: "12:00 PM",
            venueName: "Josh Pavilion Auditorium",
            venueAddress: "Thodupuzha",
            fullLocationName: "@ Josh Pavilion Auditorium, Thodupuzha",
            icon: "nikah",
            startDateISO: "2026-10-10T12:00:00+05:30",
            endDateISO: "2026-10-10T15:00:00+05:30",
            mapUrl: "https://maps.app.goo.gl/J2fSJX9Qs9ds2DJF8?g_st=ic",
            buttonText: "VIEW NIKKAH LOCATION"
        },
        {
            id: "reception",
            title: "WEDDING RECEPTION",
            date: "SUNDAY, 11 OCTOBER 2026",
            time: "1:00 PM",
            venueName: "Salwa Regency",
            venueAddress: "Salwa Regency",
            fullLocationName: "@ Salwa Regency",
            icon: "reception",
            startDateISO: "2026-10-11T13:00:00+05:30",
            endDateISO: "2026-10-11T17:00:00+05:30",
            mapUrl: "https://maps.app.goo.gl/B69YArhzD7dkcd7V7?g_st=ic",
            buttonText: "VIEW RECEPTION LOCATION"
        }
    ],

    // VENUE SECTION DETAILS
    venues: {
        nikah: {
            title: "NIKKAH CEREMONY",
            name: "Josh Pavilion Auditorium",
            addressLine1: "Thodupuzha",
            addressLine2: "Kerala, India",
            mapEmbedUrl: "https://maps.google.com/maps?q=Josh+Pavilion+Auditorium+Thodupuzha&t=&z=15&ie=UTF8&iwloc=&output=embed",
            directMapUrl: "https://maps.app.goo.gl/J2fSJX9Qs9ds2DJF8?g_st=ic",
            buttonText: "VIEW NIKKAH LOCATION"
        },
        reception: {
            title: "WEDDING RECEPTION",
            name: "Salwa Regency",
            addressLine1: "Salwa Regency",
            addressLine2: "Kerala, India",
            mapEmbedUrl: "https://maps.google.com/maps?q=Salwa+Regency&t=&z=15&ie=UTF8&iwloc=&output=embed",
            directMapUrl: "https://maps.app.goo.gl/B69YArhzD7dkcd7V7?g_st=ic",
            buttonText: "VIEW RECEPTION LOCATION"
        },
        infoItems: [
            {
                title: "PARKING",
                text: "Ample parking space available for all guests at both venues.",
                icon: "parking"
            },
            {
                title: "LANDMARK",
                text: "Easily accessible from Thodupuzha main town center.",
                icon: "landmark"
            },
            {
                title: "ACCOMMODATION",
                text: "Hotels available nearby for outstation guests.",
                icon: "hotel"
            },
            {
                title: "CONTACT",
                text: "For any assistance or directions, feel free to call us.",
                icon: "phone"
            }
        ]
    },

    // STORY TIMELINE
    story: {
        quote: "Two different hearts, two different journeys. But by the grace of Allah, our paths crossed for a reason. Today, we begin a new chapter together.",
        timeline: [
            { title: "FIRST MEETING", text: "Destined by grace, our paths first crossed with prayers and quiet hope." },
            { title: "THE JOURNEY", text: "Getting to know each other with mutual respect, laughter, and family blessings." },
            { title: "THE PROPOSAL", text: "With Allah's guidance and the approval of our beloved elders, our commitment was finalized." },
            { title: "FOREVER", text: "Stepping into a lifetime of love, faith, unity, and companionship." }
        ]
    },

    // GALLERY — Populated dynamically from window.PHOTO_GALLERY_IMAGES
    get gallery() {
        return (window.PHOTO_GALLERY_IMAGES || []).map(item => {
            if (typeof item === 'string') {
                const srcPath = item.includes('/') ? item : `photos gallery/last/${item}`;
                return {
                    type: 'image',
                    src: srcPath,
                    thumb: srcPath,
                    caption: ''
                };
            }
            return item;
        });
    },

    // GIFTS CONFIGURATION
    gifts: {
        enabled: true,
        message: "Your presence and blessings mean the world to us. If you wish to shower us with your blessings, a gift is always welcome.",
        bankTransfer: {
            enabled: true,
            accountName: "Mubashir Akber / Saleena",
            bankName: "Royal Heritage Bank",
            accountNumber: "9876 5432 1098 7654",
            ifscCode: "RHBN0001234",
            branch: "Main Boulevard City Branch"
        },
        onlineTransfer: {
            enabled: true,
            upiId: "mubashir.saleena@upi",
            qrCodeImage: "assets/images/qr_placeholder.png"
        },
        giftEnvelope: {
            enabled: true,
            note: "A gift box and registry counter will be available at the reception venue entrance for gift envelopes and blessings."
        }
    },

    // AUDIO CONFIGURATION
    audio: {
        src: "assets/audio/kalifa.mpeg",
        title: "Wedding Background Music"
    },

    // WHATSAPP RSVP NUMBER
    whatsappRsvpNumber: "917034751528"
};
