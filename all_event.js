const eventData = [
    {
        id: 1,
        title: "Musical Extravaganza",
        date: "Fri 09 Feb 2024",
        venue: "OAT",
        description: "A lively celebration of music, with unforgettable melodies and energy.",
        image: "images/musical.jpg",
        link: "musical-extravaganza.html"
    },
    {
        id: 2,
        title: "Cricket Championship",
        date: "Sat 10 Feb 2024",
        venue: "Phatta Ground",
        description: "A lively celebration of music, with unforgettable melodies and energy.",
        image: "images/cricket.jpg",
        link: "cricket-championship.html"
    },
    {
        id: 3,
        title: "Fresher's Hackathon",
        date: "Sun 11 Feb 2024",
        venue: "I-7",
        description: "A hackathon for freshers to innovate, collaborate, and showcase their coding skills.",
        image: "images/hackathon.jpg",
        link: "hackathon.html"
    },
    {
        id: 4,
        title: "Content Creator's Conclave",
        date: "Tue 25 January",
        venue: "L20",
        description: "Creators gather to collaborate, innovate, and elevate digital content together.",
        image: "images/content.jpg",
        link: "content-creators.html"
    },
    {
        id: 5,
        title: "IITKPD'25",
        date: "Sat 9th March",
        venue: "LHB",
        description: "Engage in insightful discussions, sharpen skills, and voice your opinions!",
        image: "images/iitkpd.jpg",
        link: "iitkpd.html"
    },
    {
        id: 6,
        title: "Dandiya Night",
        date: "Mon 4th October",
        venue: "Hall 6",
        description: "Celebrate tradition, dance the night away, and embrace the vibrant energy at Dandiya Night!",
        image: "images/dandiya.jpg",
        link: "dandiya.html"
    }
];

function createEventCards() {
    const carouselSlides = document.querySelector('.carousel-slides');
    
    eventData.forEach(event => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        
        slide.innerHTML = `
            <a href="${event.link}" class="event-card">
                <img src="${event.image}" alt="${event.title}">
                <span class="tag">${event.date} | ${event.venue}</span>
                <h2>${event.title}</h2>
                <p>${event.description}</p>
                <span class="view-event">View event →</span>
            </a>
        `;
        
        carouselSlides.appendChild(slide);
    });
}

// Handle card click events
document.addEventListener('click', function(e) {
    const eventCard = e.target.closest('.event-card');
    if (eventCard) {
        const href = eventCard.getAttribute('href');
        window.location.href = href;
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createEventCards();
});