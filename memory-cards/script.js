const fruitAndVegURL = "http://localhost:3000/fruitandveg";

let cardsData;
fetchWordPack();

function fetchWordPack() {
  return fetch(fruitAndVegURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (wordsArray) {
      cardsData = wordsArray;
    })
    .then(function () {
      createCards();

    })
    .catch(function (error) {
      alert("Getting the word pack didn't work");
      console.log(error.message);
    });
}

const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const current = document.getElementById("current");
// const showBtn = document.getElementById('show');
// const hideBtn = document.getElementById('hide');
// const question = document.getElementById('question');
// const answer = document.getElementById('answer');
// // const addCardBtn = document.getElementById('add-card');
// // const clearBtn = document.getElementById('clear');
// // const addContainer = document.getElementById('add-container');

// Create a variable to keep track of current card
let currentActiveCard = 0;

// Create an array to sotre DOM data
const cardsArray = [];

// Store card Data
// deletable
// const cardsData = [
//     {
//         en: 'img/watermelon.png',
//         es: 'la sandia'
//     },
//     {
//         en: 'img/grape3.png',
//         es: 'las uvas'
//     },
//     {
//         en: 'img/orange.png',
//         es: 'la naranja'
//     },
//     {
//         en: 'img/apple3.png',
//         es: 'la manzana'
//     },
//     {
//         en: 'img/peach3.png',
//         es: 'el melocotón'
//     },
//     {
//         en: 'img/corn.png',
//         es: 'la maiz'
//     },
//     {
//         en: 'img/pepper.png',
//         es: 'el pimiento'
//     },
//     {
//         en: 'img/carrot.png',
//         es: 'la zanahoria'
//     },
//     {
//         en: 'img/potato.png',
//         es: 'la batata'
//     },
//     {
//         en: 'img/cauliflower.png',
//         es: 'el cauliflor'
//     }
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create singular card
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  // Adding an active class to the first card i.e. the 'En' class
  if (index === 0) {
    card.classList.add("active");
  }

  // const innerCard = document.createElement('div')
  // innerCard.classList.add('inner-card')

  // const innerCardFront = document.createElement('div')
  // innerCardFront.classList.add('inner-card-front')

  // const cardImg = document.createElement('img')
  // cardImg.src = data.img;

  // const innerCardBack = document.createElement('div')
  // innerCardBack.classList.add('inner-card-back')

  // const p = document.createElement('p')
  // p.innerText = data.answer;

  // innerCardFront.append(cardImg)
  // innerCard.appendChild(innerCardFront)

  // innerCardBack.append(p)
  // innerCard.appendChild(innerCardBack)

  card.innerHTML = `
             <div class="inner-card">
                    <div class="inner-card-front">
                        <img src="${data.img}">
                    </div>
                    <div class="inner-card-back">
                        <h3>${data.es}</h3>
                    </div>
            </div>
        `;

  // To create flip effect, add an Event Listener on the card
  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  // toggle changes depending on the state (true/false)
  // the reason this works is because in our CSS we have a method called .card.show-answer
  // which transforms the card by rotating 180deg
  // and added a bunch of other functionality which builds this particular feature/functionality

  // Add to DOM cards ARRAY
  cardsArray.push(card);
  cardsContainer.appendChild(card);

  updateCurrentCard();
}

// Show card page
function updateCurrentCard() {
  current.innerText = `${currentActiveCard + 1}/${cardsArray.length}`;
  // uses the currentActiveCard variable which you set at the beginning to 0
  // and cards Array length to display
  // console.log(current)
}
// deletable
// createCards();

nextBtn.addEventListener("click", () => {
  // using className to ovvewrite whatever is the class is set to (instead of classList)
  cardsArray[currentActiveCard].className = "card left"; // which matches corresponding css

  // Get the new card index by setting the currentActiveCard to += 1
  currentActiveCard += 1;

  // Have to implement functionality to keep this within range
  if (currentActiveCard > cardsArray.length - 1) {
    //-1 because arrays are 0-based
    currentActiveCard = cardsArray.length - 1; // will set this to the last card in the array
  }

  // This overwrites the className again, (make sure to include card)
  // Will only have left for a second which gives us the effect from the css
  cardsArray[currentActiveCard].className = "card active";

  console.log(currentActiveCard);
  if (currentActiveCard === 9) {
    const homeBtn = document.querySelector(".btn");
    homeBtn.classList.add("show-btn");
  }
  // To update the current card number, you can pass through your update current card function
  // to this function, so it happens with each click
  updateCurrentCard();
});

prevBtn.addEventListener("click", () => {
  cardsArray[currentActiveCard].className = "card right";

  currentActiveCard -= 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsArray[currentActiveCard].className = "card active";

  updateCurrentCard();
});

// function move() {
//     var progress = document.getElementById("bar");
//     var width = 10;
//     var id = setInterval(frame, 10);

//     function frame() {
//       if (width >= 100) {
//         clearInterval(id);
//       } else {
//         width++;
//         progress.value = width
//       }
//     }
//   }
