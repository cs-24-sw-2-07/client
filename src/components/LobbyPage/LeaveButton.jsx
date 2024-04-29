import { socket } from "../../socket";
export {LeaveButton}



function LeaveButton({PlayerObj, socket}) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary col-4"
        onClick={() => socket.emit("LeaveLobby", PlayerObj, socket)}
      >  Leave Lobby
      </button>
    </div>
  );
}