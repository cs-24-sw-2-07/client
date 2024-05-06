export class Card {
    constructor(values) {
        const {question, answer, name} = values || {};
        this.answer = answer ?? "";
        this.question = question ?? "";
        this.name = name ?? "";
    }
}
