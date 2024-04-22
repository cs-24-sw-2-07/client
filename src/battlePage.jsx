import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayLives } from "./components/battleComponets/DisplayLives.jsx";
import { DisplayHand } from "./components/battleComponets/DisplayHand.jsx";
import { DisplayChosenCard } from "./components/battleComponets/DisplayChosenCard.jsx";


function BattlePage(props) {
  
  let myDeck = JSON.parse(localStorage.getItem("userDeck"))[0];//props.chosenDeck;
  // TODO FUNCTION TO GET OPPENTED DECK
  let oppDeck = props.oppDeck

  // Setting up varibels for deck controlling
  const startingHand = useRef(chooseStartingHand(myDeck.cards.length, props.handSize))
  let cardTraker = useRef({used:0,handSize:props.handSize, startSize:myDeck.cards.length, usedCard:new Set([...startingHand.current]), playedCard:new Set()})

  let [hand, setHand] = useState(startingHand.current);
  let [handDeck, setHandDeck] = useState([]);
  let [myLife, setMyLife] = useState(props.maxLives);
  let [oppLife, setOppLife] = useState(props.maxLives);
  let [disableCards, setdisableCards] = useState(false);
  let [myTurn, setMyTurn] = useState(true); //TODO: ændre så det faktisk kun er true for den der starter
  let [displayCard, setDisplayCard] = useState(myDeck.cards[0]);
  let [hideElement, setHideElement] = useState(false);

  //console.log(hand)
  function drawNewCard(index){
    let handCopy=[... hand]
    console.log("played, ", handCopy[index])
    // Addes the old card to the used cards
    //cardTraker.current.usedCard.add(handCopy[index]);
    cardTraker.current.playedCard.add(handCopy[index]);
    handCopy.splice(index,1)
    console.log("used ",cardTraker.current.usedCard)
    console.log("played ",cardTraker.current.playedCard)
    cardTraker.current.used++;

    // Check if a new card can be drawn
    if(cardTraker.current.startSize >= cardTraker.current.used+cardTraker.current.handSize){
      let pickedCard =-1;
      let usedSize = cardTraker.current.usedCard.size
      //console.log("træk")
      //console.log(cardTraker.current.usedCard)
      while(cardTraker.current.usedCard.size == usedSize){
        pickedCard = Math.floor(Math.random()*cardTraker.current.startSize);
        //console.log(pickedCard)
        cardTraker.current.usedCard.add(pickedCard);
      }
      console.log("Pickec ",pickedCard)
      handCopy.push(pickedCard);
    }
    setHand(handCopy)
  }


  return (
    <>
      <button className="btn" type="button" onClick={()=>drawNewCard(1)}>
        hej
      </button>
      <DisplayLives
        myLives={myLife}
        oppLives={oppLife}
        maxLives={props.maxLives}
        myTurn={myTurn}
      />
      
      <DisplayChosenCard
        displayCard={displayCard}
        setDisplayCard={setDisplayCard}
        myTurn={myTurn}
        hideElement={hideElement}
        setHideElement={setHideElement}
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
        setDisplayCard={setDisplayCard}
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