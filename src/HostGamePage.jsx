
function HostGamePage(){ 
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
        <div className="col"><h2>Settings</h2>
        </div>
          
      </div>

      {/*Select deck og start game*/}
      <div className="row">
        <div className="col">
          <Dropdown onLoad={GetDeckDropDown}></Dropdown>
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

function GetDeckDropDown() {
  //TODO: Call function here that gets the decks and add dropdown items
  //! Dropdown skal hentes fra et third party library 
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="deckDropDown">
        Choose Your Deck
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

//TODO: make event listener to start game
function StartGame() {

}



export default HostGamePage;