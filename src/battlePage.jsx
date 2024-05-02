import { useState, useRef, useEffect } from "react";
import { DisplayLives } from "./components/battleComponets/DisplayLives.jsx";
import { DisplayHand } from "./components/battleComponets/DisplayHand.jsx";
import { DisplayChosenCard } from "./components/battleComponets/DisplayChosenCard.jsx";
import { WinPopUp } from "./components/battleComponets/WinPopUp.jsx";
import { DisplayButtons } from "./components/battleComponets/DisplayButtons.jsx";
import { socket } from "./socket.js"
// Make websocket listerne for when a OutOfCardnotification comes
let oppOutOfCards = true;

function BattlePage(props) {
  
    let myDeck = JSON.parse(localStorage.getItem("userDeck"))[0];//props.chosenDeck;
    // TODO FUNCTION TO GET OPPENTED DECK
    //let oppDeck = props.oppDeck

    // Setting up varibels for deck controlling
    const startingHand = useRef(chooseStartingHand(myDeck.cards.length, props.handSize))
    let cardTracker = useRef({used:0,handSize:props.handSize, size:myDeck.cards.length, usedCard:new Set([...startingHand.current]), playedCard:new Set()})

    let [hand, setHand] = useState(startingHand.current);
    let [handDeck, setHandDeck] = useState([]);

    let [disableCards, setdisableCards] = useState(false);
    let [myTurn, setMyTurn] = useState(true); //TODO: ændre så det faktisk kun er true for den der starter
    let [displayCard, setDisplayCard] = useState("");
    let [hideElement, setHideElement] = useState(false);
    let [showWonPopUp, setShowWonPopUp] = useState(false);
    let [gameResult, setGameResult] = useState("");

    useEffect(()=>{
        function playerInfoFunc(data){

        }
        function playerInfoFunc(data){

        }
        function playerInfoFunc(data){

        }
        function playerInfoFunc(data){

        }


        socket.on("playerInfo",playerInfoFunc)

        socket.on("cardPicked")

        socket.on("doneAnswering")

        socket.on("foundWinner")

        socket.on("switchRoles")    

        return () => {
            
        };
    },[])

    return (
        <>
            <WinPopUp
                foundWinner={showWonPopUp}
                gameResult={gameResult}
            />

            <DisplayLives
                maxLives={props.maxLives}
                myTurn={myTurn}
            />
      
            <DisplayChosenCard
                displayCard={displayCard}
                myTurn={myTurn}
            />

            {hideElement && <DisplayButtons 
                myTurn={myTurn}
                setOppLife={setOppLife}
                oppLife={oppLife}   
                setShowWonPopUp={setShowWonPopUp} 
                setGameResult={setGameResult}
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
                setHideElement={setHideElement}
            />
        </>
    );
}

export default BattlePage;