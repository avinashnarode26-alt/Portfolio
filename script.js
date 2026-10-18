// Small interactive behaviors: menu toggle and smooth scroll
document.addEventListener('DOMContentLoaded',function(){
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if(toggle && nav){
    toggle.addEventListener('click',()=>nav.classList.toggle('show'))
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const target = this.getAttribute('href');
      if(target.length>1){
        e.preventDefault();
        const el = document.querySelector(target);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
        if(nav.classList.contains('show')) nav.classList.remove('show');
      }
    })
  })

  // Set current year in footer
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // Reveal on scroll for a nicer entrance
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('reveal');
        revealObserver.unobserve(entry.target);
      }
    })
  },{threshold:0.12});

  document.querySelectorAll('.card, .hero-content, .section h2').forEach(el=>{
    el.classList.add('pre-reveal');
    revealObserver.observe(el);
  });

  // Hero displays two stacked images; no JS needed for selection.
});

const lightbox = document.getElementById("projectLightbox");
const enlargedImage = document.getElementById("lightboxImage");
const closeButton = lightbox.querySelector(".lightbox-close");

document.querySelectorAll(".project-link").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const card = link.closest(".project-card");
        const image = card?.querySelector("img");

        if (!image || !lightbox || !enlargedImage) return;

        enlargedImage.src = image.src;
        enlargedImage.alt = image.alt;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    enlargedImage.removeAttribute("src");
    enlargedImage.alt = "";
}

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
    }
});
