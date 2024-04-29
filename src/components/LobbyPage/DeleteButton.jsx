import { socket } from "../../socket";
export {DeleteButton}


function DeleteButton({RoomID}) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary col-4"
        onClick={() => socket.emit("DeleteLobby", id)}
      > Delete Lobby
      </button>
    </div>
  );
}