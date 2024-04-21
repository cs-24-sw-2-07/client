import { } from "react-router-dom";

function HostGamePage() {

  let [cardCount, setCardCount] = useState(15);
  let [handSize, setHandSize] = useState(7);
  let [maxLife, setMaxLife] = useState(5);
  let [lobbySize, setLobbySize] = useState(2);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p>Lobby</p>
          {/*first column*/}
        </div>
        <div className="col">{/*second column*/}</div>
      </div>
      {/*Første row Lobby #id og delete lobby knap*/}

      {/*Settings og Players*/}
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Settings</h2>
            <form>
              <div className="form-group">
                <div className="col-4">
                  <label htmlFor="decksize">Deck Size:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="decksize"
                    value={cardCount}
                    onChange={(e) => setCardCount(e.target.value)}>
                  </input>
                  <label htmlFor="handsize"> Hand Size:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="handsize"
                    value={handSize}
                    onChange={(e) => setHandSize(e.target.value)}>
                  </input>
                  <label htmlFor="Maxlife"> Life: </label>
                  <input
                    type="number"
                    className="form-control"
                    id="lifesize"
                    value={maxLife}
                    onChange={(e) => setMaxLife(e.target.value)}>
                  </input>
                  <label htmlFor="lobbySize"> Lobby Size:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="lobbySize"
                    value={lobbySize}
                    onChange={(e) => setLobbySize(e.target.value)}>
                  </input>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/*Select deck og start game*/}
      <div className="row">
        <div className="col">
          <GetDeckDropDown />
        </div>
        <div className="col ml-auto">
          <button
            type="button"
            className="btn btn-primary"
            id="Start_game button"
            onClick={StartGame}
          >
            Start game
          </button>
        </div>
      </div>
    </div>
  );
}

function GetDeckDropDown() {
  //TODO: Call function here that gets the decks and add dropdown items
  const deckArray = JSON.parse(localStorage.getItem("userDeck")); //Check spelling

  return (
    <div className="btn-group">
      <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Choose Deck
      </button>
      <div className="dropdown-menu">
        {deckArray.map((deck) => (
          <button key={deck.id} type="button" onClick={addDeck(deck)} >{deck.name}</button>
        ))}
      </div>

    </div>
  );
}

function addDeck(deck) {
  // Add room id from the server
  /*const data = {
    deck: deck, 
    id: lobbyIgitd, 
  }*/
  socket.emit("DeckChose", JSON.stringify(deck));
}

//TODO: make event listener to start game
function StartGame() {

}




export default HostGamePage;