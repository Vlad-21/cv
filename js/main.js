/* ─── Preloader ──────────────────────────────────────────── */
const preloader = document.getElementById('preloader');

function hidePreloader() { preloader.classList.add('out'); }

const fallback = setTimeout(hidePreloader, 2400);
window.addEventListener('load', () => {
  setTimeout(() => { clearTimeout(fallback); hidePreloader(); }, 1700);
});

/* ─── Scroll reveal ──────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .stagger').forEach(el => revealObs.observe(el));

/* ─── Skill bars ─────────────────────────────────────────── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transform = `scaleX(${e.target.dataset.pct})`;
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.bar-fill').forEach(el => barObs.observe(el));

/* ─── Page dots + active nav ─────────────────────────────── */
const dots     = document.querySelectorAll('.page-dot');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      dots.forEach(d => d.classList.toggle('active', d.dataset.section === id));
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));

/* ─── Contact form ───────────────────────────────────────── */
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://formsubmit.co/ajax/vladkryshchuk20@gmail.com', {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      form.hidden = true;
      formSuccess.hidden = false;
    } else {
      btn.textContent = 'Try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Try again';
    btn.disabled = false;
  }
});
