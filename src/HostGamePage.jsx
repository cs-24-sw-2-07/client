import { } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "./socket";
import { StartButton } from "./components/HostGamePage/StartButton";
import { DeckDropDown } from "./components/HostGamePage/DropDown";

function HostGamePage({ lobbyObj }) {
	/*const [lobbyState, setLobbyState] = useState({
	  "deckSize": 15,
	  "handSize": 5,
	  "life": 3,
	  "lobbySize": 2,
	  "id": "12345",
	  "ready": 0,
	  "playerAmt": 1
	});*/

	console.log(lobbyObj);
	useEffect(() => {
		socket.on("changeSetting", (data) => {
			
		});
		socket.on("playerLeft", (data) => {

			setPlayers(data.playersAmt);
		});
		socket.on("playerJoined", (data) => {
			setPlayers(data.playersAmt);
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

	//Room id
	const roomID = lobbyObj.id;

	//Setting states:
	const [settingsState, setSettingsState] = useState({
		cardCount: lobbyObj.deckSize,
		handSize: lobbyObj.handSize,
		maxLife: lobbyObj.life,
		lobbySize: lobbyObj.lobbySize,
	});
	//TODO: Send the player map from the server and put it into a map here 
	const [playerArr, setplayerArr] = useState(new Map());
	const UpdateMapArray = (k, v) => {
		let tempArray = playerArr;
		tempArray.set(k, v);
		setplayerArr(tempArray);
	};
	//UpdateMapArray(lobbyObj.name, false);

	// Readying up states: //TODO: make it such that this is updated by the map
	const [players, setPlayers] = useState(lobbyObj.playerAmt);
	const [ready, setReady] = useState(lobbyObj.ready);

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
					<h2>Settings</h2>
					<Settings
						settingsState={settingsState}
						setSettingsState={setSettingsState}
					/>
				</div>
				<div className="col-md-6 text-end">
					<h2>Players</h2>

				</div>
				{/*Select deck og start game*/}
				<div className="row p-5">
					<div className="col ">
						<DeckDropDown />
					</div>
					<div className="col-md-4 offset-md-4 text-end">
						<StartButton players={players} ready={ready} />
					</div>
				</div>
			</div>
		</div>
	);
}

function Settings({ settingsState, setSettingsState }) {
	return (
		<form>
			<div className="form-group">
				<div className="col-4">
					<label htmlFor="decksize">Deck Size:</label>
					<input
						type="number"
						className="form-control"
						id="decksize"
						value={settingsState.cardCount}
						onChange={(e) => setSettingsState({
							...settingsState,
							cardCount: e.target.value
						})}
					></input>
					<label htmlFor="handsize"> Hand Size:</label>
					<input
						type="number"
						className="form-control"
						id="handsize"
						value={settingsState.handSize}
						onChange={(e) => setSettingsState({
							...settingsState,
							handSize: e.target.value
						})}
					></input>
					<label htmlFor="Maxlife"> Life: </label>
					<input
						type="number"
						className="form-control"
						id="lifesize"
						value={settingsState.maxLife}
						onChange={(e) => setSettingsState({
							...settingsState,
							maxLife: e.target.value
						})}
					></input>
					<label htmlFor="lobbySize"> Lobby Size:</label>
					<input
						type="number"
						className="form-control"
						id="lobbySize"
						value={settingsState.lobbySize}
						onChange={(e) => setSettingsState({
							...settingsState,
							LobbySize: e.target.value
						})}
					></input>
				</div>
			</div>
		</form>
	);
}

//function PlayerOverview({playerArr, setplayerArr}) {}

export default HostGamePage;
