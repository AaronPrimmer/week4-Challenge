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
const answer1 = document.getElementById("answer-one");
const answer2 = document.getElementById("answer-two");
const answer3 = document.getElementById("answer-three");
const quizTimeRemaingClass = document.querySelector(".timer");
const TOTAL_TIME = 60;
let quizAnswers = 0;
let answeredQuestions = 0;
let timerLeft = TOTAL_TIME;
let randomizeQuestions = [];

// Event listener for the start button
startButton.addEventListener("click", () => {
  startGame();
});

answer1.addEventListener("click", () => {});
answer2.addEventListener("click", () => {});
answer3.addEventListener("click", () => {});

// Starts the current game, resetting values and starting the timer
function startGame() {
  quizAnswers = 0;
  answeredQuestions = 0;
  timeRemaining.textContent = `${TOTAL_TIME}`;
  question.textContent = "";
  updateValues();
  updateProgressBar();
  answerButtons.setAttribute("visibility", "visible");
  quizTimeRemaingClass.setAttribute("color", "white");

  organizeQuestions();
  startTimer();
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

// Randomizes the questions
function organizeQuestions() {
  randomizeQuestions = questionKey
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// End the game
function endGame() {}

// Starts the timer and the game begins
function startTimer() {
  let quizInterval = setInterval(() => {
    if (timerLeft == 0) {
      clearInterval(quizInterval);
      endGame();
    } else if (timerLeft > 30) {
      //progressBar.setAttribute("accent-color", "hsl(120, 46%, 40%)");
      //progressBar.style.accentColor = "#379537ff";
    } else if (timerLeft <= 30 && timerLeft > 10) {
      //progressBar.setAttribute("accent-color", "hsla(56, 100%, 70%, 1.00)");
      //progressBar.style.accentColor = "#fff566ff";
    } else if (timerLeft != 0 && timerLeft <= 10) {
      //progressBar.setAttribute("accent-color", "hsl(0, 100%, 70%)");
      //progressBar.style.accentColor = "#ff6666ff";
    }

    timerLeft--;
    timeRemaining.textContent = timerLeft;
    updateProgressBar();
  }, 1000);
}
