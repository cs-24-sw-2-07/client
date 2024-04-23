import { v4 as uuidv4 } from "uuid";

export class Card {
  constructor({question, answer, id, name}) {
    if(id == null) {
      this.id = uuidv4(); //Uniqueness: https://stackoverflow.com/questions/1155008/how-unique-is-uuid
    } else {
      this.id = id;
    }
    if(answer == null) {
      this.answer = "";
    } else {
      this.answer = answer;
    }
    if(question == null) {
      this.question = "";
    } else {
      this.question = question;
    }
    if(name == null) {
      this.name = "";
    } else {
      this.name = name;
    }
  }
}
