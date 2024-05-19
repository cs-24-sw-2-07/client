import { Card } from "./card.js";

export class Deck {
    constructor(values) {
        const {name, cards} = values ?? {};
        this.name = name ?? "";
        this.cards = cards ?? [new Card()]
    }
}
