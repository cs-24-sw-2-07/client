import { socket } from "../../socket";
export {DeleteButton}


function DeleteButton({RoomID}) {
  return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => socket.emit("DeleteLobby", RoomID)}
      > Delete Lobby
      </button>
  );
}

// lav en function der sendere brugeren tilbage til start siden samt en pop up der spørger om de er sikre på at de vil slette lobbyen 