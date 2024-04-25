import { useState, useEffect } from "react";
import { Deck } from "./classes/deck";
import { Card } from "./classes/card";

// Components in use
import { DeckPicker } from "./components/deckbuilderComponets/DeckPicker.jsx";
import { DeckEditor } from "./components/deckbuilderComponets/DeckEditor.jsx";

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
  let [deckIndex, setDeckIndex] = useState(0);
  let [cardIndex, setCardIndex] = useState(0);
  let [card, setCard] = useState(decks[0].cards[0]);

  function showCard(index) {
    let updatedDeck = decks;
    updatedDeck[deckIndex].cards[cardIndex].question = card.question;
    updatedDeck[deckIndex].cards[cardIndex].answer = card.answer;
    updatedDeck[deckIndex].cards[cardIndex].name = card.name;
    setDecks(updatedDeck);
    setCardIndex(index);
    setCard(decks[deckIndex].cards[index]);
  }

  function updateCard(card) {
    let updatedDeck = decks;
    updatedDeck[deckIndex].cards[cardIndex] = card;
    setDecks(updatedDeck);
    setCard(card);
  }

  //updates page everytime a deckname is edited
  useEffect(() => {
    let updatedDeck = decks;
    updatedDeck[deckIndex].name = deckName;
    setDecks(updatedDeck);
  }, [deckName]);

  function showCardEditor(deckIndex) {
    setHiddenDeck(true);
    setDeckIndex(deckIndex);
    setDeckName(decks[deckIndex].name);
    setCardIndex(0);
    setCard(decks[deckIndex].cards[0]);
  }

  function saveDecks(deckToSave) {
    const deckString = JSON.stringify(deckToSave || decks);
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
      <DeckEditor
        hiddenDeck={hiddenDeck}
        showDecks={showDecks}
        deckName={deckName}
        setDeckName={setDeckName}
        cards={decks[deckIndex].cards}
        cardIndex={cardIndex}
        showCard={showCard}
        card={card}
        updateCard={updateCard}
        addNewCard={addNewCard}
        deleteCard={deleteCard}
      />
    </>
  );
}


export default CreateDeckPage;
