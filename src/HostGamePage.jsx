import {} from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "./socket";

function HostGamePage({ lobbyObj }) {
  const [lobbyState, setLobbyState] = useState(lobbyObj);
  //TODO: Socket events placed here
  useEffect(() => {
    socket.on("changeSetting", (data) => {
      setLobbyState(data);
    });
    socket.on("playerLeft", (data) => {
      setLobbyState(data);
      setPlayers(data.playersAmt);
    });
    socket.on("playerJoined", (data) => {
      setLobbyState(data);
      setPlayers(data.playersAmt);
    });
    socket.on("readyUp", (data) => {
      setReady(Number(data));
    });
    socket.on("StopReadyUp", (data) => {
      setReady(Number(data));
    });
    socket.on("hostReadyUp", (readyPlayers) => {
      setReady(Number(readyPlayers));
    });

    return () => {
      socket.off("changeSetting");
      socket.off("playerLeft");
      socket.off("playerJoined");
      socket.off("readyUp");
      socket.off("StopReadyUp");
      socket.off("hostReadyUp");
    };
  }, []);

  //Setting states:
  const [settingsState, setSettingsState] = useState({
    cardCount: lobbyState.deckSize,
    handSize: lobbyState.handSize,
    maxLife: lobbyState.life,
    lobbySize: lobbyState.lobbySize,
  });
  const [playerArr, setplayerArr] = useState(new Map());
  setplayerArr(
    playerArr.set(lobbyState.name, {
      ready: lobbyState.ready,
      name: lobbyState.name,
    })
  );
  // Readying up states:
  const [players, setPlayers] = useState(lobbyState.playerAmt);
  const [ready, setReady] = useState(lobbyState.ready);

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

      <div className="row align-items-start">
        <div className="col-md-6">
          <h2>Settings</h2>
          <Settings
            settingsState={settingsState}
            setSettingsState={setSettingsState}
          />
        </div>
        <div className="col-md-6 text-end">
          <h2>Players</h2>
        </div>
        {/*Select deck og start game*/}
        <div className="row p-5">
          <div className="col ">
            <DeckDropDown />
          </div>
          <div className="col-md-4 offset-md-4 text-end">
            <StartButton players={players} ready={ready} />
          </div>
        </div>
      </div>
    </div>
  );
}

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
        >
          Choose Deck
        </button>
        <ul className="dropdown-menu">
          <GetDecksDropDown />
        </ul>
      </div>
    </div>
  );
}

function GetDecksDropDown() {
  const decks = JSON.parse(localStorage.getItem("userDeck")); //Check spelling
  if (decks === null) {
    return (
      <li>
        <button type="button" className="dropdown-item">
          {" "}
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

function StartButton({ players, ready }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary col-4"
        disabled={players >= 2 && ready === players ? false : true}
        onClick={() => StartGame(players, ready)}
      >
        Start game
      </button>
      <p className={ready === players ? "text-success" : "text-danger"}>
        Players ready: {ready}/{players}
      </p>
    </div>
  );
}

//TODO: Ponder whether the button should check if people are ready or an event should --> Event would probably make more sense
function StartGame() {
  //TODO: Start game event here
  //Make an obj that contains the room id
  socket.emit("StartGame");
}

function Settings({ settingsState, setSettingsState }) {
  return (
    <form>
      <div className="form-group">
        <div className="col-4">
          <label htmlFor="decksize">Deck Size:</label>
          <input
            type="number"
            className="form-control"
            id="decksize"
            value={settingsState.cardCount}
            onChange={(e) => setSettingsState.cardCount(e.target.value)}
          ></input>
          <label htmlFor="handsize"> Hand Size:</label>
          <input
            type="number"
            className="form-control"
            id="handsize"
            value={settingsState.handSize}
            onChange={(e) => setSettingsState.handSize(e.target.value)}
          ></input>
          <label htmlFor="Maxlife"> Life: </label>
          <input
            type="number"
            className="form-control"
            id="lifesize"
            value={settingsState.maxLife}
            onChange={(e) => settingsState.MaxLife(e.target.value)}
          ></input>
          <label htmlFor="lobbySize"> Lobby Size:</label>
          <input
            type="number"
            className="form-control"
            id="lobbySize"
            value={settingsState.lobbySize}
            onChange={(e) => setSettingsState.LobbySize(e.target.value)}
          ></input>
        </div>
      </div>
    </form>
  );
}

//function PlayerOverview({playerArr, setplayerArr}) {}

export default HostGamePage;
