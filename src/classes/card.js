import { v4 as uuidv4 } from "uuid";

export class Card {
  constructor(question, answer, id) {
    this.question = question;
    this.answer = answer;
    if(id == null) {
      this.id = uuidv4(); //Uniqueness: https://stackoverflow.com/questions/1155008/how-unique-is-uuid
    } else {
      this.id = id;
    }
  }

  updateCard(question, answer) {
    this.question = question;
    this.answer = answer;
  }
}
