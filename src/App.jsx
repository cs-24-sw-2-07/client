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
    const [playerlives, setPlayerLives] = useState([]);
    const [maxLives, setMaxLives] = useState(0);
    const [handSize, setHandSize] = useState(0);
    const [turn, setTurn] = useState("");
    const [playerData, setPlayerData] = useState({});

    const navigate = useNavigate();
    function navigateTo(path) {
        navigate(path);
    }

    useEffect(() => {
        socket.on("disconnect", () => {
            // When lost connection, redirect to front page, if not on editor page.
            if (window.location.href.includes("/CreateDeckPage")) return;
            navigateTo("/");
        });
        socket.on("lobby", data => {
            setLobbyState(data);
            navigateTo("/LobbyPage");
        });
        socket.on("roomNotExist", () => {
            alert("The room does not exist");
        });
        socket.on("leaveLobby", data => {
            console.log(data);
            //setLobbyState(data);
            navigateTo("/");
        });
        socket.on("startedGame", (data) => {
            setHandSize(data.handSize);
            setPlayerLives(data.playerLives);
            setMaxLives(data.maxLives);
            setTurn(data.turn);
            navigateTo("/BattlePage");
        });
        socket.on("roomFull", () => {
            alert("The room you tried to join is full");
        });
        socket.on("invalidUsername", () => {
            alert("Username is invalid");
        });
        socket.on("playerInfo", (data) => {
            console.log(data)
            setPlayerData(data)
            console.log(playerData)
        });
        return () => {
            socket.off("disconnect");
            socket.off("lobby");
            socket.off("roomNotExist");
            socket.off("startedGame");
            socket.off("leaveLobby");
            socket.off("roomFull");
            socket.off("invalidUsername");
            socket.off("playerInfo");
        };

    }, []);

    return (
        <Routes>
            <Route path="/" element={<FrontPage />}></Route>
            <Route path="CreateDeckPage" element={<CreateDeckPage />}></Route>
            <Route path="LobbyPage" element={<LobbyPage lobbyState={lobbyState} />}></Route>
            <Route path="BattlePage" element={<BattlePage playerLives={playerlives} maxLives={maxLives} handSize={handSize} data={playerData} turn={turn} />}></Route>
        </Routes>
    );
}

export default App;