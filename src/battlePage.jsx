import { useState, useRef, useEffect } from "react";
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
    let [turn, setTurn] = useState(props.turn);
    let [displayCard, setDisplayCard] = useState("");
    let [hideElement, setHideElement] = useState(true);
    let [showWonPopUp, setShowWonPopUp] = useState(false);
    let [gameResult, setGameResult] = useState("");
    let [showAnswer, setShowAnswer] = useState(false);

    useEffect(()=>{
        console.log("GOT DECK")
        if(turn.current !== socket.id) setdisableCards(true);

        setHand(props.data.hand)
        myDeck.current = props.data.deck
        //makeHandDeck(/*props.data.hand*/)
        console.log("Hand",props.data.hand,hand)
        console.log(myDeck)
        console.log("cardHand ", handDeck)
    },[props.data])

    // Takes the index of cards in the hand, and makes it into an array of cards
    useEffect(()=>{
        console.log("inside makehand: ",myDeck)
        let newHandDeck = [];
        hand.forEach((i) => {
            newHandDeck.push(myDeck.current.cards[i]);
        });
        setHandDeck(newHandDeck);
    },[hand])

    // Handle socket events from server
    useEffect(()=>{
        function cardPickedFunc(data){
            setShowAnswer(false);
            console.log(data);
            setDisplayCard(data);
            console.log("yep", turn);
            if(turn.next === socket.id) setHideElement(false);
        }
        function doneAnsweringFunc(){
            turn.current === socket.id ? setHideElement(false) : setHideElement(true);
            setShowAnswer(true);
        }
        function foundWinnerFunc(data){
            setShowWonPopUp(true)
            setGameResult(data)
        }

        function switchRoles(data){
            // console.log("turn: ", data.turn);
            // setTurn(data.turn);
            // setHideElement(true)
            // if(data.turn.current !== socket.id){
            //     setShowAnswer(false)
            //     setdisableCards(true)
            //     setHand(data.hand) // PROBLEM HERE
            // } else {
            //     setdisableCards(false)
            // }
            setTurn(data.turn);
            setHideElement(true);
            data.turn.current === socket.id ? setdisableCards(false) : setdisableCards(true);
            if(data.hand) setHand(data.hand);
        }

        socket.on("cardPicked", cardPickedFunc)
        socket.on("doneAnswering", doneAnsweringFunc)
        socket.on("foundWinner", foundWinnerFunc)
        socket.on("switchRoles", switchRoles)

        return () => {
            socket.off("cardPicked", cardPickedFunc)
            socket.off("doneAnswering", doneAnsweringFunc)
            socket.off("foundWinner", foundWinnerFunc)
            socket.off("switchRoles", switchRoles)
        };
    },[])

    return (
        <>
            {/* Modal for when a winner have been found */}
            <WinPopUp
                foundWinner={showWonPopUp}
                gameResult={gameResult}
            />

            {/* Displays the card that are played */}
            <DisplayChosenCard
                displayCard={displayCard}
                turn={turn}
                showAnswer={showAnswer}
                playerLives={props.playerLives}
            />

            {/* Button for then you are done answering and reviewing the answer */}
            {!hideElement && <DisplayButtons
                turn={turn}
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
