import { socket } from "../../socket";
//import { useState, useEffect } from "react";
import { } from "react-router-dom";
export { PlayerOverview };

function PlayerOverview({ playersArr }) {
  /*playersArr[0] = {
		name: value.name,
		ready: value.ready,
		host: value.host,
		playerid: key
	}
	*/
  return (
    <>
      <h2>Players: </h2>
      {playersArr.map(player => PrintPlayer(player))}
    </>
  );
}

function PrintPlayer(player) {
  const isYou = player.playerid === socket.id; 

  return (
    <p>
      {player.name} {isYou ? "(You)" : ""} {player.ready}
    </p>
  );
}