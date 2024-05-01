export { ReadyButton }
import { socket } from "../../socket";


function ReadyButton({ deck }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary col-4"
        disabled={deck === "Choose Deck"}
        onClick={() => socket.emit("playerReady")}
      > Ready Up 
      </button>
    </div>
  );
}
//TODO: If one has the a deck name "Choose Deck" then the ready button will not be enabled 