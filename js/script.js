/* ===== PrintCraft Pro – script.js ===== */

/* ─── PRELOADER ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('done');
  }, 2000);
});

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) btn.classList.add('visible');
  else btn.classList.remove('visible');
});

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ─── COUNTER ANIMATION ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

/* ─── INTERSECTION OBSERVER ─── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');

      // Counters
      if (entry.target.classList.contains('hero-stats')) {
        entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      }

      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.animate-up, .animate-left, .animate-right, .hero-stats'
).forEach(el => io.observe(el));

// Service overview cards → scroll to section
document.querySelectorAll('.service-card-overview').forEach(card => {
  card.addEventListener('click', () => {
    const href = card.dataset.href;
    if (href) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ─── STAGGERED ANIMATION FOR CARDS ─── */
const cardIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll(
        '.why-card, .spec-card, .service-card-overview'
      );
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('in-view'), i * 100);
      });
      cardIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.why-grid, .spec-grid, .services-cards-row')
  .forEach(grid => {
    grid.querySelectorAll('.why-card, .spec-card, .service-card-overview')
      .forEach(card => card.classList.add('animate-up'));
    cardIO.observe(grid);
  });

/* ─── CLIENT TABS ─── */
function switchTab(type) {
  document.getElementById('panelAuto').classList.toggle('hidden', type !== 'auto');
  document.getElementById('panelSchool').classList.toggle('hidden', type !== 'school');
  document.getElementById('tabAuto').classList.toggle('active', type === 'auto');
  document.getElementById('tabSchool').classList.toggle('active', type === 'school');
}

/* ─── CONTACT FORM ─── */
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const name    = document.getElementById('fname').value;
  const phone   = document.getElementById('fphone').value;
  const service = document.getElementById('fservice').value;
  const message = document.getElementById('fmessage').value;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  const waMsg = encodeURIComponent(
    `Hello Shree Advertising,\n\nName: ${name}\nPhone: ${phone}\nService Required: ${service}\nDetails: ${message}\n\nPlease send me a quote. Thank you!`
  );
  const waUrl = `https://wa.me/919897638912?text=${waMsg}`;

  setTimeout(() => {
    document.getElementById('formSuccess').classList.remove('hidden');
    document.getElementById('quoteForm').reset();
    btn.innerHTML = '<span>Send Request</span> →';
    btn.disabled = false;
    // Open WhatsApp
    window.open(waUrl, '_blank');
    setTimeout(() => {
      document.getElementById('formSuccess').classList.add('hidden');
    }, 6000);
  }, 1200);
  return false;
}

/* ─── BACK TO TOP ─── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── SMOOTH ACTIVE NAV ─── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--primary)';
    }
  });
});

/* ─── HOVER PARALLAX ON HERO ─── */
document.addEventListener('mousemove', (e) => {
  const hero = document.querySelector('.hero-img');
  if (!hero) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;
  hero.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});
