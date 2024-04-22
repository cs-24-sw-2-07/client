import { } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "./socket";

function HostGamePage(props) {
  const [lobbyObj, setObj] = useState(props.lobbyJSON); 
  console.log(lobbyObj);
  //TODO: Socket events placed here 
  useEffect(() => {
    socket.on("changeSetting", data => {
      setObj(data);
    });
    socket.on("playerLeft", data => {
      setObj(data);
      setPlayers(data.playersAmt);
    }); 
    socket.on("playerJoined", data => {
      setObj(data);
      setPlayers(data.playersAmt);
    }); 
    socket.on("readyUp", data => {
      setReady(Number(data));
    });
    socket.on("StopReadyUp", data => {
      setReady(Number(data)); 
    });
    socket.on("hostReadyUp", readyPlayers => {
      setReady(Number(readyPlayers));
    })

    return () => {
      socket.off("changeSetting"); 
      socket.off("playerLeft");
      socket.off("playerJoined"); 
      socket.off("readyUp"); 
      socket.off("StopReadyUp"); 
      socket.off("hostReadyUp");
    }
  }, []);

  //Setting states: 
  const [cardCount, setCardCount] = useState(15);
  const [handSize, setHandSize] = useState(7);
  const [maxLife, setMaxLife] = useState(5);
  const [lobbySize, setLobbySize] = useState(2);
  const playerArr = [{}]
  const [joinedPlayer, setJoinedPlayers] = useState([{}]);
  // Readying up states:
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
            <div className="col-md-6">
              <h3>players</h3>
              
            </div>
          </div>
        </div>
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
    </div >
  );
}

function DeckDropDown() {
  //TODO: Call function here that gets the decks and add dropdown items
  return (
    <div className="dropdown">
      <div className="btn-group">
        <button className="btn btn-primary dropdown-toggle"
          type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
      <li><button type="button" className="dropdown-item"> No decks to choose from :/</button></li>
    );
  }

  //Creates an option for every deck saved in localStorage 
  return (
    decks.forEach(deck => (
      <li><button key={deck.id} type="button" className="dropdown-item" onClick={() => addDeck(deck)}>{deck.name}</button></li>
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
function StartGame() {
  //TODO: Start game event here
  //Make an obj that contains the room id
  socket.emit("StartGame");
}

export default HostGamePage;