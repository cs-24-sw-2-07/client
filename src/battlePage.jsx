import { useState, useRef, useEffect } from "react";
import { DisplayLives } from "./components/battleComponets/DisplayLives.jsx";
import { DisplayHand } from "./components/battleComponets/DisplayHand.jsx";
import { DisplayChosenCard } from "./components/battleComponets/DisplayChosenCard.jsx";
import { WinPopUp } from "./components/battleComponets/WinPopUp.jsx";
import { DisplayButtons } from "./components/battleComponets/DisplayButtons.jsx";
import { socket } from "./socket.js"

function BattlePage(props) {
    let myDeck = useRef(props.data);

    let [hand, setHand] = useState([]);
    let [handDeck, setHandDeck] = useState([]);
    let [disableCards, setdisableCards] = useState(false);
    let [myTurn, setMyTurn] = useState(false);
    let [displayCard, setDisplayCard] = useState("");
    let [hideElement, setHideElement] = useState(true);
    let [showWonPopUp, setShowWonPopUp] = useState(false);
    let [gameResult, setGameResult] = useState("");
    let [showAnswer, setShowAnswer] = useState(false);

    useEffect(()=>{
        console.log("GOT DECK")
        if(props.data.host){
            setMyTurn(true)
        }else{
            setdisableCards(true)
        }
        setHand(props.data.hand)
        myDeck.current = props.data.deck
        makeHandDeck(/*props.data.hand*/)
        console.log("Hand",props.data.hand,hand)
        console.log(myDeck)
        console.log("cardHand ", handDeck)
    },[props.data])
    
    // Handle socket events from server
    useEffect(()=>{
        function cardPickedFunc(data){
            setShowAnswer(false)
            console.log(data)
            setDisplayCard(data)
            setHideElement(false)
        }
        function doneAnsweringFunc(){
            setHideElement(false)
            setShowAnswer(true)
        }
        function foundWinnerFunc(data){
            setShowWonPopUp(true)
            setGameResult(data)
        }
        
        function switchRoles(data){
            setMyTurn(!myTurn)
            console.log("turn: ",myTurn);
            setHideElement(true)
            if(myTurn){
                setdisableCards(false)
            }else{
                setShowAnswer(false)
                setdisableCards(true)
                setHand(data)
                makeHandDeck()
            }
        }

        socket.on("cardPicked",cardPickedFunc)
        socket.on("doneAnswering", doneAnsweringFunc)
        socket.on("foundWinner",foundWinnerFunc)
        socket.on("switchRoles", switchRoles)    

        return () => {   
            socket.off("cardPicked",cardPickedFunc)
            socket.off("doneAnswering", doneAnsweringFunc)
            socket.off("foundWinner",foundWinnerFunc)
            socket.off("switchRoles", switchRoles)         
        };
    },[])

    // Takes the index of cards in the hand, and makes it into an array of cards
    function makeHandDeck(){
        console.log("inside makehand: ",myDeck)
        let newHandDeck = [];
        hand.forEach((i) => {
            newHandDeck.push(myDeck.current.cards[i]);
        });
        setHandDeck(newHandDeck);
    }

    return (
        <>
            {/* Modal for when a winner have been found */}
            <WinPopUp
                foundWinner={showWonPopUp}
                gameResult={gameResult}
            />

            {/* Displays the life amounts of the players in the top */}
            <DisplayLives
                maxLives={props.maxLives}
                myTurn={myTurn}
            />
      
            {/* Displays the card that are played */}
            <DisplayChosenCard
                displayCard={displayCard}
                myTurn={myTurn}
                showAnswer={showAnswer}
            />

            {/* Button for then you are done answering and reviewing the answer */}
            {!hideElement && <DisplayButtons 
                myTurn={myTurn}   
                setShowAnswer={setShowAnswer}
                setHideElement={setHideElement}
            />
            }

            {/* Displays all of the cards that you have on the hand */}
            <DisplayHand
                hand={hand}
                myDeck={myDeck.current}
                handDeck={handDeck}
                disableCards={disableCards}
                setdisableCards={setdisableCards}
                setDisplayCard={setDisplayCard}
                //setHideElement={setHideElement}
            />
        </>
    );
}

export { BattlePage };
