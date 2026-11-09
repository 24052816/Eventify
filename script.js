
// EVENT DATA
const events = [
    {
        id: 1,
        name: "Music Festival 2026",
        category: "Music",
        date: "2026-11-21",
        venue: "Bhubaneswar, Odisha",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
        description: "Experience an unforgettable night filled with live music, talented artists and amazing performances."
    },
    {
        id: 2,
        name: "Tech Innovation Summit",
        category: "Technology",
        date: "2026-12-05",
        venue: "KIIT University, Bhubaneswar",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        description: "Explore artificial intelligence, modern technologies and innovative ideas with industry experts."
    },
    {
        id: 3,
        name: "International Education Expo",
        category: "Education",
        date: "2026-12-12",
        venue: "Bhubaneswar Convention Centre",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
        description: "Discover educational opportunities, connect with institutions and explore future career options."
    },
    {
        id: 4,
        name: "Sports Championship",
        category: "Sports",
        date: "2026-12-19",
        venue: "KIIT Sports Complex",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
        description: "Enjoy exciting sports competitions and cheer for talented athletes."
    },
    {
        id: 5,
        name: "Live DJ Night",
        category: "Music",
        date: "2027-01-09",
        venue: "Bhubaneswar, Odisha",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
        description: "Enjoy energetic music, incredible DJs and a memorable evening with friends."
    },
    {
        id: 6,
        name: "Web Development Workshop",
        category: "Technology",
        date: "2027-01-16",
        venue: "KIIT University, Bhubaneswar",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        description: "Learn practical web development skills and build your own website with experts."
    }
];

// SELECT HTML ELEMENTS
const eventContainer = document.getElementById("eventContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const modal = document.getElementById("registrationModal");
const closeModal = document.getElementById("closeModal");
const registrationForm = document.getElementById("registrationForm");

const selectedEvent = document.getElementById("selectedEvent");
const confirmationMessage = document.getElementById("confirmationMessage");


// FORMAT EVENT DATE
function formatDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


// DISPLAY EVENTS
function displayEvents(eventList) {

    eventContainer.innerHTML = "";

    if (eventList.length === 0) {
        eventContainer.innerHTML =
            '<p class="no-events">No events found. Try another search.</p>';
        return;
    }

    eventList.forEach(event => {

        const card = document.createElement("div");
        card.className = "event-card";

        const image = document.createElement("img");
        image.src = event.image;
        image.alt = event.name;

        const info = document.createElement("div");
        info.className = "event-info";

        const category = document.createElement("span");
        category.className = "event-category";
        category.textContent = event.category;

        const title = document.createElement("h3");
        title.textContent = event.name;

        const description = document.createElement("p");
        description.textContent = event.description;

        const date = document.createElement("div");
        date.className = "event-meta";
        date.textContent = "📅 " + formatDate(event.date);

        const venue = document.createElement("div");
        venue.className = "event-meta";
        venue.textContent = "📍 " + event.venue;

        const button = document.createElement("button");
        button.className = "register-btn";
        button.textContent = "Register Now";

        button.addEventListener("click", () => {
            openRegistration(event);
        });

        info.append(
            category,
            title,
            description,
            date,
            venue,
            button
        );

        card.append(image, info);

        eventContainer.appendChild(card);
    });
}


// SEARCH AND FILTER EVENTS
function filterEvents() {

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredEvents = events.filter(event => {

        const matchesSearch =
            event.name.toLowerCase().includes(searchText) ||
            event.venue.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayEvents(filteredEvents);
}

searchInput.addEventListener("input", filterEvents);

categoryFilter.addEventListener("change", filterEvents);


// OPEN REGISTRATION MODAL
function openRegistration(event) {

    registrationForm.reset();

    confirmationMessage.textContent = "";

    selectedEvent.value = event.name;

    modal.style.display = "flex";
}


// CLOSE REGISTRATION MODAL
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


// REGISTRATION FORM VALIDATION
registrationForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("participantName").value.trim();
    const email = document.getElementById("participantEmail").value.trim();
    const phone = document.getElementById("participantPhone").value.trim();
    const eventName = selectedEvent.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[0-9\s-]{10,15}$/;

    if (name.length < 3) {
        alert("Please enter a valid name with at least 3 characters.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    if (!eventName) {
        alert("Please select an event.");
        return;
    }

    // REGISTRATION DATA
    const registration = {
        name: name,
        email: email,
        phone: phone,
        event: eventName,
        registrationDate: new Date().toLocaleString()
    };

    // SAVE DATA IN LOCAL STORAGE
    const registrations = JSON.parse(
        localStorage.getItem("eventRegistrations") || "[]"
    );

    registrations.push(registration);

    localStorage.setItem(
        "eventRegistrations",
        JSON.stringify(registrations)
    );

    // SUCCESS MESSAGE
    confirmationMessage.textContent =
        "Registration successful! Thank you, " + name + ".";

    registrationForm.reset();

    selectedEvent.value = eventName;
});


// DARK AND LIGHT MODE
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("eventTheme") === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeButton() {
    themeToggle.textContent =
        document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
}

updateThemeButton();

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const theme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";

    localStorage.setItem("eventTheme", theme);

    updateThemeButton();
});


// INITIALIZE WEBSITE
displayEvents(events);
