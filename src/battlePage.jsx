import { useState, useRef, useEffect } from "react";
import { DisplayHand } from "./components/battleComponets/DisplayHand.jsx";
import { DisplayChosenCard } from "./components/battleComponets/DisplayChosenCard.jsx";
import { WinPopUp } from "./components/battleComponets/WinPopUp.jsx";
import { DisplayButtons } from "./components/battleComponets/DisplayButtons.jsx";
import { socket } from "./socket.js"

//import { Deck } from "./classes/deck.js"

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
    const [feedbackDeck, setFeedbackDeck] = useState({"name":"Programming","id":"c197aab2-55ab-4724-9932-ff0d3638a5b7","cards":[{"id":"6a658d2f-7cc7-439b-b031-efe228e57c4f","answer":"test1","question":"test1","name":"test1"},{"id":"5982685b-3a96-4e0e-829e-d358d484f88d","answer":"test2","question":"test2","name":"test2"},{"id":"088c44d2-165c-4161-ab81-ee23dd9c7224","answer":"test3","question":"test3","name":"test3"},{"id":"ed39caa2-e563-4a74-ac07-25f3eb442823","answer":"test4","question":"test4","name":"test4asdsad"},{"id":"c130187c-3951-4c1d-9549-69e26204f5f9","answer":"test5","question":"test5","name":"test5"},{"id":"00b32047-0a5c-48a2-b33f-28662e5f2f7e","answer":"test6","question":"test6","name":"test6"},{"id":"4f52105a-63ce-4c45-943d-b34acf11b651","answer":"test7","question":"test7","name":"test7"},{"id":"d43f609e-4299-4b2e-8fc0-0d0641219c2a","answer":"test8","question":"test8","name":"test8"},{"id":"ff745cf4-e004-4c47-869c-3ce75351dddd","answer":"test9","question":"test9","name":"test9"},{"id":"895134f9-0acb-4507-a2f6-28632c82bc62","answer":"test10","question":"test10","name":"test10"}]});

    

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
            //setTurn(data.turn);
            turnRef.current = data.turn;
            //TODO: This won't trigger a re-render of turn above player lives for all clients (3 or above),
            //TODO: since there might not be a change in state below. Therefor atleast one client won't get updated, and at most 2 players will have the turn info updated.
            //console.log("Switchroles: ", data.turn);
            setHideElement(true);
            turnRef.current.current === socket.id ? setdisableCards(false) : setdisableCards(true);
            if (data.hand) setHand(data.hand);
        }

        function cardPickedFunc(data) {
            setShowAnswer(false);
            //console.log(data);
            setDisplayCard(data);
            //console.log("yep ref updated to:", turnRef.current);
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
                feedbackDeck={feedbackDeck}
                setFeedbackDeck={setFeedbackDeck}
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
