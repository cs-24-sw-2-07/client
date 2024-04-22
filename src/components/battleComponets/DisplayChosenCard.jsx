function DisplayChosenCard(props) {

  function DisplayElement(){
    if (props.myTurn == true){
      return <>
      <div className="row">
          <label htmlFor="voteBtn">Was the answer correct or wrong?</label>
          <button type="button" className="btn btn-success"id="voteBtn" onClick={()=>console.log("korrekt")}>correct!</button>
          <button type="button" className="btn btn-success"id="voteBtn" onClick={()=>console.log("forkert")}>wrong!</button>
        </div>
        console.log("jeg er true");
        </>
    }
    else {
      return <>
        <div className="row">
          <label htmlFor="readyBtn">Done answering?</label>
          <button type="button" className="btn btn-success"id="readyBtn" onClick={()=>console.log("hej")}>Yes!</button>
        </div>
        console.log("jeg er false");
      </>
    
    }
  }  
 
  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          <h3>Question:</h3> 
          <textarea type="text" disabled rows="8" value={props.displayCard.question}></textarea>
        </div>
            
        <div className="row">
          <h3>Answer:</h3> 
          <textarea type="text" disabled rows="8" hidden={(props.hideElement)} value={props.displayCard.answer}></textarea>
        </div>

        <DisplayElement/>
 
      </div>
      <div className="col-6">
        <p>Make whiteboard</p>
      </div>
      
    </div>
  );
}


export {DisplayChosenCard};