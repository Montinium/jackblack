import Deck from "./deck.js";
import Player from "./player.js";
import Card from "./card.js";

class Game {
  constructor(name) {
    this.name = name;
    this.playersWins = 0;
    this.dealerWins = 0;
    console.log("Game constructor " + this.name);
    this.id = "game_" + this.name.replace(" ", "_");
    this.container = this.createContainer();
    this.addListeners();
    this.isFinished = false;
    this.resultContainer = this.createResultContainer();

    this.deck = new Deck("cards54.json");
    this.dealer = new Player("Dealer", this.container);
    this.player = new Player("Player", this.container);
  }

  createContainer() {
    const container = document.createElement("div");
    container.id = this.id;
    container.style.backgroundColor = "lightblue";
    container.style.borderRadius = "15px";
    container.className = "game";
    container.innerHTML = `<h1>${this.name}</h1>
    <button id="hit_${this.id}">Hit</button>
    <button id="stand_${this.id}">Stand</button>  
    `;

    const dealButton = document.createElement("button");
    dealButton.id = `deal_${this.id}`;
    dealButton.innerText = "Deal";
    dealButton.style.color = "black";
    dealButton.style.background = "pink";

    container.appendChild(dealButton);
    document.body.appendChild(container);
    return container;
  }

  createResultContainer() {
    const resultContainer = document.createElement("div");
    resultContainer.id = "result_" + this.id;
    this.container.appendChild(resultContainer);
    return resultContainer;
  }

  addListeners() {
    const dealButton = document.getElementById("deal_" + this.id);
    dealButton.addEventListener("click", this.deal.bind(this));

    const hitButton = document.getElementById("hit_" + this.id);
    hitButton.addEventListener("click", this.hit.bind(this));
    const standButton = document.getElementById("stand_" + this.id);
    standButton.addEventListener("click", this.stand.bind(this));
  }

  deal() {
    console.log("Deal");
    this.reset();
  }

  stand() {
    while (this.dealer.score < 17) {
      this.dealer.addCard(this.deck.drawCard());
    }
    this.finish();
  }

  hit() {
    if (this.isFinished) {
      return this.showPleaseReset();
    }
    this.player.addCard(this.deck.drawCard());
    console.log("Player Score:", this.player.score);
    if (this.player.score >= 21) {
      this.stand();
    }
  }

  finish() {
    const playerScore = this.player.score;
    const dealerScore = this.dealer.score;
    let message = "";

    switch (true) {
      case playerScore > 21:
        message = "Player busts";
        this.dealerWins++;
        break;
      case dealerScore > 21:
        message = "Dealer busts";
        this.playersWins++;
        break;
      case playerScore > dealerScore:
        message = "Player wins";
        this.playersWins++;
        break;
      case playerScore < dealerScore:
        message = "Dealer wins";
        this.dealerWins++;
        break;
      default:
        message = "It's a tie";
        break;
    }
    this.resultContainer.innerHTML = `${message} Total wins: Player ${this.playersWins} Dealer ${this.dealerWins}`;
    this.isFinished = true;
  }

  reset() {
    this.deck = new Deck("cards54.json");
    this.dealer.reset();
    this.player.reset();
    this.isFinished = false;
    this.resultContainer.innerHTML = "";
  }

  showPleaseReset() {
    alert("Please reset the game");
  }
}

export default Game;
