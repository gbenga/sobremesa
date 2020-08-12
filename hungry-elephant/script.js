// Global variables
let words = [
  {
    en: "watermelon",
    es: "la sandía",
    img: "img/watermelon.png",
  },
  {
    en: "peach",
    es: "el melocotón",
    img: "img/peach3.png",
  },
  {
    en: "grapes",
    es: "las uvas",
    img: "img/grape3.png",
  },
  {
    en: "apple",
    es: "la manzana",
    img: "img/apple3.png",
  },
  {
    en: "orange",
    es: "la naranja",
    img: "img/orange.png",
  },
  {
    en: "cauliflower",
    es: "el cauliflor",
    img: "img/cauliflower.png",
  },
  {
    en: "potato",
    es: "la patata",
    img: "img/potato.png",
  },
  {
    en: "pepper",
    es: "el pimiento",
    img: "img/pepper.png",
  },
  {
    en: "sweetcorn",
    es: "el maíz",
    img: "img/corn.png",
  },
  {
    en: "carrot",
    es: "la zanahoria",
    img: "img/carrot.png",
  },
];
const usedWords = [];
let numberOfQuestionsAsked = 0;
let correctSoFar = 0;
let currentWord = null;
let lastQuestionCorrect = false;
let mistakes = 0;
// Timer
const startingMinutes = 2;
let time = startingMinutes * 60;

// Elements
const character = document.getElementById("character");
const block = document.getElementById("block");
const timer = document.getElementById("timer");
const questionList = document.getElementById("questions-list");
const answerForm = document.getElementById("answer-form");
const resultDiv = document.querySelector(".result");

// Positions
const characterLeftPosition = "0px";
const characterRightPosition = "200px";
const blockStep = 10;
let blockBottomPosition = block.offsetTop + block.offsetHeight;
let characterTopPosition = character.offsetTop;
let finished = blockBottomPosition > characterTopPosition;

// MAIN
runAtStartAndWhenRight();
setInterval(runCountdown, 1000);

// User-input functions
function moveCharacterLeft() {
  character.style.left = characterLeftPosition;
}

function moveCharacterRight() {
  character.style.left = characterRightPosition;
}

function blockFall() {
  const current = block.offsetTop;
  const newOne = `${current + blockStep}px`;
  block.style.top = newOne;
}

function getWord() {
  if (words.length === 0) return { status: "words array is empty" };
  const word = words[Math.floor(Math.random() * words.length)];
  const wordIndex = words.findIndex((e) => e === word);
  delete words[wordIndex];
  words = words.filter((w) => w);
  usedWords.push(word);
  currentWord = word;
  return word;
}

function askAQuestion(word) {
  questionList.innerHTML = "";

  const questionLi = document.createElement("li");
  questionLi.textContent = `¿Cómo se dice "${word.en}" en español?`;
  const questionHeader = document.createElement("h2");
  questionHeader.textContent = `¿Cómo se dice "${word.en}" en español?`;

  questionList.appendChild(questionHeader);
  numberOfQuestionsAsked++;
}

function checkTheAnswer(form, word) {
  const userAnswer = form.userAnswer.value;
  const correctAnswer = word.es;
  let result = null;

  if (userAnswer === correctAnswer) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

function rightAnswer() {
  blockFall();

  if (numberOfQuestionsAsked % 2 == 0) {
    moveCharacterLeft();
  } else {
    moveCharacterRight();
  }
  form.userAnswer.value = "";
  correctSoFar++;
  checkIfFinished();
}

function wrongAnswer() {
  console.error("wrong");
  if (document.querySelector("#wrong")) {
    // If a wrongLi already exists, do not make a new one
  } else {
    const wrongInput = document.createElement("p");
    wrongInput.innerText = "Wrong answer - try again";
    wrongInput.id = "wrong";

    resultDiv.appendChild(wrongInput);
  }
  mistakes++;
}

function runAtStartAndWhenRight() {
  blockBottomPosition = block.offsetTop + block.offsetHeight;
  characterTopPosition = character.offsetTop;
  finished = blockBottomPosition > characterTopPosition;
  const submitButton = document.querySelector("#btn");
  submitButton.disabled = false;

  getWord();
  askAQuestion(currentWord);
}

// Non-user input functions

function runCountdown() {
  if (finished) {
    timer.innerHTML = "";
    timer.innerText = "¡Acabado!";
    questionList.innerHTML = "";
  } else {
    updateCountdown();
  }
}

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timer.innerHTML = `${minutes}:${seconds}`;
  time--;
  time = time < 0 ? 0 : time;
}

function checkIfFinished() {
  if (finished) {
    finish();
    const homeBtn = document.querySelector(".home-btn");
    homeBtn.classList.add("show");
  }
}

function finish() {
  const finalScore = time;
  alert(`¡Qué bien! Puntos = ${finalScore}, Erratas = ${mistakes}`);
}

//Event Listeners
answerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  form = e.target;

  lastQuestionCorrect = checkTheAnswer(form, currentWord);
  resultDiv.innerHTML = "";

  if (lastQuestionCorrect) {
    rightAnswer();
    runAtStartAndWhenRight();
  } else {
    wrongAnswer();
  }
});
