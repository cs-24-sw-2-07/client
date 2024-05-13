import { useState, useRef, useEffect } from "react";
import { DisplayHand } from "./components/battleComponets/DisplayHand.jsx";
import { DisplayChosenCard } from "./components/battleComponets/DisplayChosenCard.jsx";
import { WinPopUp } from "./components/battleComponets/WinPopUp.jsx";
import { DisplayButtons } from "./components/battleComponets/DisplayButtons.jsx";
import { socket } from "./socket.js"

function BattlePage(props) {
    const myDeck = useRef(props.data);
    const [hand, setHand] = useState([]);
    const [handDeck, setHandDeck] = useState([]);
    const [disableCards, setdisableCards] = useState(false);
    const turnRef = useRef(props.turn);
    const [displayCard, setDisplayCard] = useState("");
    const [hideElement, setHideElement] = useState(true);
    const [showWonPopUp, setShowWonPopUp] = useState(false);
    const [gameResult, setGameResult] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        if (turnRef.current.current !== socket.id) setdisableCards(true);

        setHand(props.data.hand);
        myDeck.current = props.data.deck;
        //console.log("Hand", props.data.hand, hand);
        //console.log(myDeck)
        //console.log("cardHand ", handDeck)
    }, [props.data])

    // Takes the index of cards in the hand, and makes it into an array of cards
    useEffect(() => {
        //console.log("inside makehand: ", myDeck)
        let newHandDeck = [];
        hand.forEach((i) => {
            newHandDeck.push(myDeck.current.cards[i]);
        });
        setHandDeck(newHandDeck);
    }, [hand])

    // Handle socket events from server
    useEffect(() => {

        function doneAnsweringFunc() {
            turnRef.current.current === socket.id ? setHideElement(false) : setHideElement(true);
            setShowAnswer(true);
        }
        function foundWinnerFunc(data) {
            setShowWonPopUp(true)
            setGameResult(data)
        }

        function switchRoles(data) {
            turnRef.current = data.turn;
            setHideElement(true);
            turnRef.current.current === socket.id ? setdisableCards(false) : setdisableCards(true);
            if (data.hand) setHand(data.hand);
        }

        function cardPickedFunc(data) {
            setShowAnswer(false);
            setDisplayCard(data);
            if (turnRef.current.next === socket.id) setHideElement(false);
        }

        socket.on("cardPicked", cardPickedFunc);
        socket.on("doneAnswering", doneAnsweringFunc)
        socket.on("foundWinner", foundWinnerFunc)
        socket.on("switchRoles", switchRoles)

        return () => {
            socket.off("cardPicked", cardPickedFunc);
            socket.off("doneAnswering", doneAnsweringFunc)
            socket.off("foundWinner", foundWinnerFunc)
            socket.off("switchRoles", switchRoles)
        };
    }, [])


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
                turn={turnRef.current}
                showAnswer={showAnswer}
                playerLives={props.playerLives}
                maxLives={props.maxLives}
            />

            {/* Button for then you are done answering and reviewing the answer */}
            {!hideElement && <DisplayButtons
                turn={turnRef.current}
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
