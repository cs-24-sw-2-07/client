export class Card {
    constructor(values) {
        const {question, answer, name, rating} = values ?? {};
        this.answer = answer ?? "";
        this.question = question ?? "";
        this.name = name ?? "";
        this.rating = rating ?? 3;
    }
}
