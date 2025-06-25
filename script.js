gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.section').forEach(section => {
  gsap.fromTo(section,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
});

gsap.to(".scrolling-line", {
  height: "100vh",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});

const heroText = document.querySelector('.hero-text p');
if (heroText) {
  heroText.innerHTML = [...heroText.textContent].map((char, i) =>
    `<span style="display:inline-block; transition-delay:${i * 0.05}s">${char}</span>`
  ).join('');

  gsap.from(".hero-text p span", {
    y: 20,
    opacity: 0,
    stagger: 0.05,
    duration: 0.5,
    ease: "back.out"
  });
}

gsap.to(".hero", {
  y: 100,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".bg-wave path", {
  attr: {
    d: "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,245.7C672,224,768,160,864,160C960,160,1056,224,1152,229.3C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
  },
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

document.querySelectorAll('.leaf-3d').forEach(leaf => {
  const randomRot = Math.random() * 360;
  leaf.style.setProperty('--start-rotate', `${randomRot}deg`);
  leaf.dataset.speed = 0.1 + Math.random() * 0.3;
});

document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  gsap.to('.leaf-3d', {
    xPercent: (x - 0.5) * 20,
    yPercent: (y - 0.5) * 20,
    duration: 1,
    ease: "power2.out"
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});
