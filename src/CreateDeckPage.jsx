import { useState, useEffect } from "react";
import { Deck } from "./classes/deck";
import { Card } from "./classes/card";

// Components in use
import { ListCards } from "./components/deckbuilderComponets/ListCards.jsx";
import { DeckPicker } from "./components/deckbuilderComponets/DeckPicker2.jsx";

function CreateDeckPage() {
  var startDeck = [];

  //check for decks in localstorge and retrive if yes
  if (localStorage.getItem("userDeck") !== null) {
    startDeck = JSON.parse(localStorage.getItem("userDeck"));
  } else {
    startDeck = [new Deck({ name: "New Deck" })];
  }

  //Makes hooks in use
  let [hiddenDeck, setHiddenDeck] = useState(false);
  let [decks, setDecks] = useState(startDeck);
  let [deckName, setDeckName] = useState(decks[0].name);
  //let [cardName, setCardName]=useState(decks[0].cards[0].name);
  let [deckIndex, setDeckIndex] = useState(0);
  let [cardIndex, setCardIndex] = useState(0);
  //let [questionHook, setQuestionHook]=useState(decks[0].cards[0].question);
  //let [answerHook, setAnswerHook]=useState(decks[0].cards[0].answer);

  let [card, setCard] = useState(decks[0].cards[0]);

  console.log(decks);
  //save changes on edit.
  //updates everytime card changes
  // useEffect(() => {
  //   let updatedDeck = decks;
  //   updatedDeck[deckIndex].cards[cardIndex] = card;
  //   setDecks(updatedDeck);
  //   //saveDecks();
  //   //setCard(decks[deckIndex].cards[cardIndex]);
  //   //setAnswerHook(decks[deckIndex].cards[cardIndex].answer);
  //   //setQuestionHook(decks[deckIndex].cards[cardIndex].question);
  //   //setCardName(decks[deckIndex].cards[cardIndex].name);
  // }, [card]);

  function showCard(index) {
    let updatedDeck = decks;
    updatedDeck[deckIndex].cards[cardIndex].question = card.question;
    updatedDeck[deckIndex].cards[cardIndex].answer = card.answer;
    updatedDeck[deckIndex].cards[cardIndex].name = card.name;
    setDecks(updatedDeck);
    //saveDecks();
    setCardIndex(index);
    setCard(decks[deckIndex].cards[index]);
  }

  function updateCard(card) {
    let updatedDeck = decks;
    updatedDeck[deckIndex].cards[cardIndex] = card;
    setDecks(updatedDeck);
    setCard(card);
  }

  //updates page everytime a question, answer, cardname or deckname is edited
  useEffect(() => {
    let updatedDeck = decks;
    updatedDeck[deckIndex].name = deckName;
    // Ikke nødvendigt at opdatere kort da det allerede er gjort.
    //updatedDeck[deckIndex].cards[cardIndex].question = card.question;
    //updatedDeck[deckIndex].cards[cardIndex].answer = card.answer;
    //updatedDeck[deckIndex].cards[cardIndex].name = card.name;
    setDecks(updatedDeck);
    //saveDecks();
  }, [deckName]);

  function showCardEditor(deckIndex) {
    setHiddenDeck(true);
    setDeckIndex(deckIndex);
    setDeckName(decks[deckIndex].name);
    setCardIndex(0);
    setCard(decks[deckIndex].cards[0]);
    //TODO: setCard(decks[deckIndex].cards[cardIndex]);
    //setAnswerHook(decks[2].cards[0].answer);
    //setQuestionHook(decks[2].cards[0].question);
    //setCardName(decks[2].cards[0].name);
  }

  function saveDecks() {
    const deckString = JSON.stringify(decks);
    localStorage.setItem("userDeck", deckString);
  }

  function showDecks() {
    saveDecks();
    setHiddenDeck(false);
  }

  //add new card
  const addNewCard = () => {
    const updatedDeck = [...decks];
    updatedDeck[deckIndex].cards.push(new Card({ name: "" }));
    setDecks(updatedDeck);
  };

  //delete card
  const deleteCard = () => {
    if (decks[deckIndex].cards.length !== 1) {
      let updatedDecks = [...decks];
      updatedDecks[deckIndex].cards.splice(cardIndex, 1);
      setCardIndex(0);
      setCard(decks[deckIndex].cards[0]);
      setDecks(updatedDecks);
      //setAnswerHook(decks[deckIndex].cards[cardIndex].answer);
      //setQuestionHook(decks[deckIndex].cards[cardIndex].question);
      //setCardName(decks[deckIndex].cards[cardIndex].name);
    }
  };

  return (
    <>
      {/* DeckPicker */}
      <DeckPicker
        decks={decks}
        cardIndex={cardIndex}
        deckIndex={deckIndex}
        setCardIndex={setCardIndex}
        setDecks={setDecks}
        saveDecks={saveDecks}
        hiddenDeck={hiddenDeck}
        showCardEditor={showCardEditor}
      />

      {/* DeckEditor */}
      <div className="container" hidden={!hiddenDeck}>
        <div className="row">
          <div className="col-5 p-3">
            <h1>Deck Editor</h1>
          </div>
          <div className="col-4"></div>
          <div className="col-3 d-grid gap-2 p-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={showDecks}
            >
              Back To Decks
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="deckName" className="p-3 form-control-lg">
              Deck Name:{" "}
            </label>
            <input
              type="text"
              id="deckName"
              className="form-control form-control-lg"
              placeholder="Set Deck Name"
              value={deckName}
              onChange={(e) => {
                setDeckName(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="row p-3"></div>
        <div className="row">
          <div className="col-3">
            <ListCards
              cards={decks[deckIndex].cards}
              cardIndex={cardIndex}
              showCard={showCard}
            />
          </div>
          <div className="col-9">
            <div className="row">
              <label htmlFor="cardName">Card Name: </label>
              <input
                type="text"
                id="cardName"
                className="form-control form-control"
                placeholder="Set Card Name"
                value={card.name}
                onChange={(e) =>
                  updateCard({
                    ...card,
                    name: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="row">
              <label htmlFor="question">Question:</label>
              <textarea
                type="text"
                placeholder="Place Your Question Here"
                id="question"
                rows="9"
                value={card.question}
                onChange={(e) =>
                  updateCard({
                    ...card,
                    question: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="row">
              <label htmlFor="answer">Answer:</label>
              <textarea
                type="text"
                placeholder="Place Your Answer Here"
                id="answer"
                rows="9"
                value={card.answer}
                onChange={(e) =>
                  updateCard({
                    ...card,
                    answer: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row p-3"></div>
        <div className="row">
          <div className="col-2 d-grid ">
            <button
              type="button"
              className="btn btn-primary"
              onClick={addNewCard}
            >
              Add New Card
            </button>
          </div>
          <div className="col-2 d-grid ">
            <button
              type="button"
              className="btn btn-primary"
              onClick={deleteCard}
            >
              Delete Card
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateDeckPage;
