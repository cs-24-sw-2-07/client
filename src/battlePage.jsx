import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayLives } from "./components/battleComponets/DisplayLives.jsx";
import { DisplayHand } from "./components/battleComponets/DisplayHand.jsx";

function BattleGameStates(){


  return (
    <BattlePage/>
  )
}

function BattlePage(props) {
  const startingHand = useRef(chooseStartingHand(20,5))
  
  console.log(startingHand)
  let myDeck = props.chosenDeck;

  // TODO FUNCTION TO GET OPPENTED DECK
  let oppDeck = props.oppDeck

  let [myLife, setMyLife] = useState(props.maxLives);
  let [oppLife, setOppLife] = useState(props.maxLives);
  let [myTurn, setMyTurn] = useState(true); //TODO: ændre så det faktisk kun er true for den der starter
  
  return (
    <>
      <DisplayLives
        myLives={myLife}
        oppLives={oppLife}
        maxLives={props.maxLives}
        myTurn={myTurn}
      />
      <p></p>
      <DisplayHand
        myLives={myLife}
        oppLives={oppLife}
        maxLives={props.maxLives}
        myTurn={myTurn}
      />
    </>
  );
}

function chooseStartingHand(deckSize,cardAmount){
  let hand = new Set();
  while(hand.size < cardAmount){
    let pickedCard = Math.floor(Math.random()*deckSize);
    hand.add(pickedCard);
  }
  return [...hand];
}

export default BattlePage;