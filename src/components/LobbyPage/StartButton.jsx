export { StartButton }
import { socket } from "../../socket";
import { useState } from "react";

function StartButton({ players, id }) {
  const [playersAmt, setPlayerAmt] = useState(players.length);
  const [ready, setReady] = useState(countReadyPlayers(players));

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary col-4"
        disabled={players < 2 || ready !== players}
        onClick={() => socket.emit("StartGame", { id: id })}
      > Start game
      </button>
      <p className={ready === playersAmt ? "text-success" : "text-danger"}>
				Players ready: {ready}/{playersAmt}
      </p>
    </div>
  );
}

function countReadyPlayers(players) {
  let count = 0;
  for (const player of players)
    if (player.ready) count++;
  return count;
}