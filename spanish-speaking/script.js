const sentencesURL = "http://localhost:3000/sentences";
// might be deleteable but tbc
// const sentences = [
//     {
//         en: 'How is your food?',
//         es: 'cómo es tu comida'
//     },
//     {
//         en: 'What would you like to drink?',
//         es: 'qué le gustaría beber'
//     },
//     {
//         en: "It's delicious",
//         es: 'está riquísimo'
//     },
//     {
//         en: 'I would like the salt, please',
//         es: 'quisiera la sal por favor'
//     },
//     {
//         en: 'Salad is my favourite dish',
//         es: 'la ensalada es mi plato favorito'
//     },
//     {
//         en: "For desert, I want apple tart",
//         es: 'de postre quiero tarta de manzana'
//     },
//     {
//         en: 'The food is too spicy',
//         es: 'la comida es muy picante'
//     },
//     {
//         en: 'I want the chair by the window',
//         es: 'quiero la silla a lado de la ventana'
//     },
//     {
//         en: 'Do you want some help?',
//         es: 'quieres un poco de ayuda'
//     },
//     {
//         en: 'Water, please',
//         es: 'agua por favor'
//     }
// ];

let sentences;
fetchSentencePack();

function fetchSentencePack() {
  return fetch(sentencesURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (sentencesArray) {
      sentences = sentencesArray;
      console.log(sentences);
    })
    .then(function () {
      getRandomSentence(sentences);
      askAQuestion(currentSentence);
    })
    .catch(function (error) {
      alert("Getting the sentence pack didn't work");
      console.log(error.message);
    });
}

// Grabbing the DOM Element
const divQ = document.querySelector(".question-div");
const messageDiv = document.getElementById("message");
// const resultDiv = document.querySelector('.result')
// const input = document.querySelector('.input')

// Need to initialize a Speech Recognition Object
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// Initializing a variable with that object
let recognition = new window.SpeechRecognition();

// Make language spanish setting Spanish
let myLang = recognition.lang;
recognition.lang = "es";

recognition.continuous = true;
// recognition.interimResults = true;

// Get a random sentence from the sentences Array
function getRandomSentence(sentences) {
  let sentence = sentences[Math.floor(Math.random() * sentences.length)];
  const sentenceIndex = sentences.findIndex((e) => e === sentence);
  delete sentences[sentenceIndex];
  sentences = sentences.filter((s) => s);
  usedSentences.push(sentence);
  currentSentence = sentence;
  return sentence;
}

// Prints that question to the DOM
function askAQuestion(sentence) {
  const question = document.createElement("h2");
  question.innerText = sentence.es;
  divQ.append(question);
  // numberOfQuestionsAsked++;
}

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

// Initialize variable
const usedSentences = [];
let randomSentence = [];
let currentSentence = null;
let lastCorrectQ = false;
let correctSoFar = 0;
// might be deletable but wanted to check with you - have moved to the fetch request.
// getRandomSentence(sentences);
// askAQuestion(currentSentence);

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
function whenSpeaking(e) {
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
    rightAnswer(); // Will do something based on the condiition of right answer
    getRandomSentence(); // Will get another sentence to keep going through each sentence
    askAQuestion(sentence); // Will ask a question with that current Word
  } else {
    h3.classList.add("wrong");
    wrongAnswer();
  }

  // h3.innerHTML = '';
}

function rightAnswer() {
  const h4 = document.createElement("h4");
  h4.innerText = "Well done! Your pronounciation is perfect!";
  messageDiv.append(h4);

  correctSoFar++;
}

function wrongAnswer() {
  const h4 = document.createElement("h4");
  h4.innerText =
    "Uh oh, that's not right. \n Perhaps you could enunciate more clearly...";
  messageDiv.append(h4);
}

// Add an event listener to capture this input
recognition.addEventListener("result", whenSpeaking);

// End SR service
recognition.addEventListener("end", () => recognition.start());

// // document.body.addEventListener('click', e => {
// //   if (e.target.id == 'play-again') {
// //     window.location.reload();
// //   }
// // });
