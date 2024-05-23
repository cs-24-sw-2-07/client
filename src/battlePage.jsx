import { useState, useRef, useEffect } from "react";
import { DisplayHand } from "./components/battleComponets/DisplayHand.jsx";
import { DisplayChosenCard } from "./components/battleComponets/DisplayChosenCard.jsx";
import { WinPopUp } from "./components/battleComponets/WinPopUp.jsx";
import { DisplayButtons } from "./components/battleComponets/DisplayButtons.jsx";
import { socket } from "./socket.js"
import { Deck } from "./classes/deck.js"

function BattlePage(props) {
    const myDeck = useRef(props.data.deck);
    const [hand, setHand] = useState(props.data.hand);
    const [handDeck, setHandDeck] = useState([]);
    const turnRef = useRef(props.turn);
    const [disableCards, setdisableCards] = useState(turnRef.current.current !== socket.id);
    const displayCard = useRef("");
    const [hideElement, setHideElement] = useState(true);
    const [showWonPopUp, setShowWonPopUp] = useState(false);
    const [gameResult, setGameResult] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [feedbackDeck, setFeedbackDeck] = useState(new Deck({ name: myDeck.current.name, cards: [] }));

    // Takes the index of cards in the hand, and makes it into an array of cards
    useEffect(() => {
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
            displayCard.current = data;
            setShowAnswer(false);
            console.log("disCard",displayCard.current)
            console.log(displayCard.current.name)
            console.log(data.name)
            if (turnRef.current.next === socket.id) setHideElement(false);
        }

        function wrongAnsweredFunc() {
            let tempDeck = { ...feedbackDeck };
            console.log("dis card", displayCard.current)
            tempDeck.cards.push(displayCard.current)
            console.log("temp", tempDeck)

            setFeedbackDeck(tempDeck)
            console.log("feedback",feedbackDeck)
        }

        socket.on("cardPicked", cardPickedFunc);
        socket.on("wrongAnswered", wrongAnsweredFunc);
        socket.on("doneAnswering", doneAnsweringFunc)
        socket.on("foundWinner", foundWinnerFunc)
        socket.on("switchRoles", switchRoles)

        return () => {
            socket.off("cardPicked", cardPickedFunc);
            socket.off("doneAnswering", doneAnsweringFunc)
            socket.off("foundWinner", foundWinnerFunc)
            socket.off("switchRoles", switchRoles)
            socket.off("wrongAnswered", wrongAnsweredFunc)
        };
    }, [])


    return (
        <>
            {/* Modal for when a winner have been found */}
            <WinPopUp
                foundWinner={showWonPopUp}
                gameResult={gameResult}
                feedbackDeck={feedbackDeck}
                setFeedbackDeck={setFeedbackDeck}
            />

            {/* Displays the card that are played */}
            <DisplayChosenCard
                displayCard={displayCard.current}
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
                displayCard={displayCard}
            //setHideElement={setHideElement}
            />
        </>
    );
}

export { BattlePage };
