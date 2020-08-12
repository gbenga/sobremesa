//Global variables
let sentences = [
  {
    en: "How is your food?",
    es: "cómo es tu comida",
  },
  {
    en: "What would you like to drink?",
    es: "que le gustaría beber",
  },
  {
    en: "It's delicious",
    es: "está riquísimo",
  },
  {
    en: "I would like the salt, please",
    es: "quisiera la sal por favor",
  },
  {
    en: "Salad is my favourite dish",
    es: "la ensalada es mi plato favorito",
  },
  {
    en: "For desert, I want apple tart",
    es: "de postre quiero tarta de manzana",
  },
  {
    en: "The food is too spicy",
    es: "la comida es muy picante",
  },
  {
    en: "I want the chair by the window",
    es: "quiero un pastel",
  },
  {
    en: "Do you want some help?",
    es: "quieres un poco de ayuda",
  },
  {
    en: "Water, please",
    es: "agua por favor",
  },
];
const usedSentences = [];
let randomSentence = [];
let currentSentence = null;
let lastCorrectQ = false;
let questionsAsked = 0;

// Elements
const divQ = document.querySelector(".question-div");
const messageDiv = document.getElementById("message");

//Main
getRandomSentence();
askAQuestion(currentSentence);

// Functions
function getRandomSentence() {
  let sentence = sentences[Math.floor(Math.random() * sentences.length)];
  const sentenceIndex = sentences.findIndex((e) => e === sentence);
  delete sentences[sentenceIndex];
  sentences = sentences.filter((s) => s);
  usedSentences.push(sentence);
  currentSentence = sentence;
  return sentence;
}

function askAQuestion(sentence) {
  divQ.innerHTML = "";
  messageDiv.innerHTML = "";
  const question = document.createElement("h2");
  question.innerText = sentence.es;
  divQ.append(question);

  questionsAsked++;
}

function checkTheAnswer(message, currentSentence) {
  const userAnswer = message;
  const correctAnswer = currentSentence.es;
  let result = null;

  if (userAnswer == correctAnswer) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

function doneSpeaking(e) {
  messageDiv.innerHTML = "";
  const message = e.results[0][0].transcript;

  const h3 = document.createElement("h3");
  h3.innerText = `${message}`;
  messageDiv.append(h3);

  lastCorrectQ = checkTheAnswer(message, currentSentence);

  if (lastCorrectQ) {
    h3.classList.add("right");
    rightAnswer();
    getRandomSentence();

    setTimeout(() => {
      askAQuestion(currentSentence);
    }, 2000);

    if (questionsAsked === 10) {
      finish();
    }
  } else {
    h3.classList.add("wrong");
    wrongAnswer();
  }
}

function rightAnswer() {
  const h4 = document.createElement("h4");
  h4.innerText = "Well done! Your pronounciation is perfect!";
  messageDiv.append(h4);
}

function wrongAnswer() {
  const h4 = document.createElement("h4");
  h4.innerText =
    "Uh oh, that's not right. \n Perhaps you could enunciate more clearly...";
  messageDiv.append(h4);
}

function finish() {
  const h3 = document.createElement("h3");
  h3.innerText = "Finito!";
  messageDiv.append(h3);
  const homeBtn = document.querySelector(".home-btn");
  homeBtn.classList.add("show");
}

// Speech recognition
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
let myLang = recognition.lang;
recognition.lang = "es";

recognition.interimResults = false;

recognition.start();

recognition.addEventListener("result", doneSpeaking);

recognition.addEventListener("end", () => recognition.start());
