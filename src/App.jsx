import "./App.css";
import FrontPage from "./FrontPage.jsx";
import CreateDeckPage from "./CreateDeckPage.jsx";
import LobbyPage from "./LobbyPage.jsx"
import { Route, Routes } from "react-router-dom";
import { socket } from "./socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function App() {
  const [lobbyState, setLobbyState] = useState({});

  const navigate = useNavigate();
  function navigateTo(path) {
    navigate(path);
  }

  useEffect(() => {
    socket.on("lobby", data => {
      console.log(data);
      setLobbyState(data);
      navigateTo("/LobbyPage");
    });
    socket.on("RoomNotExist", () => {
      alert("The room does not exist");
    });
    socket.on("LeaveLobby", data => {
      console.log(data);
      //setLobbyState(data);
      navigateTo("/");
    });
    return () => {
      socket.off("Lobby");
      socket.off("RoomNotExist");
    };

  }, []);

  return (
    <Routes>
      <Route path="/" element={<FrontPage />}></Route>
      <Route path="CreateDeckPage" element={<CreateDeckPage />}></Route>
      <Route path="LobbyPage" element={<LobbyPage lobbyState={lobbyState} />}></Route>
    </Routes>
  );
}

export default App;
