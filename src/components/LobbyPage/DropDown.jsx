import { socket } from "../../socket";
import { useState, useEffect } from "react";
import { } from "react-router-dom";

export { DeckDropDown };

function DeckDropDown() {
  //TODO: Call function here that gets the decks and add dropdown items
  return (
    <div className="dropdown">
      <div className="btn-group">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        > Choose Deck
        </button>
        <ul className="dropdown-menu">
          <GetDecksDropDown />
        </ul>
      </div>
    </div>
  );
}
//onClick={() => socket.emit("test", "/12345 ")
function GetDecksDropDown() {
  const decks = JSON.parse(localStorage.getItem("userDeck")); //Check spelling
  if (decks === null) {
    return (
      <li>
        <button type="button" className="dropdown-item">
                    No decks to choose from :/
        </button>
      </li>
    );
  }
  //Creates an option for every deck saved in localStorage
  return decks.forEach((deck) => (
    <li>
      <button
        key={deck.id}
        type="button"
        className="dropdown-item"
        onClick={() => addDeck(deck)}
      >
        {deck.name}
      </button>
    </li>
  ));
}

function addDeck(deck) {
  // Add room id from the server
  /*const data = {
      deck: deck, 
      id: lobbyIgitd, 
    }*/
  socket.emit("DeckChose", deck);
}