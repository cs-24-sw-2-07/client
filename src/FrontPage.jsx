import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "./socket"

export default function FrontPage() {
  const navigate = useNavigate();
  function navigateTo(path) {
    navigate(path);
  }

  return (
    <div className="container">
      <h1 className="p-5 text-center">Flashcard Versus Game</h1>
      <div className="p-5"></div>
      <div className="row">
        <div className="d-grid gap-2 col">
          <JoinGameModalButton navigateTo={() => navigateTo("/LobbyPage")} />
        </div>
        <div className="d-grid gap-2 col">
          <HostGameModalButton navigateTo={() => navigateTo("/LobbyPage")} />
        </div>
        <div className="row p-5">
          <div className="d-grid gap-2 col-8 mx-auto">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => {
                navigateTo("/CreateDeckPage");
              }}
            >
              Create or Edit Decks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HostGameModalButton() {
  const [displayName, setDisplayName] = useState("");

  function hostGame() {
    //alert(`Host Game!\nInputted Name: ${displayName}`);
    console.log(socket);
    socket.emit("createLobby", displayName);
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#hostGameModal"
      >
        Host Game
      </button>
      <div
        className="modal fade"
        id="hostGameModal"
        tabIndex="-1"
        aria-labelledby="hostGameModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="hostGameModalLabel">
                Host Game
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="javascript:void(0);">
                <div className="mb-3">
                  <label
                    htmlFor="display-name"
                    className="col-form-label text-start"
                  >
                    Enter a name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="display-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={hostGame}
              >
                Create Lobby
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function JoinGameModalButton({ navigateTo }) {
  const [displayName, setDisplayName] = useState("");
  const [gameCode, setGameCode] = useState("");

  function joinGame() {
    alert(`Join Game!\nInputted Name: ${displayName}\nGame Code: ${gameCode}`);
    
    navigateTo("/LobbyPage");
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#joinGameModal"
      >
        Join Game
      </button>
      <div
        className="modal fade"
        id="joinGameModal"
        tabIndex="-1"
        aria-labelledby="joinGameModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="joinGameModalLabel">
                Join Game
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="javascript:void(0);">
                <div className="mb-3">
                  <label
                    htmlFor="game-code"
                    className="col-form-label text-start"
                  >
                    Enter Game Code:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="game-code"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                  />
                  <label
                    htmlFor="display-name"
                    className="col-form-label text-start"
                  >
                    Enter a name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="display-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={joinGame}
              >
                Join Lobby
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


