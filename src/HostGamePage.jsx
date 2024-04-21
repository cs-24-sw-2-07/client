import { } from "react-router-dom";
import { useState, useEffect } from "react";

function HostGamePage() {

  const [cardCount, setCardCount] = useState(15);
  const [handSize, setHandSize] = useState(7);
  const [maxLife, setMaxLife] = useState(5);
  const [lobbySize, setLobbySize] = useState(2);

  const [players, setPlayers] = useState(1);
  const [ready, setReady] = useState(0);

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
          
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" 
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Dropdown button
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item" href="#">Action</button>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </div>

        <div className="col-6 invisible"></div>

          {/*<CreateDropDown />*/}
        </div>
        <div className="col-md-4 offset-md-4 text-end">
          
          <button
            type="button"
            className="btn btn-primary col-4"
            id="Start_game button"
            onClick={() => StartGame(players, ready)}
          >
            Start game
          </button>
          <p>Players ready: {ready}/{players}</p>
        </div>
      </div>
    </div>
  );
}

function CreateDropDown() {
  //TODO: Call function here that gets the decks and add dropdown items
  const deckArray = JSON.parse(localStorage.getItem("userDeck")); //Check spelling
  //const [open, setOpen] = useState(false); 

  return (
    <div className="btn-group">
      <button type="button" className="btn btn-primary dropdown-toggle" id="dropdownMenuButton"
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Choose Deck
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <GetDecksDropDown decks={deckArray} />
      </div>
    </div>
  );
}

function GetDecksDropDown({ decks }) {
  if (decks === null) {
    return (
      <a className="dropdown-item" href="#"> No decks to choose from :/</a>
    );
  }

  return (
    decks.forEach(deck => (
      <button key={deck.id} type="button" onClick={() => addDeck(deck)}>{deck.name}</button>
    )));
}

function addDeck(deck) {
  // Add room id from the server
  /*const data = {
    deck: deck, 
    id: lobbyIgitd, 
  }*/
  socket.emit("DeckChose", deck);
}

//TODO: Ponder whether the button should check if people are ready or an event should --> Event would probably make more sense
function StartGame(players, ready) {
  if(players < 2) {
    alert("Need at least 2 players to start game");
    return;
  }

  if(ready != players) {
    alert("Everyone needs to ready up");
    return;
  }

  //TODO: Start game event here

}




export default HostGamePage;