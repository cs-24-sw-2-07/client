import { socket } from "../../socket";

export function DeckDropDown({ dropDownLabel }) {
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
function GetDecksDropDown() {
    const decks = JSON.parse(localStorage.getItem("userDeck"));

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
