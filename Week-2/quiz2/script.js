const quiz = [
  {
    question: "Which language is used for web page interactivity?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "JavaScript"
  },
  {
    question: "Which tag creates a heading?",
    options: ["<p>", "<h1>", "<img>", "<a>"],
    answer: "<h1>"
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-color", "text-color", "color", "background-color"],
    answer: "color"
  },
  {
    question: "Which HTML tag is used to insert an image?",
    options: ["<image>", "<img>", "<src>", "<pic>"],
    answer: "<img>"
  },
  {
    question: "Which HTML attribute specifies a link's destination?",
    options: ["src", "href", "link", "target"],
    answer: "href"
  }
];

const TIME_PER_QUESTION = 30;

let index = 0;
let score = 0;
let time = TIME_PER_QUESTION;
let timerId = null;

const question = document.getElementById("question");
const options = document.getElementById("options");
const result = document.getElementById("result");
const timerDisplay = document.getElementById("timer");

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function loadQuestion() {
  time = TIME_PER_QUESTION;
  timerDisplay.innerHTML = "Time: " + time;

  question.innerHTML = quiz[index].question;
  options.innerHTML = "";

  quiz[index].options.forEach(option => {
    const safeOption = escapeHTML(option);
    options.innerHTML += `<input type="radio" name="ans" value="${safeOption}">${safeOption}<br>`;
  });
}

function endQuiz(message) {
  result.innerHTML = message;
  question.innerHTML = "";
  options.innerHTML = "";
  timerDisplay.innerHTML = "";
  clearInterval(timerId);
}

function nextQuestion() {
  const selected = document.querySelector('input[name="ans"]:checked');

  if (selected) {
    if (selected.value === quiz[index].answer) {
      score++;
    } else {
      score -= 0.25;
    }
  }

  index++;

  if (index < quiz.length) {
    loadQuestion();
  } else {
    endQuiz("Your Score: " + score.toFixed(2) + "/" + quiz.length);
  }
}

loadQuestion();

timerId = setInterval(function () {
  time--;
  timerDisplay.innerHTML = "Time: " + time;

  if (time <= 0) {
    endQuiz("Time Over! Score: " + score.toFixed(2) + "/" + quiz.length);
  }
}, 1000);