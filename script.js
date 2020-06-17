const words = [
    {en: "watermelon", es: "la sandía"}, 
    {en: "peach", es: "el melocotón"},
    {en: "grapes", es: "las uvas"},
    {en: "apple", es: "la manzana"},
    {en: "orange", es: "la naranja"},
    {en: "cauliflower", es: "el cauliflor"},
    {en: "sweet potato", es: "la batata"},
    {en: "pepper", es: "el pimiento"},
    {en: "sweetcorn", es: "la maíz"},
    {en: "carrot", es: "la zanahoria"}
]

// Elements on the page
const character = document.getElementById('character');
const block = document.getElementById('block');
const timer = document.getElementById('timer');
const questionListUl = document.getElementById("questions-list");
const answerForm = document.getElementById("answer-form");

// Positions
const characterLeftPosition = "0px";
const characterRightPosition = "200px";
const blockStep = 10;

// Timer
const startingMinutes = 2;
let time = startingMinutes * 60;

// MAIN

const blockBottomPosition = block.offsetTop + block.offsetHeight;
const characterTopPosition = character.offsetTop;

for (let wordsIndex = 0; wordsIndex < words.length; wordsIndex++) {
    const currentWord = words[wordsIndex];
    const nextWord = words[wordsIndex + 1];
    
    answerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        form = e.target;
        askAQuestion(currentWord);
        let result = checkTheAnswer(form,currentWord);
 
        if (result) {
            rightAnswer(wordsIndex);
            // move to the next question
            // start for loop again for the next question
            nextQuestion();
        } else {
            wrongAnswer(wordsIndex);
        }
    });
}

//   Finish line
if (blockBottomPosition > characterTopPosition ) {
    const finalScore = time 
    alert(`¡Qué bien! Puntos = ${finalScore}`)
}

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

function askAQuestion(word) {
    questionListUl.innerHTML = ""
    const questionLi = document.createElement("li");
    questionLi.textContent = `¿Cómo se dice "${word.en}" en español?`;

    questionListUl.appendChild(questionLi);
}
function checkTheAnswer(form,word) {

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
function rightAnswer(wordsIndex) {
    console.log("right");
    blockFall();
    if (wordsIndex % 2 == 0) {
        moveCharacterLeft();
    } else {
        moveCharacterRight();
    }
    form.userAnswer.value = ""
    nextQuestion();
}
function wrongAnswer(wordsIndex) {
    console.error("wrong");
    const wrongLi = document.createElement("li");
    wrongLi.innerText = "Wrong - try again"

    questionListUl.appendChild(wrongLi);
    wordsIndex--
}
function nextQuestion() {
    // calls the next question
}

// Non-user input functions
setInterval(updateCountdown, 1000);
    
function updateCountdown() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerHTML = `${minutes}:${seconds}`
    time--;
    time = time < 0 ? 0 : time; 
}