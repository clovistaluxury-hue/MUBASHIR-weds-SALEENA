/**
 * WEDDING INVITATION CONFIGURATION
 * Edit all names, dates, venues, contact details, photos, and links in this single file.
 */

window.WEDDING_CONFIG = {
    // INTRO CINEMATIC VIDEO & HERO STILL IMAGE CONFIGURATION
    introVideo: {
        src: "assets/video/wedding_intro.mp4",
        poster: "assets/images/intro_poster.jpg",
        stillImage: "assets/images/hero_card_still.jpg",
        touchText: "TOUCH TO BEGIN",
        subtitleText: "OUR STORY BEGINS HERE"
    },

    // COUPLE INFORMATION
    groom: {
        firstName: "Mubashir",
        lastName: "Akber",
        fullName: "Mubashir Akber",
        phone: "+91 98765 43210",
        whatsapp: "919876543210",
        familyContactName: "Mubashir's Family",
        familyPhone: "+91 98765 43210",
        familyWhatsapp: "919876543210"
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

    // MAIN WEDDING DATE (Target for Countdown: YYYY-MM-DDTHH:MM:SS)
    weddingDateISO: "2026-11-15T11:00:00",
    weddingDateDisplay: "SUNDAY, 15 NOVEMBER 2026",

    // EVENTS DETAILS
    events: [
        {
            id: "dhol",
            title: "DHOL KI NIGHT",
            date: "FRIDAY, 13 NOVEMBER 2026",
            time: "07:00 PM ONWARDS",
            venueName: "The Royal Palace Lawn",
            venueAddress: "Grand Banquet Hall, 123 Heritage Road, Main City",
            icon: "dhol",
            startDateISO: "2026-11-13T19:00:00",
            endDateISO: "2026-11-13T23:00:00",
            mapUrl: "https://maps.google.com/?q=Grand+Banquet+Hall+123+Heritage+Road"
        },
        {
            id: "nikah",
            title: "NIKAH CEREMONY",
            date: "SUNDAY, 15 NOVEMBER 2026",
            time: "11:00 AM",
            venueName: "Jamia Grand Masjid",
            venueAddress: "Central Masjid Complex, Palace Road, City Center",
            icon: "nikah",
            startDateISO: "2026-11-15T11:00:00",
            endDateISO: "2026-11-15T14:00:00",
            mapUrl: "https://maps.google.com/?q=Central+Masjid+Complex+Palace+Road"
        },
        {
            id: "reception",
            title: "WEDDING RECEPTION",
            date: "SUNDAY, 15 NOVEMBER 2026",
            time: "07:00 PM ONWARDS",
            venueName: "The Imperial Grand Ballroom",
            venueAddress: "Hotel Imperial, 456 Kings Avenue, City Center",
            icon: "reception",
            startDateISO: "2026-11-15T19:00:00",
            endDateISO: "2026-11-15T23:30:00",
            mapUrl: "https://maps.google.com/?q=Hotel+Imperial+456+Kings+Avenue"
        }
    ],

    // VENUE SECTION DETAILS
    venues: {
        nikah: {
            title: "NIKAH CEREMONY",
            name: "Jamia Grand Masjid",
            addressLine1: "123, Central Mosque Street",
            addressLine2: "City Center, State 000000",
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.896683832812!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjciTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
            directMapUrl: "https://maps.google.com"
        },
        reception: {
            title: "WEDDING RECEPTION",
            name: "The Imperial Grand Ballroom",
            addressLine1: "456, Imperial Grand Avenue",
            addressLine2: "Near City Mall, State 000000",
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.896683832812!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjciTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
            directMapUrl: "https://maps.google.com"
        },
        infoItems: [
            {
                title: "PARKING",
                text: "Ample parking space available for all guests at both venues.",
                icon: "parking"
            },
            {
                title: "LANDMARK",
                text: "Near City Mall, Main Highway Road",
                icon: "landmark"
            },
            {
                title: "ACCOMMODATION",
                text: "Premium hotels available nearby for outstation guests.",
                icon: "hotel"
            },
            {
                title: "CONTACT",
                text: "For any travel or venue assistance, feel free to call us anytime.",
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

    // GALLERY PHOTOS
    gallery: [
        {
            src: "assets/images/hero_wedding_couple_1787810129547.png",
            thumb: "assets/images/hero_wedding_couple_1787810129547.png",
            caption: "Mubashir Akber & Saleena - Together in Grace"
        },
        {
            src: "assets/images/story_couple_portrait_1787810146621.png",
            thumb: "assets/images/story_couple_portrait_1787810146621.png",
            caption: "Beginning Our Forever"
        },
        {
            src: "assets/images/user_photo_1.jpg",
            thumb: "assets/images/user_photo_1.jpg",
            caption: "Precious Moments & Celebrations"
        },
        {
            src: "assets/images/user_photo_2.jpg",
            thumb: "assets/images/user_photo_2.jpg",
            caption: "Joyous Traditions"
        },
        {
            src: "assets/images/user_photo_3.jpg",
            thumb: "assets/images/user_photo_3.jpg",
            caption: "Warm Blessings"
        },
        {
            src: "assets/images/gallery_rings_moment_1787810164729.png",
            thumb: "assets/images/gallery_rings_moment_1787810164729.png",
            caption: "Symbols of Eternal Bond"
        },
        {
            src: "assets/images/gallery_dhol_night_1787810182626.png",
            thumb: "assets/images/gallery_dhol_night_1787810182626.png",
            caption: "Festive Dhol Ki Night Celebrations"
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
        src: "assets/audio/wedding_music.mp3",
        title: "Ambient Wedding Instrumental"
    },

    // WHATSAPP RSVP NUMBER
    whatsappRsvpNumber: "919876543210"
};
