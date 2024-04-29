import { socket } from "../../socket";
//import { useState, useEffect } from "react";
import { } from "react-router-dom";
export { PlayerOverview };

function PlayerOverview({ players }) {
  return (
    <>
      <h2>Players: </h2>
      {players.map(player => PrintPlayer(player))}
    </>
  );
}

function PrintPlayer(player) { //TODO: make it scrollable
  const isYouStr = player.playerid === socket.id ? " (You):" : ":"; 
  const playerText = `${player.name}${isYouStr}`;
  const isReady = player.ready ? "Ready  " : "Not ready"; 

  let spaces = "   ";
  for(let i = playerText.length + isReady.length + spaces.length; i < 56; i++ ) {
    spaces += " "; 
  }

  return (
    <pre style={{fontFamily: "var(--bs-body-font-family)", fontSize: "var(--bs-body-font-size)"}}>{playerText + spaces + isReady}</pre>
  );
}
