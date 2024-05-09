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
    const [handSize, setHandSize] = useState(0);
    const [turn, setTurn] = useState("");
    const [deckData, setDeckData] = useState({});

    const navigate = useNavigate();
    function navigateTo(path) {
        navigate(path);
    }

    useEffect(() => {
        socket.on("lobby", data => {
            const hasDecks = JSON.parse(localStorage.getItem("userDeck"));
            if(hasDecks === null) {
                alert("Please make a deck before proceeding");
            } else {
                setLobbyState(data);
                navigateTo("/LobbyPage");
            }
        });
        socket.on("roomNotExist", () => {
            alert("The room does not exist");
        });
        socket.on("LeaveLobby", data => {
            console.log(data);
            //setLobbyState(data);
            navigateTo("/");
        });
        socket.on("startedGame", (data) => {
            setHandSize(data.handSize);
            setPlayerLives(data.playerLives);
            setTurn(data.turn);
            navigateTo("/battlePage");
        });
        socket.on("RoomFull", () => {
            alert("The room you tried to join is full");
        });
        socket.on("invalidUsername", () => {
            alert("Username is invalid");
        });
        socket.on("playerInfo", (data) => {
            console.log(data)
            setDeckData(data)
            console.log(deckData)
        });
        return () => {
            socket.off("Lobby");
            socket.off("RoomNotExist");
            socket.off("startedGame");
            socket.off("LeaveLobby");
            socket.off("RoomFull"); 
            socket.off("invalidUsername");
            socket.off("playerInfo");
        };

    }, []);

    return (
        <Routes>
            <Route path="/" element={<FrontPage />}></Route>
            <Route path="CreateDeckPage" element={<CreateDeckPage />}></Route>
            <Route path="LobbyPage" element={<LobbyPage lobbyState={lobbyState} />}></Route>
            <Route path="battlePage" element={<BattlePage playerLives={playerlives} handSize={handSize} data={deckData} turn={turn}/>}></Route>
        </Routes>
    );
}

export default App;
