import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DisplayLives } from "./components/battleComponets/DisplayLives.jsx";
import { DisplayHand } from "./components/battleComponets/DisplayHand.jsx";
import { DisplayChosenCard } from "./components/battleComponets/DisplayChosenCard.jsx";
import { WinPopUp } from "./components/battleComponets/WinPopUp.jsx";
import { DisplayButtons } from "./components/battleComponets/DisplayButtons.jsx";
// Make websocket listerne for when a OutOfCardnotification comes
let oppOutOfCards = true;


function BattlePage(props) {
  
    let myDeck = JSON.parse(localStorage.getItem("userDeck"))[0];//props.chosenDeck;
    // TODO FUNCTION TO GET OPPENTED DECK
    let oppDeck = props.oppDeck

    // Setting up varibels for deck controlling
    const startingHand = useRef(chooseStartingHand(myDeck.cards.length, props.handSize))
    let cardTraker = useRef({used:0,handSize:props.handSize, size:myDeck.cards.length, usedCard:new Set([...startingHand.current]), playedCard:new Set()})

    let [hand, setHand] = useState(startingHand.current);
    let [handDeck, setHandDeck] = useState([]);
    let [myLife, setMyLife] = useState(props.maxLives);
    let [oppLife, setOppLife] = useState(props.maxLives);
    let [disableCards, setdisableCards] = useState(false);
    let [myTurn, setMyTurn] = useState(true); //TODO: ændre så det faktisk kun er true for den der starter
    let [displayCard, setDisplayCard] = useState("");
    let [hideElement, setHideElement] = useState(false);
    let [showWonPopUp, setShowWonPopUp] = useState(false);

    function drawNewCard(index){
        let handCopy=[... hand]
        // Addes the old card to the used cards
        cardTraker.current.playedCard.add(handCopy[index]);
        handCopy.splice(index,1)
        cardTraker.current.used++;

        // Check if a new card can be drawn
        if(cardTraker.current.size >= cardTraker.current.used+cardTraker.current.handSize){
            let pickedCard =-1;
            let usedSize = cardTraker.current.usedCard.size
            while(cardTraker.current.usedCard.size == usedSize){
                pickedCard = Math.floor(Math.random()*cardTraker.current.size);
                cardTraker.current.usedCard.add(pickedCard);
            }
            handCopy.push(pickedCard);
        }


        //chec  if both players have run out of cards 
        if(cardTraker.current.used == cardTraker.current.size){
            if(oppOutOfCards){
                setShowWonPopUp(true)
            }else {
                console.log("Send OutOfCard notificatin")
            }
        }
        setHand(handCopy)
    }

    return (
        <>
            <WinPopUp
                foundWinner={showWonPopUp}
            />
            <button className="btn" type="button" onClick={()=>drawNewCard(0)}>hej</button>

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
            />

            {hideElement && <DisplayButtons 
                myTurn={myTurn}
                setOppLife={setOppLife}
                oppLife={oppLife}   
                setShowWonPopUp={setShowWonPopUp} 
            />
            }

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
                drawNewCard={drawNewCard}
                setHideElement={setHideElement}
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