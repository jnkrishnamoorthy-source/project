/* =========================================
   INIT AOS
========================================= */
AOS.init({
  duration: 700,
  once: true,
  offset: 60
});

/* =========================================
   TYPED.JS
========================================= */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
      strings: ['Full Stack Developer', 'React.js Developer', 'Node.js Developer', 'UI/UX Enthusiast'],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1800,
      loop: true
    });
  }

  /* =========================================
     PARTICLES
  ========================================= */
  const container = document.getElementById('particles');
  if (container) {
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 6 + 's';
      p.style.animationDuration = (4 + Math.random() * 4) + 's';
      if (Math.random() > 0.5) {
        p.style.background = '#7C3AED';
      }
      container.appendChild(p);
    }
  }

  /* =========================================
     SWIPER – TESTIMONIALS
  ========================================= */
  new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: {
      el: '.testimonial-pagination',
      clickable: true
    }
  });
});

/* =========================================
   NAVBAR SCROLL EFFECTS + ACTIVE SPY
========================================= */
const navbar = document.getElementById('mainNavbar');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

  // Scrolled class
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll spy
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Back to top
  const btn = document.getElementById('backToTop');
  if (btn) {
    btn.classList.toggle('show', scrollY > 400);
  }

  // Animate progress bars when in viewport
  animateSkillBars();
});

/* =========================================
   SMOOTH SCROLL
========================================= */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = target.offsetTop - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
      // Close mobile menu
      const collapse = document.getElementById('navMenu');
      if (collapse && collapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    }
  });
});

/* =========================================
   PROGRESS BARS
========================================= */
let skillsAnimated = false;
function animateSkillBars() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    skillsAnimated = true;
    document.querySelectorAll('.progress-bar[data-width]').forEach(bar => {
      const w = bar.getAttribute('data-width');
      setTimeout(() => { bar.style.width = w + '%'; }, 100);
    });
  }
}
// Run on load too
animateSkillBars();

/* =========================================
   BACK TO TOP
========================================= */
const backTopBtn = document.getElementById('backToTop');
if (backTopBtn) {
  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================================
   CONTACT FORM
========================================= */
const sendBtn = document.querySelector('.btn-send-message');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.contact-input');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) valid = false;
    });
    if (valid) {
      sendBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
      sendBtn.style.background = '#10B981';
      setTimeout(() => {
        sendBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Message';
        sendBtn.style.background = '';
        inputs.forEach(input => { input.value = ''; });
      }, 3000);
    } else {
      sendBtn.innerHTML = '<i class="bi bi-exclamation-circle me-2"></i>Fill all fields';
      sendBtn.style.background = '#EF4444';
      setTimeout(() => {
        sendBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Message';
        sendBtn.style.background = '';
      }, 2000);
    }
  });
}
