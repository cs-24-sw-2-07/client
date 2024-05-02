import { v4 as uuidv4 } from "uuid";

export class Card {
    constructor(values) {
        const {question, answer, id, name} = values || {};
        this.id = id ?? uuidv4(); //Uniqueness: https://stackoverflow.com/questions/1155008/how-unique-is-uuid
        this.answer = answer ?? "";
        this.question = question ?? "";
        this.name = name ?? "";
    }
}
