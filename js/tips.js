/* ==========================================================================
   SANITIZATION & HEALTH AWARENESS PORTAL - TIPS JAVASCRIPT
   Handles Daily Rotating Health Tip, Tip Library Filter, Favorites (localStorage)
   ========================================================================== */

const HEALTH_TIPS = [
  {
    id: 1,
    category: "handwashing",
    title: "20-Second Scrub Rule",
    content: "Scrub your hands with soap and clean water for at least 20 seconds. Sing 'Happy Birthday' twice to ensure sufficient cleaning time!",
    badge: "Hand Hygiene",
    icon: "fa-soap"
  },
  {
    id: 2,
    category: "water",
    title: "Safe Drinking Water",
    content: "Boil drinking water for at least 1 minute or use certified filtration to kill harmful pathogens and prevent waterborne diseases like cholera.",
    badge: "Water Safety",
    icon: "fa-glass-water"
  },
  {
    id: 3,
    category: "food",
    title: "Raw vs Cooked Food Separation",
    content: "Always store raw meat, poultry, and seafood separately from ready-to-eat foods to prevent cross-contamination in your kitchen.",
    badge: "Food Hygiene",
    icon: "fa-utensils"
  },
  {
    id: 4,
    category: "surroundings",
    title: "Eliminate Standing Water",
    content: "Empty and scrub flower pots, buckets, and water coolers weekly to prevent mosquito breeding grounds and reduce dengue risk.",
    badge: "Clean Surroundings",
    icon: "fa-mosquito"
  },
  {
    id: 5,
    category: "personal",
    title: "Cough & Sneeze Etiquette",
    content: "Cover your mouth and nose with a tissue or flexed elbow when coughing or sneezing, and dispose of tissues immediately in a closed bin.",
    badge: "Respiratory Hygiene",
    icon: "fa-head-side-mask"
  },
  {
    id: 6,
    category: "handwashing",
    title: "Key Handwashing Moments",
    content: "Always wash hands before eating, after using the restroom, after blowing your nose, and after touching garbage or pets.",
    badge: "Hand Hygiene",
    icon: "fa-hands-bubbles"
  },
  {
    id: 7,
    category: "surroundings",
    title: "3-Bin Waste Segregation",
    content: "Separate household waste into Wet (Organic), Dry (Recyclable), and Hazardous (Medicines/Chemicals) bins for safe disposal.",
    badge: "Waste Disposal",
    icon: "fa-trash-can"
  },
  {
    id: 8,
    category: "immunity",
    title: "Hydration & Sleep",
    content: "Drink 8-10 glasses of clean water daily and get 7-8 hours of sleep to strengthen your immune system's natural defense mechanism.",
    badge: "Immunity Boost",
    icon: "fa-heart-pulse"
  },
  {
    id: 9,
    category: "personal",
    title: "Disinfect Frequently Touched Surfaces",
    content: "Regularly clean door handles, light switches, phone screens, and keyboards using an alcohol-based disinfectant solution.",
    badge: "Surface Hygiene",
    icon: "fa-spray-can-sparkles"
  },
  {
    id: 10,
    category: "food",
    title: "Thorough Vegetable Washing",
    content: "Rinse all fruits and vegetables under cold running water before peeling, cutting, or consuming to wash away pesticides and microbes.",
    badge: "Food Hygiene",
    icon: "fa-apple-whole"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderDailyTip();
  renderTipsList(HEALTH_TIPS);
  initTipFilters();
  initSearch();
});

/* 1. Daily Rotating Tip Logic */
function renderDailyTip() {
  const dailyTipCard = document.getElementById('dailyTipCard');
  if (!dailyTipCard) return;

  // Use current date hash to pick a deterministic daily tip
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const tipIndex = dayOfYear % HEALTH_TIPS.length;
  const tip = HEALTH_TIPS[tipIndex];

  dailyTipCard.innerHTML = `
    <div class="tip-content-box">
      <i class="fas ${tip.icon} tip-bulb-icon"></i>
      <div>
        <div class="tip-header">
          <span class="badge badge-teal">${tip.badge}</span>
          <span class="badge badge-amber"><i class="fas fa-calendar-day"></i> Tip of the Day</span>
        </div>
        <h3 class="tip-body">${tip.title}</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem;">${tip.content}</p>
        <div class="tip-footer-actions">
          <button class="btn btn-sm btn-primary" onclick="saveFavoriteTip(${tip.id})">
            <i class="${isTipFavorite(tip.id) ? 'fas' : 'far'} fa-heart"></i> ${isTipFavorite(tip.id) ? 'Saved' : 'Save Tip'}
          </button>
          <button class="btn btn-sm btn-outline" onclick="copyTipText('${escape(tip.title)}', '${escape(tip.content)}')">
            <i class="fas fa-copy"></i> Copy
          </button>
          <button class="btn btn-sm btn-secondary" onclick="renderRandomTip()">
            <i class="fas fa-shuffle"></i> New Tip
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderRandomTip() {
  const dailyTipCard = document.getElementById('dailyTipCard');
  if (!dailyTipCard) return;

  const randomIndex = Math.floor(Math.random() * HEALTH_TIPS.length);
  const tip = HEALTH_TIPS[randomIndex];

  dailyTipCard.innerHTML = `
    <div class="tip-content-box">
      <i class="fas ${tip.icon} tip-bulb-icon"></i>
      <div>
        <div class="tip-header">
          <span class="badge badge-teal">${tip.badge}</span>
          <span class="badge badge-amber"><i class="fas fa-sparkles"></i> Rotating Health Tip</span>
        </div>
        <h3 class="tip-body">${tip.title}</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem;">${tip.content}</p>
        <div class="tip-footer-actions">
          <button class="btn btn-sm btn-primary" onclick="saveFavoriteTip(${tip.id})">
            <i class="${isTipFavorite(tip.id) ? 'fas' : 'far'} fa-heart"></i> ${isTipFavorite(tip.id) ? 'Saved' : 'Save Tip'}
          </button>
          <button class="btn btn-sm btn-outline" onclick="copyTipText('${escape(tip.title)}', '${escape(tip.content)}')">
            <i class="fas fa-copy"></i> Copy
          </button>
          <button class="btn btn-sm btn-secondary" onclick="renderRandomTip()">
            <i class="fas fa-shuffle"></i> New Tip
          </button>
        </div>
      </div>
    </div>
  `;
  showToast('Loaded new health tip!', 'info');
}

/* 2. Render Full Tip Cards */
function renderTipsList(tipsArray) {
  const tipsGrid = document.getElementById('tipsGrid');
  if (!tipsGrid) return;

  if (tipsArray.length === 0) {
    tipsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
        <p>No health tips found matching your filter or search.</p>
      </div>
    `;
    return;
  }

  const favorites = getFavoriteTips();

  tipsGrid.innerHTML = tipsArray.map(tip => {
    const isFav = favorites.includes(tip.id);
    return `
      <div class="card">
        <div class="card-icon teal">
          <i class="fas ${tip.icon}"></i>
        </div>
        <div style="display:flex; justify-between; align-items:center; margin-bottom: 0.5rem;">
          <span class="badge badge-teal">${tip.badge}</span>
          <button style="background:none; border:none; cursor:pointer; font-size:1.25rem; color:${isFav ? 'var(--accent-rose)' : 'var(--text-muted)'};" 
                  onclick="toggleFavoriteTip(${tip.id})" title="Favorite Tip">
            <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
          </button>
        </div>
        <h3 class="card-title">${tip.title}</h3>
        <p class="card-text">${tip.content}</p>
        <div style="margin-top:auto; pt: 1rem;">
          <button class="btn btn-sm btn-outline" style="width:100%;" onclick="copyTipText('${escape(tip.title)}', '${escape(tip.content)}')">
            <i class="fas fa-share-nodes"></i> Share Tip
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* 3. Category Filtering & Search */
function initTipFilters() {
  const filterBtns = document.querySelectorAll('.pill-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      if (category === 'all') {
        renderTipsList(HEALTH_TIPS);
      } else if (category === 'favorites') {
        const favIds = getFavoriteTips();
        const favTips = HEALTH_TIPS.filter(t => favIds.includes(t.id));
        renderTipsList(favTips);
      } else {
        const filtered = HEALTH_TIPS.filter(t => t.category === category);
        renderTipsList(filtered);
      }
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('tipSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filtered = HEALTH_TIPS.filter(tip => 
        tip.title.toLowerCase().includes(query) || 
        tip.content.toLowerCase().includes(query) ||
        tip.badge.toLowerCase().includes(query)
      );
      renderTipsList(filtered);
    });
  }
}

/* 4. LocalStorage Favorites Management */
function getFavoriteTips() {
  return JSON.parse(localStorage.getItem('fav_health_tips') || '[]');
}

function isTipFavorite(id) {
  return getFavoriteTips().includes(id);
}

function toggleFavoriteTip(id) {
  let favorites = getFavoriteTips();
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
    showToast('Tip removed from favorites', 'info');
  } else {
    favorites.push(id);
    showToast('Tip saved to your favorites!', 'success');
  }
  localStorage.setItem('fav_health_tips', JSON.stringify(favorites));
  renderDailyTip();
  
  // Refresh current view
  const activePill = document.querySelector('.pill-btn.active');
  const activeCategory = activePill ? activePill.getAttribute('data-category') : 'all';
  if (activeCategory === 'favorites') {
    renderTipsList(HEALTH_TIPS.filter(t => favorites.includes(t.id)));
  } else {
    renderTipsList(HEALTH_TIPS);
  }
}

function saveFavoriteTip(id) {
  toggleFavoriteTip(id);
}

function copyTipText(title, content) {
  const text = `${unescape(title)}: ${unescape(content)} - via Sanitization & Health Portal`;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Tip copied to clipboard!', 'success');
  }).catch(() => {
    showToast('Copied to clipboard', 'success');
  });
}
