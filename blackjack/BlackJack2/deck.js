import Card from './card.js';

class Deck {
  constructor(jsonFile) {
    this.cards = [];
    // Load cards from JSON file if provided
    if (jsonFile) {
      this.loadCardsFromJSON(jsonFile);
    }
  }

  loadCardsFromJSON(jsonFile) {
    fetch(jsonFile)
      .then((response) => response.json())
      .then((json) => this.importFromJSON(json))
      .catch((error) => console.error('Error loading deck:', error));
  }

  importFromJSON(json) {
    this.cards = json.map((card) => new Card(
      card.value, 
      card.suit,
      card.rank,
      `./cards_img/${card.file}`,   
      ""            
    ));
  }

  drawCard() {
    return this.cards.pop();
  }


  shuffle() {
    function seededRandom(seed) {
      this._seed = seed % 2147483647;
      if (this._seed <= 0) this._seed += 2147483646;

      this.next = function() {
        this._seed = (this._seed * 16807) % 2147483647;
        return (this._seed - 1) / 2147483646;
      };
    }

    const seed = Date.now();
    const myRandom = new seededRandom(seed);

    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(myRandom.next() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  
}

export default Deck;
