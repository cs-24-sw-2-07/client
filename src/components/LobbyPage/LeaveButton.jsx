import { socket } from "../../socket";
export {LeaveButton}



function LeaveButton({RoomID}) {
  const HandleLeave =() => {
    const confirmed =window.confirm(" Are you sure you want to leave this lobby?");


    if (confirmed) {
      socket.emit ("DeletLobby", RoomID)
    }
  }


  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={HandleLeave}

    > Leave Lobby
    </button>
  );
}