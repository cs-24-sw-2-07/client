import { socket } from "../../socket";
export {DeleteButton};


function DeleteButton({ RoomID }) {
  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this lobby?");
    if (confirmed) {
      socket.emit("deleteLobby", RoomID);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleDelete} 
    > Delete Lobby
    </button>
  );
}


// lav en function der sendere brugeren tilbage til start siden samt en pop up der spørger om de er sikre på at de vil slette lobbyen 