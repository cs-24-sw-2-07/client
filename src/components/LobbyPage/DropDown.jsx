import { socket } from "../../socket";
import { } from "react-router-dom";

export { DeckDropDown };

function DeckDropDown({ dropDownLabel }) {
  return (
    <div className="dropdown">
      <div className="btn-group">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >{dropDownLabel}
        </button>
        <GetDecksDropDown />
      </div>
    </div>
  );
}
//onClick={() => socket.emit("test", "/12345 ")
function GetDecksDropDown() {
  const decks = JSON.parse(localStorage.getItem("userDeck")); //Check spelling
  if (decks === null) {
    return (
      <ul className="dropdown-menu">
        <li>
          <button type="button" className="dropdown-item">
            No decks to choose from :/
          </button>
        </li>
      </ul>
    );
  }
  /**/
  //Creates an option for every deck saved in localStorage
  return (
    <ul className="dropdown-menu">
      {decks.map((deck, index) => (
        <li key={index}>
          <button
            type="button"
            className="dropdown-item"
            onClick={() => socket.emit("changeDeck", deck)}
          >{deck.name}
          </button>
        </li>))
      }
    </ul>
  );
}

/**
//TODO: Ting der mangler
 * Få client til at kommunikere med server
 * Lave playerOverview, så den er scrollable
 */