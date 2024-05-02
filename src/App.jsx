import "./App.css";
import FrontPage from "./FrontPage.jsx";
import CreateDeckPage from "./CreateDeckPage.jsx";
import LobbyPage from "./LobbyPage.jsx"
import { Route, Routes } from "react-router-dom";
import { socket } from "./socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BattlePage } from "./battlePage.jsx";


function App() {
    const [lobbyState, setLobbyState] = useState({});

    const navigate = useNavigate();
    function navigateTo(path) {
        navigate(path);
    }

    useEffect(() => {
        socket.on("lobby", data => {
            setLobbyState(data);
            navigateTo("/LobbyPage");
        });
        socket.on("roomNotExist", () => {
            alert("The room does not exist");
        });
        socket.on("LeaveLobby", data => {
            console.log(data);
            //setLobbyState(data);
            navigateTo("/");
        });
        socket.on("startedGame", () => {
            navigateTo("/battlePage"); //TODO: Change this
        });
        socket.on("RoomFull", () => {
            alert("The room you tried to join is full");
        });
        socket.on("invalidUsername", () => {
            alert("Username is invalid");
        });
        return () => {
            socket.off("Lobby");
            socket.off("RoomNotExist");
            socket.off("startedGame");
            socket.off("LeaveLobby");
            socket.off("RoomFull"); 
            socket.off("invalidUsername");
        };

    }, []);

    return (
        <Routes>
            <Route path="/" element={<FrontPage />}></Route>
            <Route path="CreateDeckPage" element={<CreateDeckPage />}></Route>
            <Route path="LobbyPage" element={<LobbyPage lobbyState={lobbyState} />}></Route>
            <Route path="battlePage" element={<BattlePage maxLives={4} handSize={5}/>}></Route>
        </Routes>
    );
}

export default App;
