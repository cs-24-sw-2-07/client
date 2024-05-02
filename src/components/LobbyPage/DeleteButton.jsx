import { socket } from "../../socket";
export {DeleteButton};


function DeleteButton() {
    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to delete this lobby?");
        if (confirmed) {
            socket.emit("deleteLobby");
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