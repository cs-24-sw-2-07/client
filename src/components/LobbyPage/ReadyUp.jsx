import { socket } from "../../socket";

export function ReadyButton({ isDeckChosen }) {
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary col-4"
                disabled={!isDeckChosen}
                onClick={() => socket.emit("playerReady")}
            > Ready Up 
            </button>
        </div>
    );
}