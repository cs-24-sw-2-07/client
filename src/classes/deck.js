import { v4 as uuidv4 } from "uuid";
import { Card } from "./card.js";

export class Deck {
  constructor(name, id, cards) {
    this.name = name;
    if (id == null) {
      this.id = uuidv4(); //Uniqueness: https://stackoverflow.com/questions/1155008/how-unique-is-uuid
    } else {
      this.id = id;
    }
    if (cards == null) {
      this.cards = [];
      this.cards.push(new Card("", ""));
    } else {
      this.cards = cards;
    }
  }

  addCard(question, answer, id) {
    this.cards.push(new Card(question, answer, id));
  }

  removeCard(id) {
    this.cards = this.cards.filter((card) => card.id !== id);
  }

  updateCard(question, answer, id) {
    let cards = this.cards.filter((card) => card.id === id);
    if (cards.length <= 0) {
      return;
    }
    cards[0].updateCard(question, answer);
  }

  saveDeck() {
    //localStorage.setItem...
  }
}
