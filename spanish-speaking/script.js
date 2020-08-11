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

// Grabbing the DOM Element
const divQ = document.querySelector(".question-div");
const messageDiv = document.getElementById("message");
// const resultDiv = document.querySelector('.result')
// const input = document.querySelector('.input')

// Initialize variable
const usedSentences = [];
let randomSentence = [];
let currentSentence = null;
let lastCorrectQ = false;
let questionsAsked = 0;

// Get a random sentence from the sentences Array
function getRandomSentence() {
  let sentence = sentences[Math.floor(Math.random() * sentences.length)];
  const sentenceIndex = sentences.findIndex((e) => e === sentence);
  delete sentences[sentenceIndex];
  sentences = sentences.filter((s) => s);
  usedSentences.push(sentence);
  currentSentence = sentence;
  return sentence;
}

// Need to initialize a Speech Recognition Object
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// Initializing a variable with that object
let recognition = new window.SpeechRecognition();

// Make language spanish setting Spanish
let myLang = recognition.lang;
recognition.lang = "es";

// recognition.continuous = true;
recognition.interimResults = false;

// Start speech recognition
recognition.start();
// This works but only lets you guess once, because it calls start here
// Then listens, and when it gets a result it fires: recognition.addEventListener('result', whenSpeaking);
// Which calls the whenSpeaking method, which then fires of the writeMessage and checkMessage functions
// But you want to do this multiple times, i.e. keep playing
// SO we can add an event listener which is triggered by an 'end' event (for when we are done speaking)
// recognition.addEventListener('end', () => recognition.start());

// Listen for result
// recognition.addEventListener('result', whenSpeaking)

// Map over speechArray to grab an array of sentences in Spanish
// let spanishSentences = speechArray.map(x => x.es)
// console.log(spanishSentences)

// Prints that question to the DOM
function askAQuestion(sentence) {
  divQ.innerHTML = "";
  messageDiv.innerHTML = "";
  const question = document.createElement("h2");
  question.innerText = sentence.es;
  divQ.append(question);

  questionsAsked++;
}

getRandomSentence();
askAQuestion(currentSentence);

// Checks to see whether the message matches the sentence you passed through
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

//
function doneSpeaking(e) {
  messageDiv.innerHTML = "";
  const message = e.results[0][0].transcript;

  // Display what user said:
  const h3 = document.createElement("h3");
  h3.innerText = `${message}`;
  messageDiv.append(h3);

  // Sets lastCorrectQ to true or false depending on outcome of the checkTheAnswer method
  lastCorrectQ = checkTheAnswer(message, currentSentence);

  if (lastCorrectQ) {
    //if true then
    h3.classList.add("right");
    rightAnswer(); // Will do something based on the condition of right answer
    getRandomSentence(); // Will get another sentence to keep going through each sentence

    setTimeout(() => {
      askAQuestion(currentSentence); // Will ask a question with that current sentence
    }, 2000);

    // Check if all questions have been asked
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

  // correctSoFar++;
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
// Add an event listener to capture this input
recognition.addEventListener("result", doneSpeaking);

// End SR service
recognition.addEventListener("end", () => recognition.start());

// // document.body.addEventListener('click', e => {
// //   if (e.target.id == 'play-again') {
// //     window.location.reload();
// //   }
// // });
