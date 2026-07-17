// ----------------------------------------------------
// 1. Role Typewriter Effect
// ----------------------------------------------------
const typewriterText = [
    "Mathematician & Researcher",
    "Visiting Lecturer",
    "Former USJ Teaching Assistant",
    "Math in Moscow Alumnus",
    "Topology & Functional Analysis Specialist",
    "Scientific Computing Enthusiast",
    "Computer Science Enthusiast",
];

let typeWordIndex = 0;
let typeCharIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenWords = 2000;
const typewriterEl = document.getElementById("typing");

if (typewriterEl) {
    function type() {
        const currentWord = typewriterText[typeWordIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentWord.substring(0, typeCharIndex - 1);
            typeCharIndex--;
        } else {
            typewriterEl.textContent = currentWord.substring(0, typeCharIndex + 1);
            typeCharIndex++;
        }

        let activeSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && typeCharIndex === currentWord.length) {
            activeSpeed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && typeCharIndex === 0) {
            isDeleting = false;
            typeWordIndex = (typeWordIndex + 1) % typewriterText.length;
            activeSpeed = 500;
        }

        setTimeout(type, activeSpeed);
    }
    setTimeout(type, 500);
}

// ----------------------------------------------------
// 2. Tab Switching
// ----------------------------------------------------
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabPanes.forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        const targetPane = document.getElementById(btn.getAttribute("data-tab"));
        if (targetPane) {
            targetPane.classList.add("active");
        }
    });
});

// ----------------------------------------------------
// 3. Coursework Live Search and Filters
// ----------------------------------------------------
const courseSearch = document.getElementById("course-search");
const courseFilter = document.getElementById("course-filter");
const courseRows = document.querySelectorAll(".coursework-table tbody tr");

function filterCoursework() {
    const query = courseSearch.value.toLowerCase().trim();
    const filterVal = courseFilter.value;

    courseRows.forEach(row => {
        const code = row.querySelector(".course-code-cell").textContent.toLowerCase();
        const title = row.querySelector(".course-title-cell").textContent.toLowerCase();
        const yearChar = code.match(/\d/);
        const yearLevel = yearChar ? yearChar[0] : "";

        const matchSearch = code.includes(query) || title.includes(query);

        let matchFilter = true;
        if (filterVal === "year1" && yearLevel !== "1") matchFilter = false;
        else if (filterVal === "year2" && yearLevel !== "2") matchFilter = false;
        else if (filterVal === "year3" && yearLevel !== "3") matchFilter = false;
        else if (filterVal === "year4" && yearLevel !== "4") matchFilter = false;

        if (matchSearch && matchFilter) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

if (courseSearch && courseFilter) {
    courseSearch.addEventListener("input", filterCoursework);
    courseFilter.addEventListener("change", filterCoursework);
}

// ----------------------------------------------------
// 4. Scroll Fade In
// ----------------------------------------------------
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll(".scroll-fade").forEach(el => {
    scrollObserver.observe(el);
});

// ----------------------------------------------------
// 5. Navigation Link Highlighting
// ----------------------------------------------------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
            currentId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
        }
    });
});

// ----------------------------------------------------
// 6. Stats Counter Animation
// ----------------------------------------------------
const statsSection = document.getElementById("about");
const statNums = document.querySelectorAll(".stat-num");
let animatedStats = false;

function animateStats() {
    statNums.forEach(stat => {
        const target = parseFloat(stat.getAttribute("data-target"));
        const suffix = stat.getAttribute("data-suffix") || "";
        const decimals = parseInt(stat.getAttribute("data-decimals") || "0");

        let start = 0;
        const duration = 1500;
        const steps = 60;
        const stepTime = duration / steps;
        const increment = target / steps;
        let step = 0;

        const counter = setInterval(() => {
            start += increment;
            step++;

            if (step >= steps) {
                stat.textContent = target.toFixed(decimals) + suffix;
                clearInterval(counter);
            } else {
                stat.textContent = start.toFixed(decimals) + suffix;
            }
        }, stepTime);
    });
}

if (statsSection && statNums.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedStats) {
                animateStats();
                animatedStats = true;
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    statsObserver.observe(statsSection);
}

// ----------------------------------------------------
// 7. Theme Toggle (Dark default, Light with body.light)
// ----------------------------------------------------
const themeToggleBtn = document.getElementById("theme-toggle");
const toggleIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

// Check stored preference
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
    document.body.classList.add("light");
    if (toggleIcon) {
        toggleIcon.className = "fas fa-moon";
    }
} else {
    // Default to dark mode
    document.body.classList.remove("light");
    if (toggleIcon) {
        toggleIcon.className = "fas fa-sun";
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        const isLight = document.body.classList.contains("light");

        if (isLight) {
            localStorage.setItem("theme", "light");
            if (toggleIcon) toggleIcon.className = "fas fa-moon";
        } else {
            localStorage.setItem("theme", "dark");
            if (toggleIcon) toggleIcon.className = "fas fa-sun";
        }
    });
}

// ----------------------------------------------------
// 8. Mobile Menu Toggle
// ----------------------------------------------------
const menuToggle = document.querySelector(".menu-toggle");
const mobileNavLinks = document.querySelector(".nav-links");
const individualLinks = document.querySelectorAll(".nav-links a");

if (menuToggle && mobileNavLinks) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        mobileNavLinks.classList.toggle("mobile-active");
    });

    individualLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            mobileNavLinks.classList.remove("mobile-active");
        });
    });
}

// ----------------------------------------------------
// 9. Scroll Enhancements
// ----------------------------------------------------
const navElement = document.querySelector("nav");
if (navElement) {
    const progressContainer = document.createElement("div");
    progressContainer.className = "scroll-progress-container";
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress-bar";
    progressContainer.appendChild(progressBar);
    navElement.appendChild(progressContainer);

    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = scrolled + "%";

        if (window.scrollY > 50) {
            navElement.classList.add("scrolled");
        } else {
            navElement.classList.remove("scrolled");
        }
    });
}

// Stagger child elements
document.querySelectorAll(".scroll-fade").forEach(section => {
    const cards = section.querySelectorAll(".stat-card, .research-card, .teaching-card, .reference-card, .timeline-item");
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.06}s`;
    });
});

// ----------------------------------------------------
// 10. Back to Top Button
// ----------------------------------------------------
const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ----------------------------------------------------
// 11. Feedback & Memories Image Galleries
// ----------------------------------------------------
const FEEDBACK_IMAGES = {
    gism:     ["01.png","02.png"],
    colombo:  ["01.png","02.png","03.png","04.png","05.png","06.png","07.png","08.png","09.png"],
};

const MEMORIES_IMAGES = {
    gism:     ["01.jpg"],
    colombo:  ["01.jpg"],
    usj:      ["01.jpg","02.jpg","03.jpeg","04.jpeg"]
};

let currentUrls = [];
let currentLightboxIndex = 0;

function toggleFeedback(headerEl) {
    const content = headerEl.nextElementSibling;
    const icon = headerEl.querySelector(".feedback-toggle-icon");
    content.classList.toggle("hidden");
    if (icon) icon.classList.toggle("collapsed");
}

function loadImageGallery(config, attrPrefix) {
    Object.entries(config).forEach(([key, files]) => {
        const grid = document.querySelector(`[data-feedback-key="${attrPrefix}-${key}"]`);
        if (!grid) return;
        grid.innerHTML = "";
        if (files.length === 0) return;
        const urls = files.map(f => `assets/${attrPrefix}/${key}/${f}`);
        urls.forEach((url, i) => {
            const item = document.createElement("div");
            item.className = "feedback-item";
            const img = document.createElement("img");
            img.src = url;
            img.alt = `${i + 1}`;
            img.loading = "lazy";
            img.addEventListener("click", () => openLightbox(urls, i));
            item.appendChild(img);
            grid.appendChild(item);
        });
    });
}

function openLightbox(urls, index) {
    currentUrls = urls;
    currentLightboxIndex = index;
    let lb = document.getElementById("feedback-lightbox");
    if (!lb) {
        lb = document.createElement("div");
        lb.id = "feedback-lightbox";
        lb.className = "feedback-lightbox";
        lb.innerHTML = `
            <span class="feedback-lightbox-close">&times;</span>
            <button class="feedback-lightbox-nav feedback-lightbox-prev"><i class="fas fa-chevron-left"></i></button>
            <img src="" alt="Photo">
            <button class="feedback-lightbox-nav feedback-lightbox-next"><i class="fas fa-chevron-right"></i></button>
        `;
        document.body.appendChild(lb);
        lb.querySelector(".feedback-lightbox-close").addEventListener("click", () => lb.classList.remove("active"));
        lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("active"); });
        document.addEventListener("keydown", e => {
            if (!lb.classList.contains("active")) return;
            if (e.key === "Escape") lb.classList.remove("active");
            if (e.key === "ArrowLeft") navigateLightbox(-1);
            if (e.key === "ArrowRight") navigateLightbox(1);
        });
        lb.querySelector(".feedback-lightbox-prev").addEventListener("click", () => navigateLightbox(-1));
        lb.querySelector(".feedback-lightbox-next").addEventListener("click", () => navigateLightbox(1));
    }
    lb.querySelector("img").src = urls[index];
    lb.classList.add("active");
}

function navigateLightbox(direction) {
    if (currentUrls.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + direction + currentUrls.length) % currentUrls.length;
    document.querySelector("#feedback-lightbox img").src = currentUrls[currentLightboxIndex];
}

document.addEventListener("DOMContentLoaded", () => {
    loadImageGallery(FEEDBACK_IMAGES, "feedbacks");
    loadImageGallery(MEMORIES_IMAGES, "memories");
});
