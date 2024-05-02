//import { useEffect } from "react";
//import { useNavigate } from "react-router-dom";

function DisplayHand(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                {props.handDeck.map((card, index) => (
                    <div className="col-4 d-grid py-1" key={index}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={props.disableCards}
                            onClick={() => {
                                props.setdisableCards(true);
                                props.drawNewCard(index);
                                props.setDisplayCard(props.myDeck.cards[props.hand[index]]);
                                props.setHideElement(true);
                            }}
                        >
                            Card Name: {card.name}
                            <br />
                            Question:{card.question}
                            <br />
                            Answer:{card.answer}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}


export { DisplayHand };
