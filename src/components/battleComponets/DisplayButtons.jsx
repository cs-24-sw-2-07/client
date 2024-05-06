import { socket } from "../../socket.js"

function DisplayButtons(props){
    if (props.myTurn == true){
        return(
            <div className="row p-2 justify-content-md-center">
                <div className="col-6 col-md-auto d-grid">
                    <label htmlFor="voteBtn">Was the answer correct or wrong?</label><br/>
                    <button type="button" className="btn btn-success p-3" id="voteBtn" onClick={()=>{socket.emit("answerReview", {value: true}); props.setHideElement(true)}}>correct!</button>
                    <button type="button" className="btn btn-success p-3" id="voteBtn" onClick={()=>{socket.emit("answerReview", {value: false}); props.setHideElement(true)}}>wrong!</button>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="row p-2">
                <button type="button" className="btn btn-success" id="readyBtn" onClick={()=>{socket.emit("doneAnswering"); props.setShowAnswer(true); props.setHideElement(true)}}>Done answering? click here</button>
            </div>
        )
    }
} 
export { DisplayButtons };