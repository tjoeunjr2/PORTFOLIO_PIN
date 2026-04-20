// ─── Typed Role Effect ───
const roles = [
  'Full Stack Developer',
  'Python Engineer',
  'Problem Solver',
  'Open Source Contributor',
];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typedRole');

function typeRole() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 50 : 90);
}
typeRole();

// ─── Terminal Animation ───
const termLines = [
  { text: '$ whoami', color: 'var(--cyan)', delay: 0 },
  { text: '> Your Name — Developer', color: '#fff', delay: 600 },
  { text: '$ cat skills.txt', color: 'var(--cyan)', delay: 1400 },
  { text: '> Python, JavaScript, React...', color: '#fff', delay: 2000 },
  { text: '$ ls ./projects', color: 'var(--cyan)', delay: 2800 },
  { text: '> 20+ projects found', color: 'var(--green)', delay: 3400 },
  { text: '$ status --check', color: 'var(--cyan)', delay: 4200 },
  { text: '> ✔ Available for work', color: 'var(--green)', delay: 4800 },
  { text: '_', color: 'var(--cyan)', delay: 5400 },
];

const termBody = document.getElementById('terminalBody');
termLines.forEach(({ text, color, delay }) => {
  setTimeout(() => {
    const line = document.createElement('div');
    line.textContent = text;
    line.style.color = color;
    line.style.opacity = '0';
    line.style.transform = 'translateX(-5px)';
    line.style.transition = 'opacity 0.3s, transform 0.3s';
    termBody.appendChild(line);
    setTimeout(() => { line.style.opacity = '1'; line.style.transform = 'none'; }, 50);
  }, delay);
});

// ─── Scroll Animations (Intersection Observer) ───
// Fade in sections
const fadeEls = document.querySelectorAll('section, .project-card, .skill-category, .contact-item');
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// Skill bars
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(fill => fill.classList.add('animate'));
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

// ─── Navbar Active Link on Scroll ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ─── Lock Site ───
async function lockSite() {
  await fetch('/logout');
  document.body.style.transition = 'opacity 0.4s';
  document.body.style.opacity = '0';
  setTimeout(() => window.location.href = '/', 400);
}

// ─── Smooth Scroll for nav links ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
