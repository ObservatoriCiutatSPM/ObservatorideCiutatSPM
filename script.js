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

const rotateMessage = document.getElementById("rotate-message");

function esMobil() {
  return window.matchMedia("(max-width: 1000px)").matches;
}

function esVertical() {
  return window.matchMedia("(orientation: portrait)").matches;
}

function actualitzarOrientacio() {

  if (!viewer.classList.contains("hidden")) {

    if (esMobil() && esVertical()) {

      frame.style.display = "none";
      rotateMessage.style.display = "flex";

    } else {

      frame.style.display = "block";
      rotateMessage.style.display = "none";

    }

  }
}


cards.forEach(card => {

  card.addEventListener("click", (e) => {

    e.preventDefault();

    const url = card.getAttribute("data-src");

    frame.src = url;

    viewer.classList.remove("hidden");

    if (esMobil() && esVertical()) {

      /*
       * En mòbil vertical no fem scroll.
       * El missatge ocupa la pantalla i demana girar el dispositiu.
       */

      frame.style.display = "none";
      rotateMessage.style.display = "flex";

    } else {

      /*
       * En escriptori i en horitzontal,
       * mostrem el Power BI i portem l'usuari fins al panell.
       */

      frame.style.display = "block";
      rotateMessage.style.display = "none";

      viewer.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


// --- CANVI D'ORIENTACIÓ ---

window.addEventListener("orientationchange", () => {

  setTimeout(() => {

    if (viewer.classList.contains("hidden")) {
      return;
    }

    if (esMobil() && esVertical()) {

      // Tornem a vertical:
      // tanquem el visor i tornem als àmbits

      viewer.classList.add("hidden");

      frame.src = "";
      frame.style.display = "block";
      rotateMessage.style.display = "none";

      document.querySelector(".dashboards").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    } else {

      // Passem a horitzontal:
      // mostrem el dashboard

      frame.style.display = "block";
      rotateMessage.style.display = "none";

      viewer.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  }, 500);

});


// --- CONSENTIMENT I GOOGLE ANALYTICS ---

window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

window.gtag = gtag;

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