import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayLives } from "./components/battleComponets/DisplayLives.jsx";
import { DisplayHand } from "./components/battleComponets/DisplayHand.jsx";
import { DisplayChosenCard } from "./components/battleComponets/DisplayChosenCard.jsx";


function BattlePage(props) {
  const startingHand = useRef(chooseStartingHand(10,8))
  
  let myDeck = JSON.parse(localStorage.getItem("userDeck"))[1];//props.chosenDeck;
  // TODO FUNCTION TO GET OPPENTED DECK
  let oppDeck = props.oppDeck


  let [hand, setHand] = useState(startingHand.current);
  let [handDeck, setHandDeck] = useState([]);
  let [myLife, setMyLife] = useState(props.maxLives);
  let [oppLife, setOppLife] = useState(props.maxLives);
  let [disableCards, setdisableCards] = useState(false);
  let [myTurn, setMyTurn] = useState(true); //TODO: ændre så det faktisk kun er true for den der starter
  let [displayCard, setDisplayCard] = useState(myDeck[0]);

  return (
    <>
      <DisplayLives
        myLives={myLife}
        oppLives={oppLife}
        maxLives={props.maxLives}
        myTurn={myTurn}
      />
      
      <DisplayChosenCard
        displayCard={displayCard}
        setDisplayCard={setDisplayCard}
      />

      <DisplayHand
        hand={hand}
        myTurn={myTurn}
        myDeck={myDeck}
        handDeck={handDeck}
        setHandDeck={setHandDeck}
        setMyTurn={setMyTurn}
        disableCards={disableCards}
        setdisableCards={setdisableCards}
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