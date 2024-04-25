
import { useNavigate } from "react-router-dom";

function WinPopUp(props){
    const navigate = useNavigate();
    return(
        <>
            <div className={`modal fade ${(props.foundWinner == true) ? "show" : ""}`} id={"nameModal"} aria-hidden="true" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" style={{display: (props.foundWinner == true) ? "block" : "none"}}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1>You {props.gameResult}</h1>
                        </div>
                        {/*<div className='modal-body'>
                            <h3 className="text-primary h3">YOU WON OR LOST; WHO KNOWS?</h3>
                        </div>*/}
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" 
                                onClick={() => {navigate("/");console.log("gå til start side eller feedback")}}>Go to front page</button>
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