import { useNavigate } from "react-router-dom";
export default HostGamePage;

function HostGamePage() {
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
        <div className="row">
          <div className="col">
            <h2>Settings</h2>
            <form>
              <div className="form-group">
                <label htmlFor="decksize">Deck Size:</label>
                <input
                  type="number"
                  className="form-control"
                  id="decksize"
                  value="15"
                ></input>
              </div>
            </form>
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
    //! Dropdown skal hentes fra et third party library
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button type="button" className="dropdown-item" href="#">
            Action
          </button>
          <button type="button" className="dropdown-item" href="#">
            Another action
          </button>
          <button type="button" className="dropdown-item" href="#">
            Something else here
          </button>
        </div>
      </div>
    );
  }

  //TODO: make event listener to start game
  function StartGame() {}
