function DisplayChosenCard(props) {
 
  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          <h3>Question:</h3> 
          <textarea type="text" disabled rows="8" value={(props.myTurn)?props.displayCard.question:""}></textarea>
        </div>
            
        <div className="row">
          <h3>Answer:</h3> 
          <textarea type="text" disabled rows="8" value={(props.myTurn)?props.displayCard.answer:""}></textarea>
        </div>

        <div className="row">
          <label htmlFor="readyBtn">Done answering?</label>
          <button type="button" className="btn btn-success"id="readyBtn" onClick={()=>console.log("hej")}>Yes!</button>
        </div>

        <div className="row">
          <label htmlFor="voteBtn">Was the answer correct or wrong?</label>
          <button type="button" className="btn btn-success"id="voteBtn" onClick={()=>console.log("korrekt")}>correct!</button>
          <button type="button" className="btn btn-success"id="voteBtn" onClick={()=>console.log("forkert")}>wrong!</button>
        </div>
      </div>
      <div className="col-6">
        <p>Make whiteboard</p>
      </div>
      
    </div>
  );
}


export {DisplayChosenCard};