import { socket } from "./socket.js"; 

function HostGamePage(){ 

  //Todo: Remember a name is sent when creating a lobby
  /*const data = {
    name: displayName
  };
  socket.emit("CreateLobby", JSON.stringify(data));*/

  return (
    <div className="container">
      <div className="row">
        <div className="col"><p>Lobby</p>
          {/*first column*/}
        </div>
        <div className="col"> 
          {/*second column*/}
        </div>
      </div>
      {/*Første row Lobby #id og delete lobby knap*/}

      {/*Settings og Players*/}
      <div className="row">
        <div className="col">
          <div className="text-left p-5"> 
            <h2>Settings</h2>
            <div className="input-group">
              <span className="input-group-text">Deck size</span>
              <textarea className="form-control" aria-label="Enter deck size limit"></textarea>
            </div>
          </div>
        </div>
      </div>

      {/*Select deck og start game*/}
      <div className="row">
        <div className="col">
          <Dropdown />
        </div>
        <div className="col ml-auto">
          <button type="button" className="btn btn-primary" id="Start_game button" onClick={StartGame}>
            Start game
          </button>
        </div>
      </div>
    </div>
  );
}

function Dropdown() {
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