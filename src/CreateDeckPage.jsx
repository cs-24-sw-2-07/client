import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateDeckPage(){ 
  const navigate = useNavigate();
  function navigateTo(path){
    navigate(path);
  }
  
  let [hiddenDeck, setHiddenDeck]=useState(false);

  /*setHiddenDeck((hiddenDeck)=>{
      if(hiddenDeck == true)
        hiddenDeck = false;
      else if(hiddenDeck == false)
        hiddenDeck = true;
    })*/

  //Renders list of decks on page
  const deckArray = [{name:"hej"},{name:"hej2"},{name:"hej3"},{name:"hej4"},{name:"hej5"}]

  let [decks, setDecks]=useState(deckArray);

  
  
  return (
    <>
      {/* DeckPicker */}
      <div className="container" hidden={hiddenDeck}>
        <div className="row">
          <div className="col-2 p-3"><h1>Decks</h1></div>
          <div className="col-7"></div>
          <div className="col-3 d-grid gap-2 p-3">
            <button type="button" className="btn btn-primary" onClick={()=>{navigateTo("/");}}>Back</button>
          </div>
        </div>
        <div className="row p-4"></div>
        <div className="row">
          <button type="button" className="btn btn-primary" onClick={()=>{setDecks(()=>{[...decks,{name:"New Deck"}]}); console.log(decks)}}>Create New Deck</button>
        </div>
        <div className="row p-3"></div>
        <div className="row">
          <DeckList decks={decks} />
        </div>
        
        
      </div>
      
      {/* DeckEditor */}
      <div className="container" hidden={!hiddenDeck}>
        <div className="row">
          <div className="text-center p-5"><h1>Edit</h1></div>
        </div>
      </div>

    </>
  );
}
function DeckList(props){
    const listDecks = props.decks.map((deck) =>
      <>
        <button className="list-group-item list-group-item-action" id={deck.name} onClick={()=>{console.log(deck.name)}}>
          {deck.name}
        </button>
      </>
    );
    return <>
      <div className="list-group" id="list-tab">
        {listDecks}
      </div>
    </>
  }



export default CreateDeckPage;

/*
<ul className="list-group">
            <li className="list-group-item active" aria-current="true" type="button" onClick={()=>{console.log("hej")}}>An active item</li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item active">A fourth item</li>
            <li className="list-group-item">And a fifth one</li>
          </ul>*/