export { ReadyButton }
import { socket } from "../../socket";


function ReadyButton({ player, id }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary col-4"
        disabled={player.deck === null}
        onClick={() => socket.emit("playerReady", id)}
      > Ready Up
      </button>
    </div>
  );
}