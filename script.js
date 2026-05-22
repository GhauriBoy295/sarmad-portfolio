const root = document.documentElement;
root.classList.remove('no-js');
root.classList.add('js');

const body = document.body;
const welcomeScreen = document.getElementById('welcomeScreen');
const continueBtn = document.getElementById('continueBtn');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const cursorGlow = document.getElementById('cursorGlow');
const typedTarget = document.getElementById('typeTarget');
const mainContent = document.getElementById('main-content');
const themeColor = document.querySelector('meta[name="theme-color"]');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function readStoredTheme() {
  try {
    return window.localStorage.getItem('portfolio-theme');
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    window.localStorage.setItem('portfolio-theme', theme);
  } catch (error) {
    // Storage may be blocked in private-browsing or locked-down contexts.
  }
}

function updateThemeLabel() {
  if (!themeToggle) return;
  const isDark = root.getAttribute('data-theme') === 'dark';
  themeToggle.textContent = isDark ? 'Dark' : 'Light';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  themeColor?.setAttribute('content', isDark ? '#04070d' : '#eef8ff');
}

const savedTheme = readStoredTheme();
if (savedTheme === 'dark' || savedTheme === 'light') {
  root.setAttribute('data-theme', savedTheme);
}
updateThemeLabel();

function showPortfolio() {
  if (!welcomeScreen) return;
  welcomeScreen.classList.add('hide');
  welcomeScreen.setAttribute('aria-hidden', 'true');
  body.classList.remove('intro-active');
  window.setTimeout(() => mainContent?.focus({ preventScroll: true }), 250);
}

continueBtn?.addEventListener('click', showPortfolio);

themeToggle?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  saveTheme(next);
  updateThemeLabel();
});

function setMenuOpen(open) {
  if (!navLinks || !menuToggle) return;
  navLinks.classList.toggle('open', open);
  menuToggle.textContent = open ? 'Close' : 'Menu';
  menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.contains('open') ?? false;
  setMenuOpen(!isOpen);
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});

if (cursorGlow && !motionQuery.matches && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

const revealItems = [...document.querySelectorAll('.reveal-up')];
if ('IntersectionObserver' in window && !motionQuery.matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = navLinks ? [...navLinks.querySelectorAll('a')] : [];
if ('IntersectionObserver' in window && sections.length && navAnchors.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(anchor => {
          const isActive = anchor.getAttribute('href') === `#${entry.target.id}`;
          anchor.classList.toggle('active', isActive);
          if (isActive) anchor.setAttribute('aria-current', 'location');
          else anchor.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-42% 0px -45% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}

if (!motionQuery.matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', (event) => {
      if (window.innerWidth < 860) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -6;
      const rotateY = ((x - rect.width / 2) / rect.width) * 6;
      card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
      card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

const phrases = [
  'MSc Cyber Security graduate - University of Chester',
  'Focused on penetration testing, DFIR, and ICS security',
  'Completed MSc research: randomness testing and vulnerability detection',
  'Current Location: United Kingdom | Nationality: Pakistan'
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let typingTimer = null;

function runTyping() {
  if (!typedTarget || motionQuery.matches) return;
  const current = phrases[phraseIndex];
  typedTarget.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    typingTimer = window.setTimeout(runTyping, 32);
  } else if (!deleting) {
    deleting = true;
    typingTimer = window.setTimeout(runTyping, 1100);
  } else if (charIndex > 0) {
    charIndex -= 1;
    typingTimer = window.setTimeout(runTyping, 18);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingTimer = window.setTimeout(runTyping, 260);
  }
}

if (typedTarget) {
  typedTarget.textContent = phrases[0];
  if (!motionQuery.matches) runTyping();
}

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas?.getContext('2d');
let width = 0;
let height = 0;
let columns = 0;
let drops = [];
let matrixAnimationId = null;
const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&<>/{}[]';

function resizeCanvas() {
  if (!canvas) return;
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.max(1, Math.floor(width / 18));
  drops = Array.from({ length: columns }, () => Math.floor(Math.random() * height / 18));
}

function drawMatrix() {
  if (!ctx || motionQuery.matches) return;
  const isDark = root.getAttribute('data-theme') === 'dark';
  ctx.fillStyle = isDark ? 'rgba(4, 7, 13, 0.08)' : 'rgba(238, 248, 255, 0.12)';
  ctx.fillRect(0, 0, width, height);
  ctx.font = '14px JetBrains Mono';
  ctx.fillStyle = isDark ? 'rgba(0, 245, 158, 0.58)' : 'rgba(0, 118, 206, 0.28)';

  drops.forEach((drop, index) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, index * 18, drop * 18);
    if (drop * 18 > height && Math.random() > 0.976) drops[index] = 0;
    drops[index] += 1;
  });

  matrixAnimationId = window.requestAnimationFrame(drawMatrix);
}

function startMatrix() {
  if (!ctx || motionQuery.matches) return;
  resizeCanvas();
  if (matrixAnimationId) window.cancelAnimationFrame(matrixAnimationId);
  drawMatrix();
}

function stopMatrix() {
  if (matrixAnimationId) window.cancelAnimationFrame(matrixAnimationId);
  matrixAnimationId = null;
}

startMatrix();
window.addEventListener('resize', resizeCanvas, { passive: true });

function handleMotionPreferenceChange(event) {
  if (event.matches) {
    stopMatrix();
    if (typingTimer) window.clearTimeout(typingTimer);
    typingTimer = null;
    if (typedTarget) typedTarget.textContent = phrases[0];
    revealItems.forEach(item => item.classList.add('visible'));
  } else {
    startMatrix();
    if (typedTarget && !typingTimer) runTyping();
  }
}

if (typeof motionQuery.addEventListener === 'function') {
  motionQuery.addEventListener('change', handleMotionPreferenceChange);
} else if (typeof motionQuery.addListener === 'function') {
  motionQuery.addListener(handleMotionPreferenceChange);
}
