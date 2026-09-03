/* ==========================================================================
   SANITIZATION & HEALTH AWARENESS PORTAL - MAIN JAVASCRIPT
   Theme Toggle, Mobile Navigation, Modal Engine, Tab Navigation, Animated Counters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollTop();
  initAccordions();
  highlightActiveNavLink();
  initTopicModals();
  initPreventionTabs();
  initAnimatedCounters();
  initHeroDroplets();
});

/* 1. Theme Switcher (Dark / Light Mode) */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('site_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('site_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* 2. Mobile Menu Toggle */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      hamburgerBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}

/* 3. Back-to-Top Button */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* 4. FAQ Accordion Toggle */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isActive = accordionItem.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });
}

/* 5. Highlight Active Nav Link */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* 6. Health Awareness Expanded Topic Modal Engine */
const HEALTH_TOPIC_DATA = {
  waterborne: {
    title: "Waterborne Infectious Diseases",
    cause: "Pathogenic bacteria (Vibrio cholerae, Salmonella typhi), viruses (Hepatitis A, Rotavirus), or protozoa present in untreated water.",
    spread: "Ingesting water or food contaminated with human/animal sewage, unwashed hands, or unsterilized drinking vessels.",
    warning: "Severe watery diarrhea, high persistent fever, stomach cramps, vomiting, and acute dehydration.",
    prevention: "Boil water for 1+ minute, use RO/UV filtration, store water in covered clean vessels with taps, and wash hands before eating.",
    medical: "Seek immediate emergency medical care if experiencing signs of severe dehydration, blood in stool, or fever above 102°F (38.9°C)."
  },
  respiratory: {
    title: "Respiratory Hygiene & Airborne Illnesses",
    cause: "Airborne viruses (Influenza, RSV, Coronaviruses) and respiratory bacterial infections.",
    spread: "Inhaling microscopic droplets ejected when an infected person coughs, sneezes, talks, or touches shared surfaces.",
    warning: "Persistent cough, sore throat, fever, nasal congestion, body aches, and fatigue.",
    prevention: "Cover coughs with a flexed elbow or tissue, wear well-fitting masks in crowded spaces, ensure good ventilation, and sanitize hands frequently.",
    medical: "Consult a healthcare professional immediately if experiencing shortness of breath, chest pressure, blue lips, or high fever."
  },
  food: {
    title: "Food Hygiene & Safe Preparation",
    cause: "Bacterial contamination (E. coli, Listeria, Staph) caused by improper food handling, undercooking, or poor temperature control.",
    spread: "Cross-contamination between raw meat and ready-to-eat foods, dirty cutting boards, unwashed hands, or leaving cooked food at room temperature.",
    warning: "Nausea, abdominal cramps, vomiting, fever, and acute gastroenteritis within 2 to 24 hours of eating.",
    prevention: "Wash raw produce thoroughly, keep raw and cooked foods separate, cook meat to safe temperatures, and refrigerate leftovers promptly.",
    medical: "Seek medical help if vomiting prevents fluid retention for 24+ hours or if high fever occurs."
  },
  personal: {
    title: "Personal Hygiene & Daily Habits",
    cause: "Accumulation of skin flora, sweat, dust, and environmental pathogens on body surfaces.",
    spread: "Direct skin-to-skin contact, sharing personal items (towels, razors), or inadequate daily washing.",
    warning: "Skin rashes, fungal infections, body odor, dental caries, and localized skin lesions.",
    prevention: "Bathe daily with clean water and mild soap, brush teeth twice daily, keep fingernails short/clean, and wear clean dry clothing.",
    medical: "Consult a doctor for spreading skin infections, unhealing ulcers, or severe dental pain."
  },
  environmental: {
    title: "Environmental Sanitation & Waste Control",
    cause: "Accumulation of solid waste, unmanaged sewage, stagnant drainage, and open dumping.",
    spread: "Flies, rodents, and pests carrying bacteria from waste dumps directly to open food and water supplies.",
    warning: "Increased neighborhood pest infestations, foul odors, and rising localized infectious disease rates.",
    prevention: "Practice 3-bin household waste segregation (Organic, Dry/Recyclables, Hazardous), dispose of garbage in sealed bins, and keep drain lines clear.",
    medical: "Report public sewage leaks or major environmental hazards to local municipal health authorities."
  },
  vector: {
    title: "Vector-Borne Disease Control",
    cause: "Parasites and viruses transmitted by insect vectors (Aedes & Anopheles mosquitoes, ticks, fleas).",
    spread: "Bites from infected mosquitoes breeding in stagnant water containers, flower pots, clogged gutters, or discarded tires.",
    warning: "Sudden high fever, intense joint/muscle pain, severe headache behind eyes, skin rash, and chills.",
    prevention: "Drain standing water weekly, use mosquito nets/screens, apply repellent, and wear long sleeves during peak mosquito hours.",
    medical: "Go to a clinic immediately if high fever occurs with joint pain or bleeding tendencies (suspected Dengue/Malaria)."
  }
};

function initTopicModals() {
  const modalOverlay = document.getElementById('topicModalOverlay');
  if (!modalOverlay) return;

  document.querySelectorAll('[data-topic]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const topicKey = card.getAttribute('data-topic');
      const data = HEALTH_TOPIC_DATA[topicKey];

      if (data) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalCauseText').textContent = data.cause;
        document.getElementById('modalSpreadText').textContent = data.spread;
        document.getElementById('modalWarningText').textContent = data.warning;
        document.getElementById('modalPreventionText').textContent = data.prevention;
        document.getElementById('modalMedicalText').textContent = data.medical;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}

function closeModal() {
  const modalOverlay = document.getElementById('topicModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* 7. Prevention Category Tab Switcher */
function initPreventionTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.style.display = 'none');

      btn.classList.add('active');
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.style.display = 'grid';
      }
    });
  });
}

/* 8. Awareness Impact Dashboard Animated Counter Metrics */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('.counter-num');
  if (counterElements.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-count') || '0', 10);
        animateValue(el, 0, targetVal, 1500);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerText = Math.floor(progress * (end - start) + start) + "+";
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* 9. Hero Section Subtle Water Droplet Effect */
function initHeroDroplets() {
  const heroWrapper = document.querySelector('.hero-image-wrapper');
  if (!heroWrapper) return;

  for (let i = 0; i < 4; i++) {
    const drop = document.createElement('div');
    drop.className = 'hero-particle-droplet';
    drop.style.left = `${Math.random() * 80 + 10}%`;
    drop.style.top = `${Math.random() * 80 + 10}%`;
    drop.style.animationDelay = `${i * 1.2}s`;
    heroWrapper.appendChild(drop);
  }
}

/* 10. Toast Helper */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconClass = 'fa-check-circle';
  if (type === 'info') iconClass = 'fa-info-circle';
  if (type === 'warning') iconClass = 'fa-exclamation-triangle';

  toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
