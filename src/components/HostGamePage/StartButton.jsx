export { StartButton }
import { socket } from "./../../socket";

function StartButton({ players, ready }) {
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary col-4"
                disabled={players >= 2 && ready === players ? false : true}
                onClick={() => StartGame(players, ready)}
            >
                Start game
            </button>
            <p className={ready === players ? "text-success" : "text-danger"}>
                Players ready: {ready}/{players}
            </p>
        </div>
    );
}

//TODO: Ponder whether the button should check if people are ready or an event should --> Event would probably make more sense
function StartGame() {
    //TODO: Start game event here
    //Make an obj that contains the room id
    socket.emit("StartGame");
  }