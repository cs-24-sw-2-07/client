export { StartButton }
import { socket } from "../../socket";

function StartButton({ players, ready, id }) {
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary col-4"
                disabled={players < 2 || ready !== players}
                onClick={() => socket.emit("StartGame", {id: id})}
            > Start game
            </button>
            <p className={ready === players ? "text-success" : "text-danger"}>
                Players ready: {ready}/{players}
            </p>
        </div>
    );
}