// ==============================
// ANIMAÇÃO DE ENTRADA (Intersection Observer)
// ==============================

/**
 * Observa elementos com a classe .fade-in e adiciona
 * .visible quando eles entram na viewport.
 */
function initFadeIn() {
  const elements = document.querySelectorAll(
    '.hero__content, .hero__avatar, .skill-card, .project-card, .sobre__text, .sobre__badges, .contact__sub, .contact__links'
  );

  elements.forEach((el) => {
    el.classList.add('fade-in');
  });

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

/**
 * Observa as seções e marca o link do nav correspondente como ativo.
 */
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
// HEADER: transparência no topo
// ==============================

/**
 * Remove a borda do header quando o usuário está no topo da página.
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  function update() {
    if (window.scrollY < 50) {
      header.style.borderBottomColor = 'transparent';
    } else {
      header.style.borderBottomColor = '';
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ==============================
// SMOOTH SCROLL para links internos
// ==============================

/**
 * Implementa scroll suave com offset para o header fixo.
 */
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
// ANO DINÂMICO NO FOOTER
// ==============================

/**
 * Atualiza o ano no rodapé automaticamente.
 */
function initFooterYear() {
  const yearSpan = document.querySelector('.footer-year');
  if (!yearSpan) return;

  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}

// ==============================
// INICIALIZAÇÃO
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  initFadeIn();
  initActiveNav();
  initHeaderScroll();
  initSmoothScroll();
  initFooterYear();
  initMobileMenu();
});

// ==============================
// MENU MOBILE
// ==============================

/**
 * Controla o menu mobile com botão hamburger.
 */
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

  // Fechar ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}
