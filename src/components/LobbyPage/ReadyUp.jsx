export { ReadyButton }
import { socket } from "../../socket";


function ReadyButton({ player }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary col-4"
        disabled={player.deck === null}
        onClick={() => socket.emit("playerReady")}
      > Ready Up 
      </button>
    </div>
  );
}