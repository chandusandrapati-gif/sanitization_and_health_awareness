/* ==========================================================================
   SAFE DRINKING WATER - PIPELINE VISUALIZER & SAFETY CHECKER TOOL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPipelineVisualizer();
  initWaterSafetyChecker();
});

/* 1. Water Contamination Pipeline Visualizer Logic */
const PIPELINE_STEPS = [
  {
    id: 'source',
    title: '1. Source',
    subtitle: 'Groundwater / Surface',
    icon: 'fa-mountain-sun',
    color: '#0284c7',
    description: 'Natural water originates from rivers, lakes, rainwater, or groundwater wells. Even clear-looking natural water often carries invisible microorganisms or suspended mineral particles.',
    precautions: 'Avoid storing or collecting water near latrines, agricultural runoff, or industrial outlets.'
  },
  {
    id: 'contamination',
    title: '2. Contamination',
    subtitle: 'Bacteria & Runoff',
    icon: 'fa-triangle-exclamation',
    color: '#f43f5e',
    description: 'Unprotected water sources suffer from bacterial intrusion (E. coli, Vibrio cholerae), chemical runoff, agricultural fertilizers, or animal waste contamination.',
    precautions: 'Identify contamination risks early. Boiling or chlorination is vital if water source purity is unknown.'
  },
  {
    id: 'treatment',
    title: '3. Treatment',
    subtitle: 'Boil / Filter / UV',
    icon: 'fa-filter',
    color: '#0d9488',
    description: 'Purification methods neutralize pathogens. Continuous 1-minute boiling kills 99.9% of biological pathogens. RO, filtration, chlorination, or UV light destroy bacterial DNA.',
    precautions: 'Always clean water filter candles and UV Quartz sleeves regularly for effective filtration.'
  },
  {
    id: 'storage',
    title: '4. Safe Storage',
    subtitle: 'Covered Containers',
    icon: 'fa-jar',
    color: '#f59e0b',
    description: 'Purified water must be stored in clean, narrow-necked, or tap-fitted covered containers. Open buckets lead to re-contamination through dirty hands or dipping utensils.',
    precautions: 'Wash storage vessels daily and never dip bare hands or unwashed cups into drinking water.'
  },
  {
    id: 'consumption',
    title: '5. Consumption',
    subtitle: 'Healthy Hydration',
    icon: 'fa-glass-water',
    color: '#10b981',
    description: 'Safe, clean drinking water protects gastrointestinal health, prevents dehydration, and supports vital organ function across all age groups.',
    precautions: 'Drink purified water throughout the day and use clean, dedicated drinking glasses.'
  }
];

function initPipelineVisualizer() {
  const container = document.getElementById('pipelineVisualizer');
  if (!container) return;

  renderPipeline(0);
}

function renderPipeline(activeIndex) {
  const container = document.getElementById('pipelineVisualizer');
  if (!container) return;

  const current = PIPELINE_STEPS[activeIndex];
  const stepCount = PIPELINE_STEPS.length;
  const dropletPosition = 5 + (activeIndex * (90 / (stepCount - 1)));

  container.innerHTML = `
    <div class="pipeline-flow">
      <div class="pipeline-track"></div>
      <div class="pipeline-droplet" style="left: ${dropletPosition}%;"></div>

      ${PIPELINE_STEPS.map((step, idx) => `
        <div class="pipeline-step-node ${idx === activeIndex ? 'active' : ''}" onclick="selectPipelineStep(${idx})">
          <div class="pipeline-node-icon" style="${idx === activeIndex ? 'background: ' + step.color + '; color: white;' : ''}">
            <i class="fas ${step.icon}"></i>
          </div>
          <div class="pipeline-node-title">${step.title}</div>
          <div class="pipeline-node-subtitle">${step.subtitle}</div>
        </div>
      `).join('')}
    </div>

    <div class="pipeline-detail-card" style="border-left-color: ${current.color};">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
        <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">
          <i class="fas ${current.icon}" style="color: ${current.color};"></i> ${current.title} Details
        </h4>
        <span class="badge" style="background: ${current.color}20; color: ${current.color};">Step ${activeIndex + 1} of 5</span>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 1rem;">${current.description}</p>
      <div style="background: var(--bg-card); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        <strong style="color: var(--text-primary); font-size: 0.85rem;"><i class="fas fa-shield" style="color: var(--accent-teal);"></i> Safety Tip:</strong>
        <span style="color: var(--text-secondary); font-size: 0.85rem;"> ${current.precautions}</span>
      </div>
    </div>
  `;
}

window.selectPipelineStep = function(index) {
  renderPipeline(index);
};

/* 2. "Is Your Water Safe?" Question-based Educational Checker */
const CHECKER_QUESTIONS = [
  {
    id: 1,
    question: "How is your household drinking water treated before consumption?",
    options: [
      { text: "Boiled for 1+ min / RO / UV / Filtered", score: 25 },
      { text: "Left to settle in open bucket", score: 5 },
      { text: "Drawn directly from tap or well without treatment", score: 0 }
    ]
  },
  {
    id: 2,
    question: "How is drinking water stored at your home?",
    options: [
      { text: "In a clean, covered container with a dispensing tap", score: 25 },
      { text: "In a covered pitcher or vessel (using a clean ladle)", score: 20 },
      { text: "In an open bucket or uncovered pot", score: 0 }
    ]
  },
  {
    id: 3,
    question: "How often are water storage vessels thoroughly scrubbed and cleaned?",
    options: [
      { text: "Daily or every 2 days", score: 25 },
      { text: "Once a week", score: 15 },
      { text: "Rarely or only when visible dirt appears", score: 0 }
    ]
  },
  {
    id: 4,
    question: "Are drinking water vessels kept away from waste bins or drain outlets?",
    options: [
      { text: "Yes, kept on an elevated clean counter", score: 25 },
      { text: "Sometimes kept near wash basins", score: 10 },
      { text: "Placed on the ground near drainage", score: 0 }
    ]
  }
];

let checkerAnswers = {};

function initWaterSafetyChecker() {
  const container = document.getElementById('waterCheckerBox');
  if (!container) return;

  renderCheckerQuestion(0);
}

let currentCheckerStep = 0;

function renderCheckerQuestion(stepIndex) {
  const container = document.getElementById('waterCheckerBox');
  if (!container) return;

  if (stepIndex >= CHECKER_QUESTIONS.length) {
    renderCheckerResults();
    return;
  }

  const q = CHECKER_QUESTIONS[stepIndex];
  const progressPercent = Math.round(((stepIndex + 1) / CHECKER_QUESTIONS.length) * 100);

  container.innerHTML = `
    <div class="water-checker-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <span class="badge badge-teal"><i class="fas fa-droplet"></i> Water Safety Awareness Checker</span>
        <span class="badge badge-blue">Step ${stepIndex + 1} of ${CHECKER_QUESTIONS.length}</span>
      </div>

      <div class="handwash-progress">
        <div class="handwash-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>

      <h3 class="checker-question">${q.question}</h3>

      <div class="checker-options">
        ${q.options.map((opt, idx) => `
          <button class="checker-option-btn ${checkerAnswers[q.id] === idx ? 'selected' : ''}" onclick="selectCheckerOption(${q.id}, ${idx}, ${opt.score}, ${stepIndex})">
            <i class="far ${checkerAnswers[q.id] === idx ? 'fa-check-circle' : 'fa-circle'}"></i>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>

      <p style="font-size: 0.8rem; color: var(--text-muted); text-align: center;">
        <i class="fas fa-info-circle"></i> Educational awareness tool only — does not constitute scientific laboratory testing.
      </p>
    </div>
  `;
}

window.selectCheckerOption = function(qId, optionIdx, scoreVal, stepIndex) {
  checkerAnswers[qId] = optionIdx;
  checkerAnswers[`score_${qId}`] = scoreVal;

  setTimeout(() => {
    renderCheckerQuestion(stepIndex + 1);
  }, 250);
};

function renderCheckerResults() {
  const container = document.getElementById('waterCheckerBox');
  if (!container) return;

  let totalScore = 0;
  for (let i = 1; i <= CHECKER_QUESTIONS.length; i++) {
    totalScore += checkerAnswers[`score_${i}`] || 0;
  }

  let rating = "";
  let ratingClass = "";
  let advice = "";

  if (totalScore >= 80) {
    rating = "High Safe Water Awareness";
    ratingClass = "badge-green";
    advice = "Excellent handling! Your boiling/filtration and covered storage practices follow recommended public health guidelines.";
  } else if (totalScore >= 50) {
    rating = "Moderate Safety Awareness";
    ratingClass = "badge-amber";
    advice = "Good start! Upgrade your storage to covered containers with taps and ensure regular boiling or filtration to prevent contamination.";
  } else {
    rating = "High Contamination Risk Awareness";
    ratingClass = "badge-rose";
    advice = "Caution: Open storage and unboiled water pose bacterial risks. Start boiling drinking water for 1 minute and use covered vessels immediately.";
  }

  container.innerHTML = `
    <div class="water-checker-card" style="text-align: center;">
      <div style="margin-bottom: 1rem;">
        <span class="badge ${ratingClass}" style="font-size: 1rem; padding: 0.5rem 1.25rem;">
          <i class="fas fa-shield-halved"></i> ${rating}
        </span>
      </div>

      <h3 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-primary);">
        Awareness Score: ${totalScore} / 100
      </h3>

      <p style="color: var(--text-secondary); margin-bottom: 1.5rem; max-width: 500px; margin-left: auto; margin-right: auto; font-size: 1rem;">
        ${advice}
      </p>

      <div style="background: var(--bg-secondary); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; text-align: left; border: 1px solid var(--border-color);">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
          <i class="fas fa-list-check" style="color: var(--accent-teal);"></i> Recommended Actions for Safe Water:
        </h4>
        <ul style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.9rem; color: var(--text-secondary);">
          <li><i class="fas fa-check" style="color: var(--accent-green);"></i> Boil drinking water for 1 full minute at a rolling boil.</li>
          <li><i class="fas fa-check" style="color: var(--accent-green);"></i> Store water in clean containers fitted with taps or ladles.</li>
          <li><i class="fas fa-check" style="color: var(--accent-green);"></i> Wash water storage vessels thoroughly every day.</li>
        </ul>
      </div>

      <button class="btn btn-primary" onclick="resetWaterChecker()">
        <i class="fas fa-rotate-right"></i> Check Again
      </button>
    </div>
  `;
}

window.resetWaterChecker = function() {
  checkerAnswers = {};
  renderCheckerQuestion(0);
};
