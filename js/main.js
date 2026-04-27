// ==============================
// MENU MOBILE
// ==============================
function initMobileMenu() {
  const toggle = document.querySelector('.header__menu-toggle');
  const nav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.header__nav a');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
    nav.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}

// ==============================
// MENU MOBILE — animação dos links
// ==============================
function enhanceMobileMenu() {
  const nav = document.querySelector('.header__nav');
  if (!nav) return;

  const observer = new MutationObserver(() => {
    if (nav.classList.contains('open')) {
      nav.querySelectorAll('a').forEach((link, i) => {
        link.style.opacity = 0;
        link.style.transition = 'opacity 0.4s ease';
        setTimeout(() => { link.style.opacity = 1; }, i * 100);
      });
    }
  });

  observer.observe(nav, { attributes: true });
}

// ==============================
// ANIMAÇÃO DE ENTRADA
// ==============================
function initFadeIn() {
  const elements = document.querySelectorAll(
    '.hero__content, .hero__avatar, .skill-card, .project-card, .sobre__text, .sobre__badges, .contact__sub, .contact__links'
  );

  elements.forEach((el) => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

// ==============================
// HEADER: destaque da seção ativa
// ==============================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// ==============================
// HEADER: transparência no topo + barra de progresso
// ==============================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const progressBar = document.createElement('div');
  progressBar.style.position = 'absolute';
  progressBar.style.bottom = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '2px';
  progressBar.style.background = 'var(--color-accent)';
  progressBar.style.width = '0%';
  header.appendChild(progressBar);

  function update() {
    if (window.scrollY < 50) {
      header.style.borderBottomColor = 'transparent';
    } else {
      header.style.borderBottomColor = '';
    }

    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ==============================
// SMOOTH SCROLL
// ==============================
function initSmoothScroll() {
  const HEADER_HEIGHT = 72;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ==============================
// FOOTER YEAR
// ==============================
function initFooterYear() {
  const yearSpan = document.querySelector('.footer-year');
  if (!yearSpan) return;
  yearSpan.textContent = new Date().getFullYear();
}

// ==============================
// HERO TITLE — animação do nome
// ==============================
function animateName() {
  const title = document.querySelector('.hero__title');
  if (!title) return;

  const text = title.textContent;
  title.textContent = '';

  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = 0;
    span.style.display = 'inline-block';
    span.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    span.style.transform = 'translateY(20px)';
    title.appendChild(span);

    setTimeout(() => {
      span.style.opacity = 1;
      span.style.transform = 'translateY(0)';
    }, i * 120);
  });
}

// ==============================
// INICIALIZAÇÃO
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  enhanceMobileMenu();
  initFadeIn();
  initActiveNav();
  initHeaderScroll();
  initSmoothScroll();
  initFooterYear();
});
