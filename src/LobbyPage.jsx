import { } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "./socket";
import { StartButton } from "./components/HostGamePage/StartButton";
import { DeckDropDown } from "./components/HostGamePage/DropDown";
import { Settings } from "./components/HostGamePage/Settings";
import { ReadyButton } from "./components/HostGamePage/ReadyButton";

function LobbyPage({ lobbyState }) {
	/*const [lobbyState, setLobbyState] = useState({
	  "deckSize": 15,
	  "handSize": 5,
	  "life": 3,
	  "lobbySize": 2,
	  "id": "12345",
	  "ready": 0,
	  "playerAmt": 1
	});*/

	console.log(lobbyState);
	useEffect(() => {
		socket.on("changeSetting", (data) => {
			
		});
		socket.on("playerLeft", (data) => {
			setPlayers(RemovePlayerFromArray(players, data.id));
			setPlayerAmt(data.playersAmt);
		});
		socket.on("playerJoined", (data) => {
			setPlayerAmt(data.playersAmt);
		});
		socket.on("readyUp", (data) => {
			setReady(Number(data));
		});
		socket.on("StopReadyUp", (data) => {
			setReady(Number(data));
		});
		socket.on("hostReadyUp", (readyPlayers) => {
			setReady(Number(readyPlayers));
		});

		return () => {
			socket.off("changeSetting");
			socket.off("playerLeft");
			socket.off("playerJoined");
			socket.off("readyUp");
			socket.off("StopReadyUp");
			socket.off("hostReadyUp");
		};
	}, []);

	
	// Player states: //TODO: make it such that this is updated by the map
	const [players, setPlayers] = useState(lobbyState.players);
	const [playersAmt, setPlayerAmt] = useState(lobbyState.players.length);
	const [ready, setReady] = useState(countReadyPlayers(lobbyState.players));

	//Room id & Host //TODO: figure this out
	const roomID = lobbyState.id;
	//const isHost = isPlayerHost(players, socket.id);
	const [player, setPlayer] = useState(GetPlayer(players, socket.id));
	const isHost = player.host ? true : false; 
	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h1 className="p-5 ">Lobby</h1>
					{/*first column*/}
				</div>
				<div className="col">{/*second column*/}</div>
			</div>
			{/*Første row Lobby #id og delete lobby knap*/}

			{/*Settings og Players*/}
			<div className="row align-items-start">
				<div className="col-md-6">
					<Settings lobbyState={lobbyState} />
				</div>
				<div className="col-md-6 text-end">
					<h2>Players</h2>

				</div>
			</div>
			<div className="row p-5">
				<div className="col">
					<DeckDropDown id={roomID} />
				</div>
				<div className="col-md-4 offset-md-4 text-end">
					{isHost ? <StartButton players={playersAmt} ready={ready} id={roomID}/> : <ReadyButton player={player} id={roomID} />}
				</div>
			</div>
		</div>
	);
}



//function PlayerOverview({playerArr, setplayerArr}) {}
function countReadyPlayers(players) {
	let count = 0; 
	for(const player of players)
		if(player.ready) count++; 
	return count; 
}

function GetPlayer(playersArray, id) {
	for(const player of playersArray) {
		if(player.playerid === id) {
			return player; 
		}
	}
}

function RemovePlayerFromArray(players, playerid) {
	return players.filter(player => player.id !== playerid); 
}

export default LobbyPage;
