/* eslint-disable react/jsx-no-comment-textnodes */
import { useNavigate } from "react-router-dom";

function LobbyPage(){ 
  const navigate = useNavigate();
  function navigateTo(path){
    navigate(path);
  }

function LobbyPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="text-center p-5">
          <h1>Lobby</h1>
        </div>
        // first column
        <div className=""> </div>
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
      {/*Select deck og start game}*/}
      <div className="row">
        <div className="col">
          <Dropdown
            onLoad={() => {
              GetDeckDropDown();
            }}
          ></Dropdown>
        </div>
        <div className="col ml-auto"></div>
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

export default LobbyPage;
