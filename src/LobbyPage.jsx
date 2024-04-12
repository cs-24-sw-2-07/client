/* eslint-disable react/jsx-no-comment-textnodes */
import { useNavigate } from "react-router-dom";

function LobbyPage() { 
  const navigate = useNavigate();
  function navigateTo(path){
    navigate(path);
}

export default LobbyPage;
