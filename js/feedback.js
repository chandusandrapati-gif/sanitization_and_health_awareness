/* ==========================================================================
   SANITIZATION & HEALTH AWARENESS PORTAL - FEEDBACK SYSTEM (FRONTEND ONLY)
   Interactive 5-Star Rating, LocalStorage Persistence, 5-Second Rotating Carousel,
   Filterable Cards Grid, Demo & Duplicate Test Badges, and Real-time Validation.
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'hygienepulse_feedbacks';

  // 1. Initial Sample / Demo Feedback Entries
  // Includes realistic feedback and explicitly repeated/duplicate entries for testing
  const DEFAULT_SAMPLE_FEEDBACKS = [
    {
      id: 'demo-1',
      name: 'Priya Sharma',
      role: 'Student, Grade 12',
      rating: 5,
      category: 'Safe Drinking Water',
      message: 'The water purification pipeline visualizer helped me understand the exact difference between chlorination and UV treatment. Excellent educational animations!',
      date: '2026-11-01',
      isDemo: true
    },
    {
      id: 'demo-2',
      name: 'Rahul Verma',
      role: 'B.Tech CSE Student',
      rating: 5,
      category: 'Website Design & Usability',
      message: 'Smooth animations, responsive layout on mobile, and seamless dark mode support make this health portal extremely engaging. Loved the interactive quiz scoring engine!',
      date: '2026-11-02',
      isDemo: true
    },
    {
      id: 'demo-3',
      name: 'Dr. Ananya Sen',
      role: 'Public Health Volunteer',
      rating: 4,
      category: 'Health Awareness & Diseases',
      message: 'The symptom breakdown and warning signs for waterborne illnesses are medically accurate and easy for school students and families to understand.',
      date: '2026-11-03',
      isDemo: true
    },
    {
      id: 'demo-4',
      name: 'Vikram Malhotra',
      role: 'School Health Coordinator',
      rating: 5,
      category: 'Hand Hygiene & Sanitization',
      message: 'We projected the 9-step handwashing guide during morning assembly. The 20-second scrub visual and completion badge made hygiene lessons fun for young children.',
      date: '2026-11-04',
      isDemo: true
    },
    {
      id: 'demo-5',
      name: 'Amit Patel',
      role: 'College Visitor',
      rating: 4,
      category: 'Daily Tips & Quiz',
      message: 'Great educational platform! Very practical tips for daily personal hygiene, waste segregation, and safe water handling.',
      date: '2026-11-05',
      isDemo: true
    },
    {
      id: 'demo-6',
      name: 'Amit Patel',
      role: 'College Visitor',
      rating: 4,
      category: 'Daily Tips & Quiz',
      message: 'Great educational platform! Very practical tips for daily personal hygiene, waste segregation, and safe water handling.',
      date: '2026-11-05',
      isDemo: true
    },
    {
      id: 'demo-7',
      name: 'Sneha Reddy',
      role: 'Community Ambassador',
      rating: 5,
      category: 'Campus & Community Campaigns',
      message: 'The campaign calendar and volunteer guidelines gave our student club an actionable framework for our campus clean water drive.',
      date: '2026-11-06',
      isDemo: true
    }
  ];

  // In-memory state
  let feedbackList = [];
  let currentCarouselIndex = 0;
  let carouselTimer = null;
  let isCarouselHovered = false;
  let selectedRating = 0;
  let activeCategoryFilter = 'All';
  let activeRatingFilter = 'All';
  let currentSearchQuery = '';

  // Rating label map
  const RATING_LABELS = {
    0: 'Select your rating',
    1: '1 Star - Poor',
    2: '2 Stars - Fair',
    3: '3 Stars - Good',
    4: '4 Stars - Very Good',
    5: '5 Stars - Outstanding!'
  };

  // Category Theme Badges
  const CATEGORY_COLORS = {
    'Safe Drinking Water': 'badge-blue',
    'Hand Hygiene & Sanitization': 'badge-teal',
    'Health Awareness & Diseases': 'badge-rose',
    'Daily Tips & Quiz': 'badge-amber',
    'Website Design & Usability': 'badge-green',
    'Campus & Community Campaigns': 'badge-teal',
    'General Feedback': 'badge-blue'
  };

  /* ==========================================================================
     INIT FUNCTION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    loadFeedbacks();
    initStarRating();
    initFeedbackForm();
    initCarousel();
    initFilters();
    renderAllViews();
  });

  /* ==========================================================================
     DATA MANAGEMENT (LocalStorage)
     ========================================================================== */
  function loadFeedbacks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        feedbackList = JSON.parse(stored);
        if (!Array.isArray(feedbackList) || feedbackList.length === 0) {
          feedbackList = [...DEFAULT_SAMPLE_FEEDBACKS];
          saveFeedbacks();
        }
      } else {
        feedbackList = [...DEFAULT_SAMPLE_FEEDBACKS];
        saveFeedbacks();
      }
    } catch (e) {
      console.warn('LocalStorage error, falling back to default feedbacks:', e);
      feedbackList = [...DEFAULT_SAMPLE_FEEDBACKS];
    }
    tagDuplicates();
  }

  function saveFeedbacks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackList));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
    tagDuplicates();
  }

  // Tag duplicate entries for testing visualization
  function tagDuplicates() {
    const seen = new Map();
    feedbackList.forEach((item) => {
      // Create signature based on name and message
      const sig = `${(item.name || '').trim().toLowerCase()}|${(item.message || '').trim().toLowerCase()}`;
      if (seen.has(sig)) {
        item.isDuplicate = true;
        const firstId = seen.get(sig);
        const original = feedbackList.find(f => f.id === firstId);
        if (original) original.isDuplicate = true;
      } else {
        seen.set(sig, item.id);
        if (item.isDuplicate === undefined) {
          item.isDuplicate = false;
        }
      }
    });
  }

  /* ==========================================================================
     INTERACTIVE 5-STAR RATING COMPONENT
     ========================================================================== */
  function initStarRating() {
    const starContainer = document.getElementById('starRatingInput');
    const ratingLabel = document.getElementById('starRatingLabel');
    if (!starContainer) return;

    const stars = starContainer.querySelectorAll('.star-btn');

    stars.forEach((star) => {
      const starVal = parseInt(star.getAttribute('data-value'), 10);

      // Mouse enter / hover
      star.addEventListener('mouseenter', () => {
        highlightStars(starVal);
        if (ratingLabel) {
          ratingLabel.textContent = RATING_LABELS[starVal];
          ratingLabel.className = 'star-rating-hint active';
        }
      });

      // Click to select
      star.addEventListener('click', () => {
        selectedRating = starVal;
        highlightStars(selectedRating);
        const ratingError = document.getElementById('ratingError');
        if (ratingError) ratingError.style.display = 'none';
        if (ratingLabel) {
          ratingLabel.textContent = RATING_LABELS[selectedRating];
          ratingLabel.className = 'star-rating-hint selected';
        }
      });

      // Keyboard support
      star.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          star.click();
        }
      });
    });

    // Mouse leave container -> restore selected rating
    starContainer.addEventListener('mouseleave', () => {
      highlightStars(selectedRating);
      if (ratingLabel) {
        ratingLabel.textContent = RATING_LABELS[selectedRating];
        ratingLabel.className = selectedRating > 0 ? 'star-rating-hint selected' : 'star-rating-hint';
      }
    });
  }

  function highlightStars(val) {
    const starContainer = document.getElementById('starRatingInput');
    if (!starContainer) return;
    const stars = starContainer.querySelectorAll('.star-btn');
    stars.forEach((star) => {
      const starVal = parseInt(star.getAttribute('data-value'), 10);
      if (starVal <= val) {
        star.classList.add('active');
        star.innerHTML = '<i class="fas fa-star"></i>';
      } else {
        star.classList.remove('active');
        star.innerHTML = '<i class="far fa-star"></i>';
      }
    });
  }

  function resetStarRating() {
    selectedRating = 0;
    highlightStars(0);
    const ratingLabel = document.getElementById('starRatingLabel');
    if (ratingLabel) {
      ratingLabel.textContent = RATING_LABELS[0];
      ratingLabel.className = 'star-rating-hint';
    }
  }

  /* ==========================================================================
     FEEDBACK SUBMISSION FORM & VALIDATION
     ========================================================================== */
  function initFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    const msgInput = document.getElementById('fbMessage');
    const charCounter = document.getElementById('fbCharCounter');
    const resetDataBtn = document.getElementById('resetFeedbackDataBtn');

    // Live character counter
    if (msgInput && charCounter) {
      msgInput.addEventListener('input', () => {
        const len = msgInput.value.length;
        charCounter.textContent = `${len} / 500 characters`;
        if (len > 500) {
          charCounter.style.color = 'var(--accent-rose)';
        } else {
          charCounter.style.color = 'var(--text-muted)';
        }
      });
    }

    // Reset dataset button
    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Reset feedback data to default sample entries? Your added reviews will be cleared.')) {
          feedbackList = [...DEFAULT_SAMPLE_FEEDBACKS];
          saveFeedbacks();
          currentCarouselIndex = 0;
          renderAllViews();
          if (typeof showToast === 'function') {
            showToast('Feedback dataset reset to default sample entries.', 'info');
          }
        }
      });
    }

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const nameInput = document.getElementById('fbName');
      const roleInput = document.getElementById('fbRole');
      const categorySelect = document.getElementById('fbCategory');
      const messageInput = document.getElementById('fbMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const role = roleInput ? roleInput.value.trim() || 'Visitor' : 'Visitor';
      const category = categorySelect ? categorySelect.value : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Validation flags
      let isValid = true;

      // 1. Validate Name
      const nameError = document.getElementById('nameError');
      if (!name || name.length < 2) {
        if (nameError) {
          nameError.textContent = 'Please enter your name (minimum 2 characters).';
          nameError.style.display = 'block';
        }
        isValid = false;
      } else if (nameError) {
        nameError.style.display = 'none';
      }

      // 2. Validate Star Rating
      const ratingError = document.getElementById('ratingError');
      if (selectedRating < 1 || selectedRating > 5) {
        if (ratingError) {
          ratingError.textContent = 'Please select a star rating from 1 to 5 stars.';
          ratingError.style.display = 'block';
        }
        isValid = false;
      } else if (ratingError) {
        ratingError.style.display = 'none';
      }

      // 3. Validate Category
      const catError = document.getElementById('categoryError');
      if (!category) {
        if (catError) {
          catError.textContent = 'Please choose a relevant feedback category.';
          catError.style.display = 'block';
        }
        isValid = false;
      } else if (catError) {
        catError.style.display = 'none';
      }

      // 4. Validate Message
      const msgError = document.getElementById('messageError');
      if (!message || message.length < 10) {
        if (msgError) {
          msgError.textContent = 'Please write a feedback message of at least 10 characters.';
          msgError.style.display = 'block';
        }
        isValid = false;
      } else if (message.length > 500) {
        if (msgError) {
          msgError.textContent = 'Message exceeds maximum length of 500 characters.';
          msgError.style.display = 'block';
        }
        isValid = false;
      } else if (msgError) {
        msgError.style.display = 'none';
      }

      if (!isValid) return;

      // Create new feedback object (XSS escaped)
      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0];

      const newFeedback = {
        id: 'user-' + Date.now(),
        name: escapeHtml(name),
        role: escapeHtml(role),
        rating: selectedRating,
        category: escapeHtml(category),
        message: escapeHtml(message),
        date: formattedDate,
        isDemo: false
      };

      // Add to front of list
      feedbackList.unshift(newFeedback);
      saveFeedbacks();

      // Reset form
      form.reset();
      resetStarRating();
      if (charCounter) charCounter.textContent = '0 / 500 characters';

      // Show inline success message
      const successBanner = document.getElementById('feedbackSuccessMessage');
      if (successBanner) {
        successBanner.style.display = 'flex';
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Display global toast notification
      if (typeof showToast === 'function') {
        showToast(`Thank you, ${escapeHtml(name)}! Your feedback has been published.`, 'success');
      }

      // Automatically jump carousel to the new user feedback
      currentCarouselIndex = 0;
      renderAllViews();
    });

    // Reset another feedback button in success banner
    const writeAnotherBtn = document.getElementById('writeAnotherFeedbackBtn');
    if (writeAnotherBtn) {
      writeAnotherBtn.addEventListener('click', () => {
        const successBanner = document.getElementById('feedbackSuccessMessage');
        if (successBanner) successBanner.style.display = 'none';
      });
    }
  }

  /* ==========================================================================
     ROTATING FEEDBACK WIDGET (5-SECOND SPOTLIGHT CAROUSEL)
     ========================================================================== */
  function initCarousel() {
    const widget = document.getElementById('rotatingFeedbackWidget');
    const prevBtn = document.getElementById('prevFeedbackBtn');
    const nextBtn = document.getElementById('nextFeedbackBtn');

    if (!widget) return;

    // Previous & Next controls
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevCarouselSlide();
        restartCarouselTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextCarouselSlide();
        restartCarouselTimer();
      });
    }

    // Pause on hover
    widget.addEventListener('mouseenter', () => {
      isCarouselHovered = true;
      const pauseBadge = document.getElementById('carouselPauseIndicator');
      if (pauseBadge) pauseBadge.style.opacity = '1';
    });

    widget.addEventListener('mouseleave', () => {
      isCarouselHovered = false;
      const pauseBadge = document.getElementById('carouselPauseIndicator');
      if (pauseBadge) pauseBadge.style.opacity = '0';
    });

    // Start 5-second interval timer
    startCarouselTimer();
  }

  function startCarouselTimer() {
    if (carouselTimer) clearInterval(carouselTimer);
    carouselTimer = setInterval(() => {
      if (!isCarouselHovered && feedbackList.length > 1) {
        nextCarouselSlide();
      }
    }, 5000); // Exactly 5 seconds
  }

  function restartCarouselTimer() {
    startCarouselTimer();
  }

  function nextCarouselSlide() {
    if (feedbackList.length === 0) return;
    currentCarouselIndex = (currentCarouselIndex + 1) % feedbackList.length;
    renderCarouselCard();
  }

  function prevCarouselSlide() {
    if (feedbackList.length === 0) return;
    currentCarouselIndex = (currentCarouselIndex - 1 + feedbackList.length) % feedbackList.length;
    renderCarouselCard();
  }

  function renderCarouselCard() {
    const cardContainer = document.getElementById('carouselCardContainer');
    const dotsContainer = document.getElementById('carouselPaginationDots');
    const counterBadge = document.getElementById('carouselCounterBadge');

    if (!cardContainer || feedbackList.length === 0) return;

    const item = feedbackList[currentCarouselIndex];
    if (!item) return;

    // Render smooth slide transition
    cardContainer.style.opacity = '0';
    cardContainer.style.transform = 'translateY(8px)';

    setTimeout(() => {
      const initials = getInitials(item.name);
      const starsHtml = renderStarRating(item.rating);
      const catClass = CATEGORY_COLORS[item.category] || 'badge-teal';

      // Demo label
      const demoBadgeHtml = item.isDemo
        ? `<span class="badge badge-demo" title="Pre-loaded demonstration feedback entry"><i class="fas fa-flask"></i> Demo Feedback</span>`
        : `<span class="badge badge-verified" title="Verified visitor feedback"><i class="fas fa-circle-check"></i> Visitor Review</span>`;

      // Duplicate label
      const duplicateBadgeHtml = item.isDuplicate
        ? `<span class="badge badge-duplicate" title="Identical/repeated review for testing"><i class="fas fa-copy"></i> Test Duplicate</span>`
        : '';

      cardContainer.innerHTML = `
        <div class="spotlight-feedback-card">
          <div class="spotlight-card-header">
            <div class="user-meta-group">
              <div class="user-avatar-circle" aria-hidden="true">${initials}</div>
              <div>
                <h4 class="user-name">${item.name}</h4>
                <div class="user-role-text">${item.role || 'Website Visitor'}</div>
              </div>
            </div>
            <div class="spotlight-badges">
              ${demoBadgeHtml}
              ${duplicateBadgeHtml}
            </div>
          </div>

          <div class="spotlight-rating-row">
            <div class="stars-display" aria-label="${item.rating} out of 5 stars">${starsHtml}</div>
            <span class="rating-number-tag">${item.rating}.0 / 5.0</span>
            <span class="badge ${catClass}"><i class="fas fa-tag"></i> ${item.category}</span>
          </div>

          <p class="spotlight-message">
            <i class="fas fa-quote-left quote-icon-decor"></i>
            ${item.message}
          </p>

          <div class="spotlight-card-footer">
            <span class="feedback-date"><i class="far fa-calendar-alt"></i> ${formatDate(item.date)}</span>
            <span class="widget-live-indicator"><span class="pulse-dot"></span> Rotating Every 5s</span>
          </div>
        </div>
      `;

      cardContainer.style.opacity = '1';
      cardContainer.style.transform = 'translateY(0)';
    }, 150);

    // Update counter
    if (counterBadge) {
      counterBadge.textContent = `${currentCarouselIndex + 1} of ${feedbackList.length}`;
    }

    // Update pagination dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      feedbackList.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === currentCarouselIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to feedback slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          currentCarouselIndex = idx;
          renderCarouselCard();
          restartCarouselTimer();
        });
        dotsContainer.appendChild(dot);
      });
    }
  }

  /* ==========================================================================
     FEEDBACK CARDS DISPLAY GRID & FILTERS
     ========================================================================== */
  function initFilters() {
    const categoryPillsContainer = document.getElementById('feedbackCategoryPills');
    const ratingFilterSelect = document.getElementById('feedbackRatingFilter');
    const searchInput = document.getElementById('feedbackSearchInput');

    // Category pills click
    if (categoryPillsContainer) {
      categoryPillsContainer.querySelectorAll('.filter-pill').forEach((pill) => {
        pill.addEventListener('click', () => {
          categoryPillsContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          activeCategoryFilter = pill.getAttribute('data-category') || 'All';
          renderFeedbackCardsGrid();
        });
      });
    }

    // Rating dropdown change
    if (ratingFilterSelect) {
      ratingFilterSelect.addEventListener('change', () => {
        activeRatingFilter = ratingFilterSelect.value;
        renderFeedbackCardsGrid();
      });
    }

    // Search query input
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        currentSearchQuery = searchInput.value.trim().toLowerCase();
        renderFeedbackCardsGrid();
      });
    }
  }

  function renderFeedbackCardsGrid() {
    const grid = document.getElementById('feedbackCardsGrid');
    const countLabel = document.getElementById('feedbackFilteredCount');
    if (!grid) return;

    // Filter feedback items
    let filtered = feedbackList.filter((item) => {
      // Category filter
      if (activeCategoryFilter !== 'All' && item.category !== activeCategoryFilter) {
        return false;
      }
      // Rating filter
      if (activeRatingFilter !== 'All') {
        const targetRating = parseInt(activeRatingFilter, 10);
        if (item.rating !== targetRating) return false;
      }
      // Search query
      if (currentSearchQuery) {
        const matchName = (item.name || '').toLowerCase().includes(currentSearchQuery);
        const matchMsg = (item.message || '').toLowerCase().includes(currentSearchQuery);
        const matchCat = (item.category || '').toLowerCase().includes(currentSearchQuery);
        if (!matchName && !matchMsg && !matchCat) return false;
      }
      return true;
    });

    if (countLabel) {
      countLabel.textContent = `Showing ${filtered.length} of ${feedbackList.length} reviews`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="feedback-empty-state">
          <div class="empty-icon"><i class="fas fa-comment-slash"></i></div>
          <h3>No Reviews Found</h3>
          <p>No feedback matching the selected filter criteria. Try choosing a different category or rating.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((item) => {
      const initials = getInitials(item.name);
      const starsHtml = renderStarRating(item.rating);
      const catClass = CATEGORY_COLORS[item.category] || 'badge-teal';

      // Clearly label sample feedback as demo feedback
      const demoTag = item.isDemo
        ? `<span class="badge badge-demo" title="Sample demonstration feedback"><i class="fas fa-flask"></i> Demo Feedback</span>`
        : `<span class="badge badge-verified" title="Visitor submission"><i class="fas fa-circle-check"></i> Visitor</span>`;

      // Label repeated / duplicate feedback entries for testing
      const duplicateTag = item.isDuplicate
        ? `<span class="badge badge-duplicate" title="Identical/repeated review for duplicate testing"><i class="fas fa-copy"></i> Duplicate Test Entry</span>`
        : '';

      return `
        <div class="feedback-card" data-id="${item.id}">
          <div class="feedback-card-top">
            <div class="feedback-user-info">
              <div class="user-avatar-circle" aria-hidden="true">${initials}</div>
              <div>
                <h4 class="feedback-user-name">${item.name}</h4>
                <div class="feedback-user-role">${item.role || 'Visitor'}</div>
              </div>
            </div>
            <div class="feedback-card-tags">
              ${demoTag}
              ${duplicateTag}
            </div>
          </div>

          <div class="feedback-rating-meta">
            <div class="stars-display" aria-label="${item.rating} stars">${starsHtml}</div>
            <span class="badge ${catClass}"><i class="fas fa-tag"></i> ${item.category}</span>
          </div>

          <p class="feedback-card-text">${item.message}</p>

          <div class="feedback-card-footer">
            <span class="feedback-date"><i class="far fa-calendar-alt"></i> ${formatDate(item.date)}</span>
            <span class="feedback-rating-value">${item.rating}.0 ★</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ==========================================================================
     RATING ANALYTICS SUMMARY
     ========================================================================== */
  function renderAnalyticsSummary() {
    const avgScoreEl = document.getElementById('analyticsAvgScore');
    const avgStarsEl = document.getElementById('analyticsAvgStars');
    const totalCountEl = document.getElementById('analyticsTotalCount');
    const barsContainer = document.getElementById('analyticsRatingBars');

    if (feedbackList.length === 0) return;

    const total = feedbackList.length;
    const sum = feedbackList.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = (sum / total).toFixed(1);

    if (avgScoreEl) avgScoreEl.textContent = avg;
    if (avgStarsEl) avgStarsEl.innerHTML = renderStarRating(Math.round(avg));
    if (totalCountEl) totalCountEl.textContent = `Based on ${total} verified community reviews`;

    // Calculate rating counts
    if (barsContainer) {
      const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      feedbackList.forEach(item => {
        if (counts[item.rating] !== undefined) counts[item.rating]++;
      });

      let barsHtml = '';
      for (let star = 5; star >= 1; star--) {
        const count = counts[star];
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        barsHtml += `
          <div class="analytics-bar-row">
            <span class="bar-star-label">${star} <i class="fas fa-star" style="color:#f59e0b; font-size:0.8rem;"></i></span>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${pct}%;"></div>
            </div>
            <span class="bar-pct-label">${count} (${pct}%)</span>
          </div>
        `;
      }
      barsContainer.innerHTML = barsHtml;
    }
  }

  /* ==========================================================================
     HELPERS & UTILITIES
     ========================================================================== */
  function renderAllViews() {
    tagDuplicates();
    renderCarouselCard();
    renderFeedbackCardsGrid();
    renderAnalyticsSummary();
  }

  function renderStarRating(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        html += '<i class="fas fa-star star-filled"></i>';
      } else {
        html += '<i class="far fa-star star-empty"></i>';
      }
    }
    return html;
  }

  function getInitials(name) {
    if (!name) return 'HP';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'Recent';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Export functions to global scope for debugging or external triggers
  window.FeedbackSystem = {
    getFeedbacks: () => feedbackList,
    nextSlide: nextCarouselSlide,
    prevSlide: prevCarouselSlide,
    resetData: () => {
      feedbackList = [...DEFAULT_SAMPLE_FEEDBACKS];
      saveFeedbacks();
      renderAllViews();
    }
  };

})();
