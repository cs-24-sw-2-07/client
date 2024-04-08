import "./App.css";
import FrontPage from "./FrontPage.jsx";
import CreateDeckPage from "./CreateDeckPage.jsx";
import HostGamePage from "./HostGamePage.jsx"
import LobbyPage from "./LobbyPage.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />}></Route>
        <Route path="CreateDeckPage" element={<CreateDeckPage />}></Route>
        <Route path="HostGamePage" element={<HostGamePage />}></Route>        
        <Route path="LobbyPage" element={<LobbyPage/>}></Route>      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
