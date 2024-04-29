import { socket } from "../../socket";
export {LeaveButton}



function LeaveButton({RoomID}) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary col-4"
        onClick={() => socket.emit("LeaveLobby", RoomID)}
      >  Leave Lobby
      </button>
    </div>
  );
}