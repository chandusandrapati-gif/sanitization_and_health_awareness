/* ==========================================================================
   INTERACTIVE 9-STEP HANDWASHING EXPERIENCE
   ========================================================================== */

const HANDWASH_STEPS = [
  {
    step: 1,
    title: "1. Wet Hands",
    desc: "Wet your hands thoroughly with clean, running water (warm or cold).",
    icon: "fa-faucet-drip",
    tip: "Running water removes loose dirt before soap is applied."
  },
  {
    step: 2,
    title: "2. Apply Soap",
    desc: "Apply enough soap to cover all hand surfaces completely.",
    icon: "fa-soap",
    tip: "Liquid or bar soap works effectively to emulsify germs."
  },
  {
    step: 3,
    title: "3. Rub Palms Together",
    desc: "Rub hands palm to palm in circular motions.",
    icon: "fa-hands-bubbles",
    tip: "Creates a rich lather that surrounds skin microbes."
  },
  {
    step: 4,
    title: "4. Interlace Fingers",
    desc: "Rub palm over back of left hand with interlaced fingers, and vice versa.",
    icon: "fa-hand-dots",
    tip: "Cleans the frequently missed gaps between fingers."
  },
  {
    step: 5,
    title: "5. Scrub Backs of Hands",
    desc: "Rub palm to palm with fingers interlaced, scrubbing skin folds.",
    icon: "fa-hand-sparkles",
    tip: "Removes bacteria from outer skin surfaces."
  },
  {
    step: 6,
    title: "6. Clean Thumbs",
    desc: "Rotational rubbing of left thumb clasped in right palm and vice versa.",
    icon: "fa-thumbs-up",
    tip: "Thumbs account for up to 90% of touch-contact germs."
  },
  {
    step: 7,
    title: "7. Scrub Fingertips & Nails",
    desc: "Rotational rubbing, backwards and forwards with clasped fingers of right hand in left palm and vice versa.",
    icon: "fa-hand-back-fist",
    tip: "Nail beds harbor high concentrations of microbes."
  },
  {
    step: 8,
    title: "8. Rinse Thoroughly",
    desc: "Rinse hands thoroughly under clean, running water until all soap residue is washed away.",
    icon: "fa-shower",
    tip: "Flushes away suspended dirt and dissolved virus membranes."
  },
  {
    step: 9,
    title: "9. Dry Completely",
    desc: "Dry hands thoroughly with a single-use towel or clean cloth. Turn off tap with towel if possible.",
    icon: "fa-wind",
    tip: "Wet hands transfer germs 500 times faster than dry hands!"
  }
];

let currentHandwashStep = 0;

document.addEventListener('DOMContentLoaded', () => {
  initHandwashExperience();
});

function initHandwashExperience() {
  const container = document.getElementById('handwashExperienceBox');
  if (!container) return;

  renderHandwashStep(0);
}

function renderHandwashStep(index) {
  const container = document.getElementById('handwashExperienceBox');
  if (!container) return;

  currentHandwashStep = index;
  const total = HANDWASH_STEPS.length;
  const current = HANDWASH_STEPS[index];
  const progressPercent = Math.round(((index + 1) / total) * 100);

  const isCompleted = index === total - 1;

  container.innerHTML = `
    <div class="handwash-experience">
      <div class="handwash-header">
        <div>
          <span class="badge badge-teal">Step-by-Step Handwashing Tour</span>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-top: 0.25rem;">Step ${index + 1} of ${total}</h4>
        </div>
        <span class="badge badge-green">${progressPercent}% Completed</span>
      </div>

      <div class="handwash-progress">
        <div class="handwash-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>

      <div class="handwash-stage">
        <div>
          <div class="handwash-icon-wrapper">
            <i class="fas ${current.icon}"></i>
          </div>
        </div>

        <div class="handwash-stage-content">
          <h3>${current.title}</h3>
          <p>${current.desc}</p>

          <div style="background: var(--bg-secondary); border-left: 4px solid var(--accent-teal); padding: 0.85rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
            <strong style="color: var(--accent-teal); font-size: 0.85rem;"><i class="fas fa-lightbulb"></i> Hygiene Insight:</strong>
            <span style="color: var(--text-secondary); font-size: 0.85rem;"> ${current.tip}</span>
          </div>

          <div class="handwash-nav-btns">
            <button class="btn btn-secondary btn-sm" onclick="prevHandwashStep()" ${index === 0 ? 'disabled' : ''}>
              <i class="fas fa-arrow-left"></i> Previous
            </button>
            <button class="btn btn-primary btn-sm" onclick="nextHandwashStep()">
              ${index === total - 1 ? 'Finish Tour <i class="fas fa-check"></i>' : 'Next Step <i class="fas fa-arrow-right"></i>'}
            </button>
          </div>
        </div>
      </div>

      ${isCompleted ? `
        <div class="completion-badge">
          <h4 style="color: var(--accent-teal-dark); font-size: 1.2rem; font-weight: 800; margin-bottom: 0.25rem;">
            <i class="fas fa-sparkles"></i> Handwashing Complete!
          </h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0;">
            Congratulations! You've mastered all 9 proper handwashing steps. Practice this 20-second technique daily to protect yourself and your community.
          </p>
        </div>
      ` : ''}
    </div>
  `;
}

window.prevHandwashStep = function() {
  if (currentHandwashStep > 0) {
    renderHandwashStep(currentHandwashStep - 1);
  }
};

window.nextHandwashStep = function() {
  if (currentHandwashStep < HANDWASH_STEPS.length - 1) {
    renderHandwashStep(currentHandwashStep + 1);
  } else {
    renderHandwashStep(HANDWASH_STEPS.length - 1);
  }
};
