function DisplayButtons(props){
    function answeredWrong(){
        
        
    }
    function answeredRight(){
        
    }

    if (props.myTurn == true){
        return(
            <div className="row p-2 justify-content-md-center">
                <div className="col-6 col-md-auto d-grid">
                    <label htmlFor="voteBtn">Was the answer correct or wrong?</label><br/>
                    <button type="button" className="btn btn-success p-3"id="voteBtn" onClick={()=>answeredRight()}>correct!</button>
                    <button type="button" className="btn btn-success p-3"id="voteBtn" onClick={()=>answeredWrong()}>wrong!</button>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="row p-2">
                <button type="button" className="btn btn-success"id="readyBtn" onClick={()=>console.log("Send websocket noti to other client")}>Done answering? click here</button>
            </div>
        )
    }
} 

export { DisplayButtons };