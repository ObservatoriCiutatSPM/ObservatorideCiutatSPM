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

