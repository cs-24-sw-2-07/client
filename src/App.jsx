import "./App.css";
import FrontPage from "./FrontPage.jsx";
import CreateDeckPage from "./CreateDeckPage.jsx";
import HostGamePage from "./HostGamePage.jsx"
import LobbyPage from "./LobbyPage.jsx"
import { Route, Routes } from "react-router-dom";
import { socket } from "./socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function App() {
  const [lobbyObj, setLobbyObj] = useState({});

  const navigate = useNavigate();
  function navigateTo(path) {
    navigate(path);
  }

  useEffect(() => {
    socket.on("lobbyCreated", data => {
      console.log(data);
      setLobbyObj(data);
      navigateTo("/HostGamePage");
    });
    socket.on("joinLobby", data => {
      console.log(data);
      setLobbyObj(data);
    });
    socket.on("RoomNotExist", () => {
      alert("The room does not exist");
    });
    return () => {
      socket.off("lobbyCreated");
      socket.off("joinLobby");
      socket.off("RoomNotExist");
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<FrontPage />}></Route>
      <Route path="CreateDeckPage" element={<CreateDeckPage />}></Route>
      <Route path="HostGamePage" element={<HostGamePage lobbyObj={lobbyObj} />}></Route>
      <Route path="LobbyPage" element={<LobbyPage />}></Route>
    </Routes>
  );
}

export default App;
