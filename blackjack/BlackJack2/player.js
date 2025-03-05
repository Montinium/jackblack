import Card from "./card.js";
import Deck from "./deck.js";

class Player {
  constructor(name, gameContainer) {
    this.gameContainer = gameContainer;
    this.name = name;
    this.hand = [];
    this.score = 0;
    this.handContainer = this.createHandContainerInGame(this.gameContainer);
    this.id = this.generateUniqueId();
  }

  generateUniqueId() {
    return "player" + Symbol().toString().slice(7);
  } 

  createHandContainerInGame(gameContainer) {
    const handContainer = document.createElement("div");
    handContainer.classList.add("hand-container");
    handContainer.style.display = "flex";
    handContainer.style.flexDirection = "row";
    handContainer.style.margin = "10px";
    handContainer.id = this.id;
    const userScore = this.createUserScoreElement();
    handContainer.appendChild(userScore);
    gameContainer.appendChild(handContainer);
    return handContainer;
  }

  createUserScoreElement() {
    const userScore = document.createElement("div");
    userScore.id = this.id + "_score";
    userScore.innerHTML = this.name + " Score: " + this.score;
    //   this.handContainer.appendChild(userScore);
    return userScore;
  }

  addCard(card) {
    this.hand.push(card);
    this.handContainer.appendChild(card.html);
    this.score += card.value;
    console.log(" Card value:", card.value);
    card.show();
    this.updateScoreDisplay();
  }

  updateScoreDisplay() {
    this.userScore = this.name + " Score: " + this.score;
  }

  reset() {
    this.hand = [];
    this.score = 0;
    this.handContainer.innerHTML = "";
  }
}

export default Player;
