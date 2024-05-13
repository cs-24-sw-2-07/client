import { useNavigate } from "react-router-dom";

function WinPopUp(props) {
    const navigate = useNavigate();
    return (
        <>
            <div className={`modal fade ${(props.foundWinner == true) ? "show" : ""}`} id={"nameModal"} aria-hidden="true" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" style={{ display: (props.foundWinner == true) ? "block" : "none" }}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1>You {props.gameResult}</h1>
                        </div>
                        <div className='modal-body'>
                            {/* Feedback code */}
                            <p> Choose cards to add to feedback deck</p>
                            <ListFeedback
                                feedbackDeck={props.feedbackDeck}
                            />
                            
                            
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => { navigate("/"); }}>Go to front page</button>
                        </div>
                    </div>
                </div>
            </div>
            {(props.foundWinner == true) && (
                <div className="modal-backdrop fade show" />
            )}
        </>
    )
}
export { WinPopUp };


function ListFeedback(props) {

    
    return <div className="list-group" id="list-tab" key="list">
        {props.feedbackDeck.cards.map((card, index) =>
            <div className="row" key={index}>
                <div className="col-9">
                    <button type="button" className="list-group-item list-group-item-action" onClick={() => { }}>
                        {card.name}
                    </button>
                </div>
                <div className="col-3">
                    <button type="button" className="list-group-item list-group-item-action text-center" onClick={() => {  }}>
                        Save
                    </button>
                </div>
            </div>)
        }
    </div>
}
