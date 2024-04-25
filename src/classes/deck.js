import { v4 as uuidv4 } from "uuid";
import { Card } from "./card.js";

export class Deck {
    constructor({name, id, cards}) {
        this.name = name ?? "";
        this.id = id ?? uuidv4(); //Uniqueness: https://stackoverflow.com/questions/1155008/how-unique-is-uuid
        this.cards = cards ?? [new Card()]
    }
}
