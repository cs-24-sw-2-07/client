function DisplayChosenCard(props) {
 
  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          <h3>Question:</h3> 
          <textarea type="text" disabled="true" rows="8">{"hej"}</textarea>
        </div>
            
        <div className="row">
          <h3>Answer:</h3> 
          <textarea type="text" disabled="true" rows="8">{"hej"}</textarea>
        </div>
      </div>
      <div className="col-6">
        <p>Make whiteboard</p>
      </div>
    </div>
  );
}


export {DisplayChosenCard};