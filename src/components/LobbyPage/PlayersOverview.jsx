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
  const isYouStr = player.playerid === socket.id ? "(You)" : ""; 
  const playerText = `${player.name} ${isYouStr}`;
  const isReady = player.ready ? "Ready" : "Not ready"; 

  let dots = ".....";
  for(let i = playerText.length + isReady.length; i < 53; i++ ) {
    dots += "."; 
  }

  return (
    <p>{playerText + dots + isReady}</p>
  );
}
