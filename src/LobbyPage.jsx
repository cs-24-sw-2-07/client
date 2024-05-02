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
    // All the variables that changes throughout the lobby lifetime
    const [players, setPlayers] = useState(lobbyState.players);
    const [deckLabel, setDeckLabel] = useState("Choose Deck"); 
    const [isDeckChosen, setDeckChosen] = useState(false); 

    const player = players.find(player => player.playerid === socket.id); 
    const isHost = player.host; 
    const roomID = lobbyState.id;

    useEffect(() => {
        socket.on("playerHandler", (players) => {
            setPlayers(players);
        });
        socket.on("changeDeck", (deckName) => {
            setDeckLabel(deckName); 
            setDeckChosen(true);
        });
        socket.on("deckNotAccepted", () => {
            alert("Deck Does not fit the Lobby criteria");
        });
        return () => {
            socket.off("playerHandler");
            socket.off("changeDeck"); 
            socket.off("deckNotAccepted"); 
        };
    }, []);

    return (
        <div className="container">

            {/*lobby id and Leave- or delete lobby*/}
            <div className="row">
                <div className="col" >
                    <h1 className="py-5 ">Lobby: {roomID}</h1>
                </div>
    
                <div className="col-md-4 text-end py-5">
                    { isHost
                        ? <DeleteButton /> 
                        : <LeaveButton  />
                    }
                </div>
            </div>

            {/*Settings og Players*/}
            <div className="row p-6 h-100">
                <div className="col-3 bg-light pb-3">
                    { isHost 
                        ? <HostSettings lobbyState={lobbyState} />
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
                    <DeckDropDown dropDownLabel={deckLabel}/>
                </div>
                <div className="col-6"></div>
                <div className="col-md-4 text-end">
                    { isHost 
                        ? <StartButton players={players}  /> 
                        : <ReadyButton isDeckChosen={isDeckChosen}  />
                    }
                </div>
            </div>
        </div>
    );
}

export default LobbyPage;
