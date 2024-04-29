import { } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "./socket";
import { StartButton } from "./components/LobbyPage/StartButton.jsx";
import { DeckDropDown } from "./components/LobbyPage/DropDown.jsx";
import { HostSettings } from "./components/LobbyPage/HostSettings.jsx";
import { JoinedSettings } from "./components/LobbyPage/JoinedSettings.jsx";
import { ReadyButton } from "./components/LobbyPage/ReadyUp.jsx";
import { PlayerOverview } from "./components/LobbyPage/PlayersOverview.jsx";
import { DeleteButton} from "./components/LobbyPage/DeleteButton.jsx";
import {LeaveButton} from "./components/LobbyPage/LeaveButton.jsx";

function LobbyPage({ lobbyState }) {
  
  console.log(lobbyState);
  useEffect(() => {
    
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
      socket.off("playerLeft");
      socket.off("playerJoined");
      socket.off("readyUp");
      socket.off("StopReadyUp");
      socket.off("hostReadyUp");
    };
  }, []);

	
  //Room id & Host
  const [players, setPlayers] = useState(lobbyState.players);
  const [player, setPlayer] = useState(GetPlayer(players, socket.id));

  const isHost = player.host; 
  const roomID = lobbyState.id;

  return (
    <div className="container">

      {/*lobby id and Leave- or delete lobby*/}
      <div className="row">
        <div className="col" >
          <h1 className="py-5 ">Lobby: {roomID}</h1>
        </div>
    
        <div className="col-md-4 text-end py-5">
          { isHost 
            ? <DeleteButton RoomID={roomID}/> 
            : <LeaveButton  RoomID={roomID}/>
          }
        </div>
      </div>

      {/*Settings og Players*/}
      <div className="row p-6">
        <div className="col-3 bg-light pb-3">
          { isHost 
            ? <HostSettings lobbyState={lobbyState} roomID={roomID} />
            : <JoinedSettings lobbyState={lobbyState} /> 
          }
        </div>
        <div className="col-6"></div>
        <div className="col-3 bg-light">
          <PlayerOverview players={players} />
        </div>
      </div>
      <div className="row p-5">
        <div className="col">
          <DeckDropDown id={roomID} />
        </div>
        <div className="col-6"></div>
        <div className="col-md-4 text-end">
          { isHost 
            ? <StartButton players={players} id={roomID} /> 
            : <ReadyButton player={player} id={roomID} />
          }
        </div>
      </div>
    </div>
  );
}



//function PlayerOverview({playerArr, setplayerArr}) {}
//TODO: Move these to seperate file


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
