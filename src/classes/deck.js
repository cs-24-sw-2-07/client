import { Card } from "./card.js";

export class Deck {
    constructor(values) {
        const {name, cards} = values ?? {};
        this.name = name ?? "";
        if(cards) {
            this.cards = cards.map(card => new Card(card));
        } else {
            this.cards = [new Card()]
        }
    }
}
