const questionKey = [
  {
    question: "What year was Javascript invented?",
    answer: "1995",
    solutions: ["1998", "2000", "2006", "1994"],
  },
  {
    question: "What was Javascript's original name?",
    answer: "Livescript",
    solutions: ["Truescript", "Funscript", "C-script", "Junoscript"],
  },
  {
    question: "Which one is not a Javascript data type?",
    answer: "smallint",
    solutions: ["bigint", "string", "boolean", "number", "undefined", "symbol"],
  },
  {
    question:
      "What do you call it when variable and function declarations are moved to the top of their containing scope during compilation?",
    answer: "hoisting",
    solutions: ["lifting", "raising", "booting", "scoping"],
  },
  {
    question:
      "A ________ is a block of code designed to perform a particular task.",
    answer: "function",
    solutions: ["scope", "declaration", "variable", "data type"],
  },
  {
    question: "What does DOM stand for?",
    answer: "Document Object Model",
    solutions: [
      "Document Operation Management",
      "Dang 'ol Model",
      "Doing Our Most",
      "Digital Ocean Module",
    ],
  },
  {
    question:
      "A ________ ________ is a function passed as an argument to another function, to be executed later.",
    answer: "callback function",
    solutions: [
      "certain function",
      "live function",
      "declarative function",
      "smart function",
    ],
  },
  {
    question:
      "________ functions are a concise way to write functions in JavaScript (introduced in ES6).",
    answer: "Arrow",
    solutions: [
      "Chevron",
      "Pointing",
      "Rounded",
      "Similar",
      "Defined",
      "Present",
    ],
  },
  {
    question:
      "Definition: Block-scoped, can be re-assigned but not re-declared within the same scope.",
    answer: "let",
    solutions: ["var", "const", "num", "string", "undefined"],
  },
  {
    question: "What kind of equality does '===' have",
    answer: "strict equality",
    solutions: [
      "loose equality",
      "sub equality",
      "different equality",
      "sudo equality",
      "digital equality",
    ],
  },
];

const progressBar = document.getElementById("answer-progress");
const scoreHeader = document.getElementById("score-number");
const progressScore = document.getElementById("progress-score");
const startButton = document.getElementById("button-to-start");
const timeRemaining = document.getElementById("time-remaining");
const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const quizTimeRemaingClass = document.querySelector(".timer");
const TOTAL_TIME = 60;
let gameStarted = false;
let quizAnswers = 0;
let answeredQuestions = 0;
let timerLeft = TOTAL_TIME;
let randomizeQuestions = [];
let answerList = [];
let randomizeAnswers = [];
let questionIndex = 0;
let quizInterval = "";

// when document loads run the startGame function
document.addEventListener("DOMContentLoaded", function () {
  answerButtons.style.visibility = "hidden";
});

// Event listener for the start button
startButton.addEventListener("click", () => {
  if (!gameStarted) {
    startGame();
  } else {
    skipQuestion();
  }
});

// Starts the current game, resetting values and starting the timer
function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    startButton.classList.add("start-button-gray");
    startButton.classList.remove("start-button");
    startButton.textContent = "Skip";
    quizAnswers = 0;
    answeredQuestions = 0;
    questionIndex = 0;
    timerLeft = TOTAL_TIME;
    timeRemaining.textContent = `${TOTAL_TIME}`;
    question.textContent = "";
    updateValues();
    updateProgressBar();
    progressBar.style.accentColor = "hsla(120, 100%, 68%, 1.00)";
    quizTimeRemaingClass.setAttribute("color", "white");
    answerButtons.style.visibility = "visible";

    randomizeQuestions = randomizeArray(questionKey);
    askQuestions();
    startTimer();
  }
}

// Updates the values of the current score and progress bar
function updateValues() {
  progressScore.textContent = quizAnswers;
  scoreHeader.textContent = quizAnswers;
}

// Updates the Progress Bar
function updateProgressBar() {
  progressBar.value = timerLeft;
}

// Confetti rains down
function blowConfetti() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Asks the questions in order
function askQuestions() {
  //enableButtons();
  answerList = [];
  let solutions = randomizeQuestions[questionIndex].solutions;
  let randomNumber1 = Math.floor(Math.random() * solutions.length);
  let randomNumber2 = 0;
  do {
    randomNumber2 = Math.floor(Math.random() * solutions.length);
  } while (randomNumber2 == randomNumber1 || randomNumber2 == 0);
  answerList.push(randomizeQuestions[questionIndex].answer);
  answerList.push(solutions[randomNumber1]);
  answerList.push(solutions[randomNumber2]);
  randomizeAnswers = randomizeArray(answerList);
  question.textContent = `${questionIndex + 1}. ${
    randomizeQuestions[questionIndex].question
  }`;
  for (let answer of randomizeAnswers) {
    let answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.classList.add("answer-button");
    answerButton.setAttribute("data-answer", answer);
    answerButtons.appendChild(answerButton);

    answerButton.addEventListener("click", () => {
      answerQuestions(answerButton.dataset.answer, answerButton);
    });
  }
}

// Disables all buttons before removal
function disableButtons() {
  for (const button of answerButtons.children) {
    button.disabled = true;
  }
}

// Removes all buttons under answerButtons
function removeAllButtons() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Checks Answered Questions
function answerQuestions(answer, button) {
  disableButtons();
  if (randomizeQuestions[questionIndex].answer == answer) {
    button.textContent = button.textContent + "✅";
    quizAnswers++;
  } else {
    button.textContent = button.textContent + "❌";
  }
  updateValues();
  questionIndex++;
  setTimeout(function () {
    checkQuestionStatus();
  }, 1000);
}

function skipQuestion() {
  if (gameStarted) {
    questionIndex++;
    checkQuestionStatus();
  }
}

// Checks the questionIndex to see if game is still going
function checkQuestionStatus() {
  if (questionIndex != 10) {
    removeAllButtons();
    askQuestions();
  } else if (questionIndex == 10) {
    endGame();
  }
}

// Randomizes the questions
function randomizeArray(unsortedArray) {
  return unsortedArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// End the game
function endGame() {
  clearInterval(quizInterval);
  removeAllButtons();
  answerButtons.style.visibility = "hidden";
  if (quizAnswers == 10) {
    question.textContent = "Congratulations! Perfect Score!";
  } else if (quizAnswers > 7) {
    question.textContent = "So Close! Try Again!";
  } else {
    question.textContent = "Better Luck Next Time";
  }
  if (quizAnswers == 10) {
    blowConfetti();
  }

  startButton.textContent = "Retry";
  startButton.classList.add("start-button");
  startButton.classList.remove("start-button-gray");
  startButton.disabled = false;
  console.log(`Your Score: ${quizAnswers}/10`);
  gameStarted = false;
}

// Starts the timer and the game begins
function startTimer() {
  quizInterval = setInterval(() => {
    timerLeft--;
    timeRemaining.textContent = timerLeft;
    if (timerLeft == 0) {
      endGame();
    } else if (timerLeft > 30) {
      progressBar.style.accentColor = "hsla(120, 100%, 68%, 1.00)";
    } else if (timerLeft <= 30 && timerLeft > 10) {
      progressBar.style.accentColor = "hsla(56, 100%, 70%, 1.00)";
    } else if (timerLeft != 0 && timerLeft <= 10) {
      progressBar.style.accentColor = "hsla(0, 100%, 70%, 1.00)";
    }

    updateProgressBar();
  }, 1000);
}
