import { socket } from "../../socket";
//import { useState, useEffect } from "react";
import { } from "react-router-dom";
export { PlayerOverview };

function PlayerOverview({ players }) {
  return (
    <>
      <h2>Players: </h2>
      {players.map((player, index) => PrintPlayer(player, index))}
    </>
  );
}

function PrintPlayer(player, index) { //TODO: make it scrollable
  const isYouStr = player.playerid === socket.id ? " (You):" : ":"; 
  const playerText = `${player.name.trim()}${isYouStr}`;
  const isReady = player.ready ? "Ready  " : "Not ready"; 

  let spaces = "   ";
  for(let i = playerText.length + isReady.length + spaces.length; i < 56; i++ ) {
    spaces += " "; 
  }

  return (
    <div className="row">
      <div className="col"><p>{playerText}</p></div>
      <div className="col text-end"><p>{isReady}</p></div>
    </div>
    
  );
}
//<pre key={index} style={{fontFamily: "var(--bs-body-font-family)", fontSize: "var(--bs-body-font-size)"}}>{ + spaces + }</pre>