const fruitAndVegURL = "http://localhost:3000/fruitandveg";

let words;
fetchWordPack();

function fetchWordPack() {
  return fetch(fruitAndVegURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (wordsArray) {
      words = wordsArray;
      console.log(words);
    })
    .then(function () {
      runAtStartAndWhenRight();
      setInterval(runCountdown, 1000);
    })
    .catch(function (error) {
      alert("Getting the word pack didn't work");
      console.log(error.message);
    });
}

const usedWords = [];
let numberOfQuestionsAsked = 0;
let correctSoFar = 0;
let currentWord = null;
let lastQuestionCorrect = false;
let mistakes = 0;

// Elements on the page
const character = document.getElementById("character");
const block = document.getElementById("block");
const timer = document.getElementById("timer");
// deletable?
// const questionDiv = document.getElementById("questions");
const questionList = document.getElementById("questions-list");
const answerForm = document.getElementById("answer-form");
const resultDiv = document.querySelector('.result')

// Positions
const characterLeftPosition = "0px";
const characterRightPosition = "200px";
const blockStep = 10;
let blockBottomPosition = block.offsetTop + block.offsetHeight;
let characterTopPosition = character.offsetTop;
let finished = blockBottomPosition > characterTopPosition;

// Timer
const startingMinutes = 2;
let time = startingMinutes * 60;

// MAIN

answerForm.addEventListener("submit", function (e) {
	e.preventDefault();
	form = e.target;

	lastQuestionCorrect = checkTheAnswer(form, currentWord);
	if (lastQuestionCorrect) {
	rightAnswer();
	runAtStartAndWhenRight();
	} else {
	wrongAnswer();
	}
});

// User input functions
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
	// debugger
	const wordIndex = words.findIndex((e) => e === word);
	delete words[wordIndex];
	words = words.filter((w) => w);
	usedWords.push(word);
	currentWord = word;
	return word;
}

function askAQuestion(word) {
	questionList.innerHTML = ""
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
	console.log("right");
	blockFall();

	if (numberOfQuestionsAsked % 2 == 0) {
	moveCharacterLeft();
	} else {
	moveCharacterRight();
	}
	form.userAnswer.value = "";
	correctSoFar++;
}
function wrongAnswer() {
	console.error("wrong");
	if (document.querySelector("#wrong")) {
	// don't make a new wrongLi if there's one already
	} else {
	// deletables?
	// const wrongLi = document.createElement("li");
	// wrongLi.innerText = "Wrong - try again";
	
	// questionListUl.appendChild(wrongLi);
	
	const wrongInput = document.createElement("p");
    wrongInput.innerText = "Wrong answer - try again"
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
	checkIfFinished();
}

// Non-user input functions

function runCountdown() {
	if (finished) {
	timer.innerHTML = "";
	timer.innerText = "Finito!";
	questionDiv.innerHTML = "";
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
