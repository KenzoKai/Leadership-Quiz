const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const retakeBtn = document.getElementById('retake-btn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const timerEl = document.getElementById('time');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const resultEl = document.getElementById('result');

const timeLimit = 15; // seconds per question
let timeLeft, timerInterval;
let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    text: 'When a rival undermines you, do you:',
    options: [
      { text: 'Confront privately and seek resolution.', value: 2 },
      { text: 'Expose them publicly to deter others.', value: 4 },
      { text: 'Monitor silently and stay vigilant.', value: 3 },
      { text: 'Eliminate them as a threat.', value: 5 }
    ]
  },
  {
    text: 'Would you rather be loved and hated, or feared and respected?',
    options: [
      { text: 'Loved and hated equally.', value: 2 },
      { text: 'Feared but respected.', value: 5 },
      { text: 'Both equally.', value: 3 },
      { text: 'Indifferent to feelings.', value: 1 }
    ]
  },
  {
    text: 'When truth harms your reputation, do you:',
    options: [
      { text: 'Reveal it with your spin.', value: 4 },
      { text: 'Hide it completely.', value: 5 },
      { text: 'Address it honestly.', value: 2 },
      { text: 'Ignore and move forward.', value: 1 }
    ]
  },
  {
    text: 'How do you reward loyalty?',
    options: [
      { text: 'Generous rewards to secure allies.', value: 5 },
      { text: 'Moderate rewards.', value: 3 },
      { text: 'Minimal rewards.', value: 2 },
      { text: 'I don’t reward loyalty.', value: 1 }
    ]
  },
  {
    text: 'Your decision-making style is:',
    options: [
      { text: 'Swift and decisive.', value: 5 },
      { text: 'Careful and slow.', value: 2 },
      { text: 'Flexible and opportunistic.', value: 4 },
      { text: 'Indecisive.', value: 1 }
    ]
  },
  {
    text: 'When gathering support, you:',
    options: [
      { text: 'Charm and persuade.', value: 4 },
      { text: 'Bribe key figures.', value: 5 },
      { text: 'Form genuine bonds.', value: 2 },
      { text: 'Ignore public opinion.', value: 1 }
    ]
  },
  {
    text: 'You plan your strategy:',
    options: [
      { text: 'With rigid plans.', value: 2 },
      { text: 'With adaptable goals.', value: 5 },
      { text: 'Improvise as you go.', value: 3 },
      { text: 'Wait and react.', value: 1 }
    ]
  },
  {
    text: 'Facing a crisis, your priority is to:',
    options: [
      { text: 'Preserve reputation.', value: 4 },
      { text: 'Secure power at any cost.', value: 5 },
      { text: 'Maintain ethical standards.', value: 2 },
      { text: 'Avoid involvement.', value: 1 }
    ]
  },
  {
    text: 'Your reputation is:',
    options: [
      { text: 'A tool to control perception.', value: 5 },
      { text: 'A reflection of character.', value: 3 },
      { text: 'Unimportant.', value: 1 },
      { text: 'Maintained cautiously.', value: 4 }
    ]
  },
  {
    text: 'You trust others:',
    options: [
      { text: 'Easily to build alliances.', value: 2 },
      { text: 'Cautiously and test them.', value: 4 },
      { text: 'Rarely and keep secrets.', value: 5 },
      { text: 'Blindly.', value: 1 }
    ]
  },
  {
    text: 'How do you handle dissent?',
    options: [
      { text: 'Engage and debate.', value: 2 },
      { text: 'Ignore it.', value: 3 },
      { text: 'Suppress it harshly.', value: 5 },
      { text: 'Use it strategically.', value: 4 }
    ]
  },
  {
    text: 'When negotiating, you:',
    options: [
      { text: 'Find win-win.', value: 2 },
      { text: 'Use leverage ruthlessly.', value: 5 },
      { text: 'Make small concessions.', value: 3 },
      { text: 'Walk away easily.', value: 1 }
    ]
  },
  {
    text: 'Your public speeches are:',
    options: [
      { text: 'Purely truthful.', value: 2 },
      { text: 'Dressed in flattery.', value: 4 },
      { text: 'Deceptively persuasive.', value: 5 },
      { text: 'Minimal and direct.', value: 3 }
    ]
  },
  {
    text: 'Power should be:',
    options: [
      { text: 'Shared to maintain loyalty.', value: 3 },
      { text: 'Centralized always.', value: 5 },
      { text: 'Rotated frequently.', value: 2 },
      { text: 'Given then taken.', value: 4 }
    ]
  },
  {
    text: 'In alliances, you:',
    options: [
      { text: 'Keep friends close, enemies closer.', value: 5 },
      { text: 'Form genuine friendships.', value: 2 },
      { text: 'Use allies for info.', value: 4 },
      { text: 'Avoid strong alliances.', value: 1 }
    ]
  },
  {
    text: 'If betraying someone benefits you, you:',
    options: [
      { text: 'Betray without remorse.', value: 5 },
      { text: 'Struggle but act.', value: 3 },
      { text: 'Avoid betrayal.', value: 2 },
      { text: 'Cannot betray.', value: 1 }
    ]
  },
  {
    text: 'Your risk tolerance is:',
    options: [
      { text: 'High for big gains.', value: 5 },
      { text: 'Moderate and calculated.', value: 4 },
      { text: 'Low.', value: 2 },
      { text: 'None.', value: 1 }
    ]
  },
  {
    text: 'End justifies the means:',
    options: [
      { text: 'Always.', value: 5 },
      { text: 'Most times.', value: 4 },
      { text: 'Rarely.', value: 2 },
      { text: 'Never.', value: 1 }
    ]
  },
  {
    text: 'Your ideal legacy is:',
    options: [
      { text: 'A powerful dynasty.', value: 5 },
      { text: 'A respected ruler.', value: 3 },
      { text: 'A benevolent leader.', value: 2 },
      { text: 'No legacy needed.', value: 1 }
    ]
  }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  startScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  score = 0;
  currentQuestionIndex = 0;
  shuffle(questions);
  showQuestion();
}

function showQuestion() {
  clearInterval(timerInterval);
  nextBtn.disabled = true;
  const current = questions[currentQuestionIndex];
  questionEl.textContent = `${currentQuestionIndex + 1}. ${current.text}`;
  optionsEl.innerHTML = '';
  const opts = [...current.options];
  shuffle(opts);
  opts.forEach(opt => {
    const li = document.createElement('li');
    li.innerHTML = `
      <label>
        <input type="radio" name="option" value="${opt.value}">
        ${opt.text}
      </label>
    `;
    optionsEl.appendChild(li);
  });
  document.getElementsByName('option').forEach(radio => {
    radio.addEventListener('change', () => {
      nextBtn.disabled = false;
    });
  });
  startTimer();
}

function startTimer() {
  timeLeft = timeLimit;
  timerEl.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleNext();
    }
  }, 1000);
}

function handleNext() {
  clearInterval(timerInterval);
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    score += parseInt(selected.value, 10);
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.style.display = 'none';
  resultScreen.style.display = 'block';
  const maxScore = questions.length * 5;
  const percent = (score / maxScore) * 100;
  let verdict = '';
  if (percent >= 80) {
    verdict = 'High Machiavellian leadership potential.';
  } else if (percent >= 60) {
    verdict = 'Moderate leadership potential.';
  } else if (percent >= 40) {
    verdict = 'Low leadership potential.';
  } else {
    verdict = 'Very low leadership potential.';
  }

  // Determine leader profile
  let leaderType, selectionLikelihood, effectiveness;
  if (percent >= 80) {
    leaderType = 'Machiavellian Master Strategist';
    selectionLikelihood = 'Almost certain to be selected';
    effectiveness = 'Extremely effective leadership';
  } else if (percent >= 60) {
    leaderType = 'Pragmatic Power Player';
    selectionLikelihood = 'Likely to be selected';
    effectiveness = 'Highly effective leadership';
  } else if (percent >= 40) {
    leaderType = 'Emerging Diplomat';
    selectionLikelihood = 'Possible to be selected';
    effectiveness = 'Moderately effective leadership';
  } else {
    leaderType = 'Idealistic Visionary';
    selectionLikelihood = 'Unlikely to be selected';
    effectiveness = 'Ineffective leadership';
  }

  // Create shareable text for LinkedIn with Machiavelli quotes based on score
  let quote;
  if (percent >= 80) {
    quote = '“Everyone sees what you appear to be, few experience what you really are.” - Niccolò Machiavelli';
  } else if (percent >= 60) {
    quote = '“The ends justify the means.” - Niccolò Machiavelli';
  } else if (percent >= 40) {
    quote = '“It is not titles that honor men, but men that honor titles.” - Niccolò Machiavelli';
  } else {
    quote = '“Men in general judge more from appearances than from reality.” - Niccolò Machiavelli';
  }
  const shareText = `I scored ${percent.toFixed(0)}% on the Machiavellian Leadership Quiz (${verdict}). Leader Type: ${leaderType}. ${quote}`;

  resultEl.innerHTML = `
    <p>Your Score: ${score} (${percent.toFixed(0)}%)</p>
    <p>${verdict}</p>
    <p><strong>Leader Type:</strong> ${leaderType}</p>
    <p><strong>Selection Likelihood:</strong> ${selectionLikelihood}</p>
    <p><strong>Leadership Effectiveness:</strong> ${effectiveness}</p>
    <p><em>${quote}</em></p>
    <textarea id="share-text" rows="5" cols="50">${shareText}</textarea>
    <button id="copy-btn">Copy Text for LinkedIn</button>
  `;
  document.getElementById('copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Copied to clipboard!');
    });
  });
}

function resetQuiz() {
  resultScreen.style.display = 'none';
  startScreen.style.display = 'block';
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNext);
retakeBtn.addEventListener('click', resetQuiz);