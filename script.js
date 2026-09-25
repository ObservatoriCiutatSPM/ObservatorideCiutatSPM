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

  });
});

// --- CONTROL DE L'ORIENTACIÓ DEL DASHBOARD ---

window.addEventListener("orientationchange", () => {

  setTimeout(() => {

    if (window.matchMedia("(orientation: landscape)").matches) {

      viewer.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  }, 300);

});


// --- CONSENTIMENT I GOOGLE ANALYTICS ---

// Preparem Google Consent Mode abans de carregar Google Analytics
window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

window.gtag = gtag;

// Per defecte: sense consentiment
gtag("consent", "default", {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  wait_for_update: 500
});

const cookieBanner = document.getElementById("cookie-banner");
const cookieAccept = document.getElementById("cookie-accept");
const cookieReject = document.getElementById("cookie-reject");

let googleAnalyticsLoaded = false;


// --- CARREGAR GOOGLE ANALYTICS ---

function carregarGoogleAnalytics() {

  if (googleAnalyticsLoaded) return;

  googleAnalyticsLoaded = true;

  const script = document.createElement("script");

  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-0EEJSHDC0L";

  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", "G-0EEJSHDC0L");
}


// --- ACCEPTAR COOKIES ---

function acceptarCookies() {

  localStorage.setItem("cookieConsent", "accepted");

  cookieBanner.style.display = "none";

  gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  carregarGoogleAnalytics();
}


// --- REBUTJAR COOKIES ---

function rebutjarCookies() {

  localStorage.setItem("cookieConsent", "rejected");

  cookieBanner.style.display = "none";
}


// --- BOTONS ---

cookieAccept.addEventListener("click", acceptarCookies);
cookieReject.addEventListener("click", rebutjarCookies);


// --- CONSENTIMENT GUARDAT ---

const cookieConsent = localStorage.getItem("cookieConsent");

if (cookieConsent === "accepted") {

  cookieBanner.style.display = "none";

  gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  carregarGoogleAnalytics();
}

if (cookieConsent === "rejected") {

  cookieBanner.style.display = "none";
}

// --- MODAL AVÍS LEGAL ---

const legalLinks = document.querySelectorAll(".legal-link");
const legalModal = document.getElementById("legal-modal");
const legalModalClose = document.querySelector(".legal-modal-close");
const legalModalOverlay = document.querySelector(".legal-modal-overlay");

function obrirLegal() {
  legalModal.classList.add("active");
  legalModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function tancarLegal() {
  legalModal.classList.remove("active");
  legalModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelector(".footer-legal").addEventListener("click", (e) => {

  const link = e.target.closest(".legal-link");

  if (!link) return;

  e.preventDefault();

  document.getElementById("legal-modal-frame").src = link.getAttribute("href");

  obrirLegal();

});

const privacyLink = document.querySelector(".privacy-link");

privacyLink.addEventListener("click", (e) => {

  e.preventDefault();

  document.getElementById("legal-modal-frame").src = "privacitat.html";

  obrirLegal();

});

const cookiesLink = document.querySelector(".cookies-link");

cookiesLink.addEventListener("click", (e) => {

  e.preventDefault();

  document.getElementById("legal-modal-frame").src = "cookies.html";

  obrirLegal();

});

legalModalClose.addEventListener("click", tancarLegal);

legalModalOverlay.addEventListener("click", tancarLegal);