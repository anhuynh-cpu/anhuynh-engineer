/* ─── 1. Nav scrolled toggle ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

/* ─── 2. Mobile menu toggle ─── */
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobileNav');
let menuOpen = false;
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileNav.classList.toggle('open', menuOpen);
    menuToggle.setAttribute('aria-expanded', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ─── 3. Card mousemove → CSS vars --mx/--my ─── */
document.querySelectorAll('.project, .service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

/* ─── 4. Generate 22 rising particles (zero-g) ─── */
const particlesEl = document.getElementById('particles');
if (particlesEl) {
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const drift = (Math.random() - 0.5) * 120;
    const opacity = 0.2 + Math.random() * 0.5;
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (14 + Math.random() * 18) + 's';
    p.style.animationDelay = (Math.random() * -25) + 's';
    p.style.setProperty('--p-drift', drift + 'px');
    p.style.setProperty('--p-opacity', opacity);
    const size = 2 + Math.random() * 3;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    if (i % 3 === 0) {
      p.style.background = 'var(--cyan)';
      p.style.boxShadow = '0 0 8px var(--cyan)';
    }
    particlesEl.appendChild(p);
  }
}

/* ─── 5. Scene 3D parallax tilt theo chuột ─── */
const sceneInner = document.getElementById('sceneInner');
let sTargetX = 0, sTargetY = 0, sCurX = 0, sCurY = 0;
window.addEventListener('mousemove', (e) => {
  sTargetX = (e.clientX / window.innerWidth - 0.5) * 2;
  sTargetY = (e.clientY / window.innerHeight - 0.5) * 2;
});
function animateScene() {
  sCurX += (sTargetX - sCurX) * 0.04;
  sCurY += (sTargetY - sCurY) * 0.04;
  if (sceneInner) {
    sceneInner.style.transform = `rotateY(${sCurX * 8}deg) rotateX(${-sCurY * 8}deg)`;
  }
  requestAnimationFrame(animateScene);
}
animateScene();

/* ─── 6. Scroll fade gravity scene ─── */
const gravityScene = document.getElementById('gravityScene');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (gravityScene && y < window.innerHeight * 1.2) {
    gravityScene.style.transform = `translate3d(0, ${y * 0.2}px, 0)`;
    gravityScene.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.9));
  }
}, { passive: true });

/* ─── 7. IntersectionObserver scroll reveal (staggered) ─── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

function observeGroup(selector) {
  document.querySelectorAll(selector).forEach(group => {
    Array.from(group.children).forEach((item, idx) => {
      item.style.transitionDelay = (idx * 0.08) + 's';
      observer.observe(item);
    });
  });
}
observeGroup('.services-grid');
observeGroup('.tech-grid');
observeGroup('.projects-list');

/* ─── 8. Smooth scroll cho a[href^="#"] ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
