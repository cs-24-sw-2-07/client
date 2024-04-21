import { } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "./socket";

function HostGamePage() {
  //TODO: Socket events placed here 
  useEffect(() => {
    socket.on("event", data => {
      console.log(data); 
    });
  }, []);

  //Setting states: 
  const [cardCount, setCardCount] = useState(15);
  const [handSize, setHandSize] = useState(7);
  const [maxLife, setMaxLife] = useState(5);
  const [lobbySize, setLobbySize] = useState(2);

  // Readying up states:
  const [players, setPlayers] = useState(1);
  const [ready, setReady] = useState(0);
  const [hostDeckCheck, setHostDeckCheck] = useState(false); 
  
  //The host readies up when a deck is chosen
  const readyUpHost = () => {
    if(!hostDeckCheck) {
      setReady(ready + 1);
    }
    setHostDeckCheck(true); 
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="p-5 ">Lobby</h1>
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
      <div className="row p-5">
        <div className="col ">
          <DeckDropDown hasDeckBeenChosen={readyUpHost} />
        </div>
        <div className="col-md-4 offset-md-4 text-end">
          <StartButton players={players} ready={ready} />
        </div>
      </div>
    </div >
  );
}

function DeckDropDown({ readyUpHandler }) {
  //TODO: Call function here that gets the decks and add dropdown items
  return (
    <div className="dropdown">
      <div className="btn-group">
        <button className="btn btn-primary dropdown-toggle"
          type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Choose Deck
        </button>
        <ul className="dropdown-menu">
          <GetDecksDropDown  readyUpHandler={ readyUpHandler } />
        </ul>
      </div>
    </div>
  );
}

function GetDecksDropDown({ readyUpHandler }) {
  const decks = JSON.parse(localStorage.getItem("userDeck")); //Check spelling
  if (decks === null) {
    return (
      <li><button type="button" className="dropdown-item"> No decks to choose from :/</button></li>
    );
  }

  //Creates an option for every deck saved in localStorage 
  return (
    decks.forEach(deck => (
      <li><button key={deck.id} type="button" onClick={() => addDeck(deck, readyUpHandler)}>{deck.name}</button></li>
    )));
}

function addDeck(deck, handler) {
  // Add room id from the server
  /*const data = {
    deck: deck, 
    id: lobbyIgitd, 
  }*/
  socket.emit("DeckChose", deck);
  handler();
}


function StartButton({ players, ready }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary col-4"
        disabled={players >= 2 && ready === players ? "true" : "false"}
        onClick={() => StartGame(players, ready)}
      >
        Start game
      </button>
      <p className={ready === players ? "text-success" : "text-danger"}>Players ready: {ready}/{players}</p>
    </div>
  );
}

//TODO: Ponder whether the button should check if people are ready or an event should --> Event would probably make more sense
function StartGame(players, ready) {
  //TODO: Start game event here
  return; 
}

export default HostGamePage;