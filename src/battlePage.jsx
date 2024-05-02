import { useState, useRef, useEffect } from "react";
import { DisplayLives } from "./components/battleComponets/DisplayLives.jsx";
import { DisplayHand } from "./components/battleComponets/DisplayHand.jsx";
import { DisplayChosenCard } from "./components/battleComponets/DisplayChosenCard.jsx";
import { WinPopUp } from "./components/battleComponets/WinPopUp.jsx";
import { DisplayButtons } from "./components/battleComponets/DisplayButtons.jsx";
import { socket } from "./socket.js"

function BattlePage(props) {
    let myDeck = useRef({});

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
        function playerInfoFunc(data){
            if(data.host){
                setMyTurn(true)
            }
            setHand(data.hand)
            makeHandDeck()
            myDeck = data.deck
        }

        function cardPickedFunc(data){
            setShowAnswer(false)
            setDisplayCard(data)
            setHideElement(true)
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

        socket.on("playerInfo",playerInfoFunc)
        socket.on("cardPicked",cardPickedFunc)
        socket.on("doneAnswering", doneAnsweringFunc)
        socket.on("foundWinner",foundWinnerFunc)
        socket.on("switchRoles", switchRoles)    

        return () => {   
            socket.off("playerInfo",playerInfoFunc)
            socket.off("cardPicked",cardPickedFunc)
            socket.off("doneAnswering", doneAnsweringFunc)
            socket.off("foundWinner",foundWinnerFunc)
            socket.off("switchRoles", switchRoles)         
        };
    },[])

    function makeHandDeck(){
        let newHandDeck = [];
        hand.forEach((i) => {
            newHandDeck.push(props.myDeck.cards[i]);
        });
        setHandDeck(newHandDeck);
    }

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
                showAnswer={showAnswer}
            />

            {hideElement && <DisplayButtons 
                myTurn={myTurn}   
                setShowAnswer={setShowAnswer}
                setHideElement={setHideElement}
            />
            }

            <DisplayHand
                hand={hand}
                myDeck={myDeck}
                handDeck={handDeck}
                disableCards={disableCards}
                setdisableCards={setdisableCards}
                setDisplayCard={setDisplayCard}
                //setHideElement={setHideElement}
            />
        </>
    );
}

export default BattlePage;