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
  const deckArray = [{name:"hej1", id: 0},{name:"hej2", id: 1},{name:"hej3", id: 2},{name:"hej4", id: 3},{name:"hej5", id: 4}]

  let [decks, setDecks]=useState(deckArray);

  //add new deck
  const addDeck = () => {
    const newDeck = { name: "New Deck", id: decks.length + 1 };
    const updatedDecks = [...decks, newDeck];
    setDecks(updatedDecks);
  };

  //delete deck
  const deleteDeck = (deleteIndex) => {
    const updatedDecks = decks.filter((deck, index) => index !== deleteIndex);
    setDecks(updatedDecks);
  };

  function DeckList(props){
    return <>
      <div className="list-group" id="list-tab" key="list">
        {props.decks.map((deck) =>
          <>
            <div className="row">
              <div className="col-10">
                <button className="list-group-item list-group-item-action" id={"Deck:"+deck.id} onClick={()=>{console.log(deck.name)}}>
                  {deck.name+deck.id}
                </button>
              </div>
              <div className="col-2">
                <button className="list-group-item list-group-item-action" id={"DelDeck:"+deck.id} onClick={()=>{deleteDeck(deck.id)}}>
                  Delete
                </button>
              </div>
            </div>
          </>)
        }
      </div>
    </>
  }

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
          {/*<button type="button" className="btn btn-primary" onClick={()=>{setDecks(()=>{[decks,{name:"New Deck", key: 6}]}); console.log(decks)}}>Create New Deck</button>*/}
          <button type="button" className="btn btn-primary" onClick={()=>{addDeck()}}>Create New Deck</button>
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

export default CreateDeckPage;
