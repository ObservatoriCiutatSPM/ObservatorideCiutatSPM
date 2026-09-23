// --- HERO SLIDER ---
const images = document.querySelectorAll('.hero-slider .slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let current = 0;

function showSlide(index) {
  images[current].classList.remove('active');

  current = index;

  if (current < 0) {
    current = images.length - 1;
  }

  if (current >= images.length) {
    current = 0;
  }

  images[current].classList.add('active');
}

nextBtn.addEventListener('click', () => {
  showSlide(current + 1);
});

prevBtn.addEventListener('click', () => {
  showSlide(current - 1);
});


// --- POWER BI VIEWER ---
const cards = document.querySelectorAll(".card");
const viewer = document.getElementById("dashboard-viewer");
const frame = document.getElementById("dashboard-frame");

cards.forEach(card => {
  card.addEventListener("click", (e) => {

    e.preventDefault(); // 👈 important

    const url = card.getAttribute("data-src");

    frame.src = url;
    viewer.classList.remove("hidden");

    // scroll automàtic
    viewer.scrollIntoView({ behavior: "smooth" });

  });
});

// --- CONSENTIMENT DE COOKIES ---

const cookieBanner = document.getElementById("cookie-banner");
const cookieAccept = document.getElementById("cookie-accept");
const cookieReject = document.getElementById("cookie-reject");

cookieAccept.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "accepted");
  cookieBanner.style.display = "none";

  carregarGoogleAnalytics();
});

cookieReject.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "rejected");
  cookieBanner.style.display = "none";
});

const cookieConsent = localStorage.getItem("cookieConsent");

if (cookieConsent === "accepted") {
  cookieBanner.style.display = "none";
  carregarGoogleAnalytics();
}

if (cookieConsent === "rejected") {
  cookieBanner.style.display = "none";
}

// --- GOOGLE ANALYTICS ---

function carregarGoogleAnalytics() {

  const script = document.createElement("script");

  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-0EEJSHDC0L";

  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", "G-0EEJSHDC0L");
}