

function LobbyPage(){ 
  return (
    <div className="container">
      <div className="row">
          <div className="col"><p>Lobby</p></div>
          // first column 
          
          <div className="col"> </div>
          // second column 
      </div>
      //Første row Lobby #id og delete lobby knap

      // Settings og Players
        <div className="row">
          <div>className="col"<h2>Settings</h2></div>
          
        </div>

      //Select deck og start game
      <div className="row">
        <div className="col">
          <Dropdown onLoad={() => {GetDeckDropDown();}}>
          </Dropdown>
        </div>
        <div className="col ml-auto">
          <button type="button" class="btn btn-primary" id="">
            Start game
          </button>

        </div>
      </div>
    </div>
  );
}

function GetDeckDropDown() {
  // TODO: Call function here that gets the decks and add dropdown items
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

export default LobbyPage;<div classname="text-left p-5"><h2>Settings</h2></h2></div></div>