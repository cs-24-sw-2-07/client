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

function PrintPlayer(player, index) {
  const isYouStr = player.playerid === socket.id ? " (You):" : ":"; 
  const playerText = `${player.name.trim()}${isYouStr}`;
  const isReady = player.ready ? "Ready  " : "Not ready"; 

  return (
    <div className="row" key={index}>
      <div className="col"><p>{playerText}</p></div>
      <div className="col text-end"><p>{isReady}</p></div>
    </div>
  );
}