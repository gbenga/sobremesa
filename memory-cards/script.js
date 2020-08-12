//Global variables
let cardsData = [
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
let totalNumberOfCards = cardsData.length;
let currentActiveCard = 0;
const cardsArray = [];

//Elements
const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const current = document.getElementById("current");

//Progress bar
class ProgressBar {
  constructor(element, initialValue = 0) {
    this.valueElem = element.querySelector(".progress-bar-value");
    this.fillElem = element.querySelector(".progress-bar-fill");

    this.setValue(initialValue);
  }
  setValue(newValue) {
    if (newValue < 0) {
      newValue = 0;
    }

    if (newValue > 100) {
      newValue = 100;
    }

    this.value = newValue;
    this.update();
  }

  update() {
    const percentage = this.value + "%";

    this.fillElem.style.width = percentage;
    this.valueElem.textContent = percentage;
  }
}
const pb1 = new ProgressBar(document.querySelector(".progress-bar"), 10);
function updateProgressPercentage() {
  let newProgressPercentage = (currentActiveCard / totalNumberOfCards) * 100;
  pb1.setValue(newProgressPercentage + 10);
  return newProgressPercentage;
}

//Main
createCards();

// Functions
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

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
  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  cardsArray.push(card);
  cardsContainer.appendChild(card);

  updateCurrentCard();
}

function updateCurrentCard() {
  current.innerText = `${currentActiveCard + 1}/${cardsArray.length}`;
  updateProgressPercentage();
}

nextBtn.addEventListener("click", () => {
  cardsArray[currentActiveCard].className = "card left";

  currentActiveCard += 1;

  if (currentActiveCard > cardsArray.length - 1) {
    currentActiveCard = cardsArray.length - 1;
  }

  cardsArray[currentActiveCard].className = "card active";

  if (currentActiveCard === 9) {
    const homeBtn = document.querySelector(".btn");
    homeBtn.classList.add("show-btn");
  }

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
