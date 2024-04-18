import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayLives } from "./components/battleComponets/DisplayLives.jsx";

function BattlePage(props) {
  let myDeck = props.chosenDeck;

  // TODO FUNCTION TO GET OPPENTED DECK
  let oppDeck = props.oppDeck

  let [myLife, setMyLife] = useState(5);
  let [oppLife, setOppLife] = useState(5);

  
  return (
    <DisplayLives
      myLives={myLife}
      oppLives={oppLife}
      maxLives={props.maxLives}
    />
  );
}


export default BattlePage;