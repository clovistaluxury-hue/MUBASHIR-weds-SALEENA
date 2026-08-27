/**
 * WEDDING INVITATION CONFIGURATION
 * Single source of truth for all names, dates, venues, countdown, maps links, and contact details.
 */

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
        phone: "+91 70347 51528",
        whatsapp: "917034751528",
        familyContactName: "Mubashir's Family",
        familyPhone: "+91 70347 51528",
        familyWhatsapp: "917034751528"
    },
    bride: {
        firstName: "Saleena",
        lastName: "",
        fullName: "Saleena",
        phone: "+91 98765 43211",
        whatsapp: "919876543211",
        familyContactName: "Saleena's Family",
        familyPhone: "+91 98765 43211",
        familyWhatsapp: "919876543211"
    },
    coordinator: {
        name: "Wedding Coordinator",
        phone: "+91 98765 43212",
        whatsapp: "919876543212"
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

    // GALLERY — Images only (Videos removed per user requirement)
    gallery: [
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-27_at_1.46.21_PM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-27_at_1.46.21_PM.jpeg",
            caption: "Together in Grace"
        },
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-27_at_1.57.45_PM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-27_at_1.57.45_PM.jpeg",
            caption: "Precious Moments"
        },
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-27_at_12.08.43_PM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-27_at_12.08.43_PM.jpeg",
            caption: "Eternal Bond"
        },
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-27_at_12.11.16_PM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-27_at_12.11.16_PM.jpeg",
            caption: "Joyful Celebrations"
        },
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-27_at_12.12.29_PM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-27_at_12.12.29_PM.jpeg",
            caption: "Warm Blessings"
        },
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-27_at_2.03.30_PM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-27_at_2.03.30_PM.jpeg",
            caption: "Our Story"
        },
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-27_at_2.07.51_PM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-27_at_2.07.51_PM.jpeg",
            caption: "Forever Begins Here"
        },
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-21_at_7.43.36_PM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-21_at_7.43.36_PM.jpeg",
            caption: "Heartfelt Smiles"
        },
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-21_at_7.44.30_PM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-21_at_7.44.30_PM.jpeg",
            caption: "Shared Joy"
        },
        {
            type: "image",
            src: "assets/gallery/new_im.jpeg",
            thumb: "assets/gallery/new_im.jpeg",
            caption: "Cherished Togetherness"
        },
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-27_at_11.56.12_AM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-27_at_11.56.12_AM.jpeg",
            caption: "Royal Wedding Portrait"
        },
        {
            type: "image",
            src: "assets/gallery/WhatsApp_Image_2026-08-27_at_12.07.58_PM.jpeg",
            thumb: "assets/gallery/WhatsApp_Image_2026-08-27_at_12.07.58_PM.jpeg",
            caption: "A Lifetime of Happiness"
        }
    ],

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
