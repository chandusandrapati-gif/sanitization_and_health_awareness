/* ==========================================================================
   SANITIZATION & HEALTH AWARENESS PORTAL - INTERACTIVE QUIZ ENGINE
   12 Comprehensive MCQs, instant feedback, scoring, awareness levels, local best
   ========================================================================== */

const QUIZ_QUESTIONS = [
  {
    question: "What is the recommended minimum duration for thoroughly scrubbing hands with soap and water?",
    options: [
      "5 seconds",
      "10 seconds",
      "20 seconds",
      "60 seconds"
    ],
    correct: 2,
    explanation: "Health organizations recommend scrubbing all hand surfaces with soap for at least 20 seconds to effectively break down germ cell structures."
  },
  {
    question: "Which of the following is considered a primary cause of waterborne illnesses like Cholera and Typhoid?",
    options: [
      "Air pollution",
      "Consuming drinking water contaminated with sewage or bacteria",
      "Eating raw vegetables washed with boiled water",
      "Lack of physical exercise"
    ],
    correct: 1,
    explanation: "Contaminated water sources carrying pathogenic microbes cause waterborne infectious diseases. Boiling or proper purification prevents infection."
  },
  {
    question: "How long should water be kept at a continuous rolling boil to eliminate pathogenic microbes?",
    options: [
      "5 seconds",
      "At least 1 full minute (3 minutes at high altitudes)",
      "10 minutes only after cooling",
      "Boiling is ineffective against bacteria"
    ],
    correct: 1,
    explanation: "A continuous rolling boil for at least 1 minute neutralizes bacteria, viruses, and protozoa, rendering drinking water biologically safe."
  },
  {
    question: "In standard household waste segregation, which bin should organic food scraps go into?",
    options: [
      "Wet / Organic Trash Bin (Green)",
      "Dry / Plastic Recyclables Bin (Blue)",
      "Hazardous E-Waste Bin (Red)",
      "General Glass Bin"
    ],
    correct: 0,
    explanation: "Organic waste like leftover food and peels goes into the Green (Wet) bin for composting and sanitary waste processing."
  },
  {
    question: "Why should standing water around households be regularly drained or covered?",
    options: [
      "It absorbs clean oxygen from the air",
      "It provides breeding grounds for disease-transmitting mosquitoes like Aedes and Anopheles",
      "It causes indoor soil erosion",
      "It attracts harmful UV radiation"
    ],
    correct: 1,
    explanation: "Stagnant clean or dirty water allows mosquitoes to lay eggs, leading to outbreaks of Dengue, Malaria, and Chikungunya."
  },
  {
    question: "What is the proper etiquette when coughing or sneezing in public?",
    options: [
      "Covering your mouth with open palms",
      "Coughing directly into open space",
      "Covering your mouth and nose with a tissue or flexed elbow",
      "Holding your breath"
    ],
    correct: 2,
    explanation: "Coughing into your elbow or tissue prevents respiratory droplets from contaminating your hands and spreading airborne pathogens."
  },
  {
    question: "What is cross-contamination in food hygiene?",
    options: [
      "Mixing sugar and salt in recipes",
      "Transfer of harmful bacteria from raw foods (like raw meat) to cooked or ready-to-eat foods",
      "Cooking food on low heat for too long",
      "Refrigerating leftover food overnight"
    ],
    correct: 1,
    explanation: "Cross-contamination occurs when pathogens from raw meat, unwashed boards, or dirty hands spread to ready-to-eat meals."
  },
  {
    question: "What makes household drinking water storage unsafe?",
    options: [
      "Storing water in clean, covered glass jars",
      "Storing water in open, unwashed containers where hands or dirty scoops touch the water",
      "Using narrow-necked containers with taps",
      "Boiling water before pouring into a clean pitcher"
    ],
    correct: 1,
    explanation: "Open containers allow dust, insects, and contaminated hands to re-introduce pathogens into safe water."
  },
  {
    question: "Which habit contributes most effectively to respiratory hygiene during viral season?",
    options: [
      "Wearing a well-fitting mask in crowded indoor spaces",
      "Drinking cold sugary beverages",
      "Washing hair twice daily",
      "Skipping meals"
    ],
    correct: 0,
    explanation: "Masks trap respiratory droplets and prevent inhalation of viral aerosols in crowded or poorly ventilated areas."
  },
  {
    question: "When should you seek immediate professional medical attention rather than self-treating at home?",
    options: [
      "Mild tiredness after a walk",
      "High persistent fever with severe breathing difficulty, chest pain, or dehydration",
      "A minor paper cut",
      "Feeling sleepy at night"
    ],
    correct: 1,
    explanation: "High fever accompanied by difficulty breathing, chest pain, or severe dehydration requires urgent medical diagnosis."
  },
  {
    question: "What is the primary objective of community hand hygiene campaigns?",
    options: [
      "To increase soap sales",
      "To reduce infectious disease transmission and foster lifelong sanitary habits",
      "To eliminate the need for clean water",
      "To replace medical treatments"
    ],
    correct: 1,
    explanation: "Hand hygiene campaigns educate populations, significantly reducing gastrointestinal and respiratory infection rates."
  },
  {
    question: "What is the main advantage of UV (Ultraviolet) water purifiers?",
    options: [
      "They add healthy sugars to water",
      "They destroy bacterial & viral DNA without adding chemicals or altering taste",
      "They remove plastic bottles from oceans",
      "They freeze water instantly"
    ],
    correct: 1,
    explanation: "UV light inactivates waterborne pathogens by destroying their nucleic acids, rendering them incapable of reproduction."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});

function initQuiz() {
  const quizBox = document.getElementById('quizBox');
  if (!quizBox) return;

  currentQuestionIndex = 0;
  score = 0;
  answerSelected = false;

  renderQuestion();
}

function renderQuestion() {
  const quizBox = document.getElementById('quizBox');
  if (!quizBox) return;

  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex) / total) * 100);

  quizBox.innerHTML = `
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
    </div>
    
    <div class="quiz-header">
      <span class="badge badge-teal">Question ${currentQuestionIndex + 1} of ${total}</span>
      <span class="badge badge-amber"><i class="fas fa-trophy"></i> Score: ${score}/${currentQuestionIndex}</span>
    </div>

    <h3 class="quiz-question">${q.question}</h3>

    <div class="quiz-options" id="quizOptions">
      ${q.options.map((opt, idx) => `
        <button class="option-btn" data-index="${idx}" onclick="selectAnswer(${idx})">
          <span><strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}</span>
          <i class="far fa-circle"></i>
        </button>
      `).join('')}
    </div>

    <div class="explanation-box" id="explanationBox">
      <h4 style="color: var(--accent-blue); margin-bottom: 0.35rem;"><i class="fas fa-lightbulb"></i> Educational Insight:</h4>
      <p id="explanationText" style="color: var(--text-primary); font-size: 0.95rem;">${q.explanation}</p>
    </div>

    <div class="quiz-footer">
      <span style="color: var(--text-muted); font-size: 0.85rem;">Select your answer to proceed</span>
      <button class="btn btn-primary" id="nextQuestionBtn" onclick="nextQuestion()" disabled>
        Next Question <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  `;
}

function selectAnswer(selectedIndex) {
  if (answerSelected) return;
  answerSelected = true;

  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const isCorrect = selectedIndex === q.correct;
  
  if (isCorrect) {
    score++;
  }

  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach((btn, idx) => {
    btn.disabled = true;
    const icon = btn.querySelector('i');

    if (idx === q.correct) {
      btn.classList.add('correct');
      icon.className = 'fas fa-check-circle';
    } else if (idx === selectedIndex) {
      btn.classList.add('incorrect');
      icon.className = 'fas fa-times-circle';
    }
  });

  const expBox = document.getElementById('explanationBox');
  if (expBox) {
    expBox.style.display = 'block';
  }

  const nextBtn = document.getElementById('nextQuestionBtn');
  if (nextBtn) {
    nextBtn.disabled = false;
  }
}

function nextQuestion() {
  answerSelected = false;
  currentQuestionIndex++;

  if (currentQuestionIndex < QUIZ_QUESTIONS.length) {
    renderQuestion();
  } else {
    renderQuizResults();
  }
}

function renderQuizResults() {
  const quizBox = document.getElementById('quizBox');
  if (!quizBox) return;

  const total = QUIZ_QUESTIONS.length;
  const percentage = Math.round((score / total) * 100);

  const previousHighScore = parseInt(localStorage.getItem('quiz_high_score') || '0', 10);
  if (score > previousHighScore) {
    localStorage.setItem('quiz_high_score', score);
  }
  const highScore = Math.max(score, previousHighScore);

  let awarenessTitle = "";
  let awarenessBadgeClass = "";
  let feedbackMessage = "";

  if (percentage <= 40) {
    awarenessTitle = "Needs More Awareness";
    awarenessBadgeClass = "badge-rose";
    feedbackMessage = "Good attempt! You can greatly improve your health literacy by exploring our Safe Water and Sanitization modules.";
  } else if (percentage <= 70) {
    awarenessTitle = "Good Awareness";
    awarenessBadgeClass = "badge-amber";
    feedbackMessage = "Solid foundational knowledge! Review a few preventive hygiene practices to reach champion level.";
  } else if (percentage <= 90) {
    awarenessTitle = "Excellent Awareness";
    awarenessBadgeClass = "badge-blue";
    feedbackMessage = "Impressive score! You demonstrate a strong understanding of public health, safe drinking water, and sanitization.";
  } else {
    awarenessTitle = "Health Awareness Champion";
    awarenessBadgeClass = "badge-green";
    feedbackMessage = "Outstanding! You possess exemplary public health awareness and can lead hygiene initiatives in your community.";
  }

  quizBox.innerHTML = `
    <div class="result-card">
      <div class="score-badge">
        <span class="score-val">${score}/${total}</span>
        <span class="score-label">${percentage}%</span>
      </div>

      <div style="margin-bottom: 1rem;">
        <span class="badge ${awarenessBadgeClass}" style="font-size: 1rem; padding: 0.5rem 1.25rem;">
          <i class="fas fa-award"></i> Level: ${awarenessTitle}
        </span>
      </div>

      <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-primary);">Quiz Complete!</h2>
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem; max-width: 520px; margin-left: auto; margin-right: auto; font-size: 1.05rem;">
        ${feedbackMessage}
      </p>

      <div style="background: var(--bg-secondary); border-radius: var(--radius-md); padding: 1rem; max-width: 400px; margin: 0 auto 2rem auto; border: 1px solid var(--border-color);">
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin: 0;">
          <i class="fas fa-crown" style="color: var(--accent-amber);"></i> Personal Best: <strong>${highScore} / ${total}</strong>
        </p>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="initQuiz()">
          <i class="fas fa-rotate-right"></i> Retake Quiz
        </button>
        <a href="sanitization.html" class="btn btn-secondary">
          <i class="fas fa-book-open"></i> Review Hygiene Guide
        </a>
      </div>
    </div>
  `;
}
