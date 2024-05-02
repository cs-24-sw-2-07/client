import { socket } from "../../socket";

export function StartButton({ players }) {
    let playersReady = players.filter(player => player.ready).length;
    let playersAmount = players.length;
	
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary col-4"
                disabled={playersAmount < 2 || playersReady !== playersAmount}
                onClick={() => socket.emit("StartGame")}
            > Start game
            </button>
            <p className={playersReady === playersAmount && playersAmount > 1 ? "text-success" : "text-danger"}>
		Players ready: {playersReady}/{playersAmount}
            </p>
        </div>
    );
}

