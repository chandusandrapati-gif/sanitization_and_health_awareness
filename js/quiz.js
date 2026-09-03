/* ==========================================================================
   SANITIZATION & HEALTH AWARENESS PORTAL - QUIZ JAVASCRIPT
   Handles Interactive MCQ Quiz, Instant Feedback, Scoring, LocalStorage Highscore
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
    explanation: "Health organizations recommend scrubbing all hand surfaces with soap for at least 20 seconds to effectively dissolve germ cell membranes."
  },
  {
    question: "Which of the following is considered the primary cause of waterborne illnesses like Cholera and Typhoid?",
    options: [
      "Air pollution",
      "Consuming drinking water contaminated with sewage or bacteria",
      "Eating raw vegetables washed with boiled water",
      "Lack of physical exercise"
    ],
    correct: 1,
    explanation: "Contaminated water sources carrying pathogenic microbes cause waterborne infectious diseases. Boiling or filtering water prevents infection."
  },
  {
    question: "In standard 3-bin household waste segregation, which bin should organic food scraps go into?",
    options: [
      "Wet / Organic Trash Bin (Green)",
      "Dry / Plastic Recyclables Bin (Blue)",
      "Hazardous E-Waste Bin (Red)",
      "General Glass Bin"
    ],
    correct: 0,
    explanation: "Organic waste like leftover food and vegetable peels goes into the Green (Wet) bin for composting."
  },
  {
    question: "Why should standing water around households be regularly drained or treated?",
    options: [
      "It absorbs clean oxygen from the air",
      "It provides breeding grounds for disease-transmitting mosquitoes like Aedes and Anopheles",
      "It causes soil erosion indoors",
      "It attracts harmful UV radiation"
    ],
    correct: 1,
    explanation: "Stagnant clean or dirty water allows mosquitoes to lay eggs, leading to outbreaks of Dengue, Malaria, and Chikungunya."
  },
  {
    question: "What is the proper etiquette when coughing or sneezing in public?",
    options: [
      "Covering your mouth with open palms",
      "Coughing into the air towards open space",
      "Covering your mouth/nose with a tissue or flexed elbow",
      "Holding your breath"
    ],
    correct: 2,
    explanation: "Coughing into your elbow or tissue prevents droplets from contaminating your hands and spreading airborne pathogens."
  },
  {
    question: "At what temperature should water reach during boiling to ensure harmful bacteria and parasites are destroyed?",
    options: [
      "Warm lukewarm temperature",
      "Rolling boil (100°C / 212°F) for at least 1 full minute",
      "50°C for 10 seconds",
      "Freezing point"
    ],
    correct: 1,
    explanation: "A continuous rolling boil for at least 1 minute neutralizes virtually all bacteria, viruses, and protozoa."
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
    question: "Which habit contributes most effectively to personal respiratory hygiene during flu season?",
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
      "High persistent fever with severe breathing difficulty or dehydration",
      "A minor paper cut",
      "Feeling sleepy at night"
    ],
    correct: 1,
    explanation: "High fever accompanied by difficulty breathing, chest pain, or severe dehydration requires urgent medical diagnosis."
  },
  {
    question: "What is the role of routine childhood vaccinations in public health awareness?",
    options: [
      "They treat active viral infections immediately",
      "They train the immune system to build herd immunity against deadly preventable diseases like Polio and Measles",
      "They replace the need for handwashing",
      "They cure bacterial wound infections"
    ],
    correct: 1,
    explanation: "Vaccines stimulate antibody production, building individual and community protection against dangerous infectious diseases."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let answerSelected = false;

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});

function initQuiz() {
  const quizBox = document.getElementById('quizBox');
  if (!quizBox) return;

  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  answerSelected = false;

  renderQuestion();
}

function renderQuestion() {
  const quizBox = document.getElementById('quizBox');
  if (!quizBox) return;

  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex) / total) * 100;

  quizBox.innerHTML = `
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
    </div>
    
    <div class="quiz-header">
      <span class="badge badge-teal">Question ${currentQuestionIndex + 1} of ${total}</span>
      <span class="badge badge-amber"><i class="fas fa-trophy"></i> Current Score: ${score}/${currentQuestionIndex}</span>
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
      <h4><i class="fas fa-lightbulb"></i> Health Insight:</h4>
      <p id="explanationText">${q.explanation}</p>
    </div>

    <div class="quiz-footer">
      <span style="color: var(--text-muted); font-size: 0.85rem;">Select your response to proceed</span>
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
  userAnswers.push({ questionIndex: currentQuestionIndex, selected: selectedIndex, correct: isCorrect });

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

  // Show explanation
  const expBox = document.getElementById('explanationBox');
  if (expBox) {
    expBox.style.display = 'block';
  }

  // Enable Next button
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

  // High score tracking
  const previousHighScore = parseInt(localStorage.getItem('quiz_high_score') || '0', 10);
  if (score > previousHighScore) {
    localStorage.setItem('quiz_high_score', score);
  }
  const highScore = Math.max(score, previousHighScore);

  let feedbackTitle = "Sanitization Master!";
  let feedbackMessage = "Outstanding! You possess comprehensive awareness about personal hygiene, water safety, and disease prevention.";
  
  if (percentage < 50) {
    feedbackTitle = "Keep Learning!";
    feedbackMessage = "Good attempt! Review our Sanitization and Health Awareness pages to boost your health literacy score.";
  } else if (percentage < 80) {
    feedbackTitle = "Great Awareness!";
    feedbackMessage = "Solid job! You have strong foundational knowledge in health and sanitation practices.";
  }

  quizBox.innerHTML = `
    <div class="result-card">
      <div class="score-badge">
        <span class="score-val">${score}/${total}</span>
        <span class="score-label">${percentage}%</span>
      </div>

      <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-primary);">${feedbackTitle}</h2>
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem; max-width: 500px; margin-left: auto; margin-right: auto;">
        ${feedbackMessage}
      </p>

      <div style="background: var(--bg-secondary); border-radius: var(--radius-md); padding: 1rem; max-width: 400px; margin: 0 auto 2rem auto; border: 1px solid var(--border-color);">
        <p style="font-size: 0.9rem; color: var(--text-secondary);">
          <i class="fas fa-crown" style="color: var(--accent-amber);"></i> Personal Best: <strong>${highScore} / ${total}</strong>
        </p>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="initQuiz()">
          <i class="fas fa-rotate-right"></i> Retake Quiz
        </button>
        <a href="sanitization.html" class="btn btn-secondary">
          <i class="fas fa-book-open"></i> Review Hygiene Topics
        </a>
      </div>
    </div>
  `;
}
