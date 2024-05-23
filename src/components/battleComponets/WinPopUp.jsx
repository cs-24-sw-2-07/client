import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Deck } from "./../../classes/deck.js";
//import { Card } from "./../../classes/card.js"

function WinPopUp(props) {
    const navigate = useNavigate();
    const [saveCards, setSaveCards] = useState([]);

    function saveAndReturn() {
        if (saveCards.length > 0) {
            const oldDecks = JSON.parse(localStorage.getItem("userDeck"));
            const FeedbackDeck = new Deck({ name: props.feedbackDeck.name + " feedback", cards: saveCards });
            const allDecks = [...oldDecks, FeedbackDeck];
            localStorage.setItem("userDeck", JSON.stringify(allDecks));
        }

        navigate("/");
    }

    return (
        <>
            <div className={`modal fade ${(props.foundWinner == true) ? "show" : ""}`} id={"nameModal"} aria-hidden="true" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" style={{ display: (props.foundWinner == true) ? "block" : "none" }}>
                <div className='modal-dialog modal-dialog-scrollable modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1>You {props.gameResult}</h1>
                        </div>
                        <div className='modal-body'>
                            {/* Feedback code */}

                            <ListFeedback
                                saveCards={saveCards}
                                setSaveCards={setSaveCards}
                                feedbackDeck={props.feedbackDeck}
                                setFeedbackDeck={props.setFeedbackDeck}
                            />
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={saveAndReturn}>Go to front page</button>
                        </div>
                    </div>
                </div>
            </div>
            {(props.foundWinner == true) && (
                <div className="modal-backdrop fade show" />
            )}
        </>
    );
}
export { WinPopUp };


function ListFeedback(props) {
    function addCardToFeedback(index) {
        //console.log(index)
        let tempSaveCards = props.saveCards;
        tempSaveCards.push(props.feedbackDeck.cards[index]);

        props.setSaveCards(tempSaveCards);
        let tempFeedbackDeck = { ...props.feedbackDeck };
        tempFeedbackDeck.cards.splice(index, 1);
        props.setFeedbackDeck(tempFeedbackDeck);
    }

    if (props.feedbackDeck.cards == 0) {
        return;
    }
    return <>
        <h6 className="text-primary"> Pick incorrectly answerd cards to add to feedback deck with name: <span className="text-danger"> {props.feedbackDeck.name + " feedback"}</span></h6>

        <div className="list-group" id="list-tab" key="list">
            {props.feedbackDeck.cards.map((card, index) =>
                <div className="row" key={index}>
                    <div className="col-9">
                        <p className="list-group-item">
                            {card.name}
                        </p>
                    </div>
                    <div className="col-3">
                        <button type="button" className="list-group-item list-group-item-action text-center" onClick={() => { addCardToFeedback(index); }}>
                            Save
                        </button>
                    </div>
                </div>)
            }
        </div>
    </>;
}
