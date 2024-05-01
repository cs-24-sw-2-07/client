export { StartButton }
//import { useEffect } from "react";
import { socket } from "../../socket";

function StartButton({ players }) {
  /*const [playersAmt, setPlayerAmt] = useState(players.length);
  const [ready, setReady] = useState(countReadyPlayers(players));

  function updatePlayers(players) {
    setPlayerAmt(players.length);
    setReady(countReadyPlayers(players)); 
  }*/
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

