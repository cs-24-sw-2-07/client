//Renders list of decks on page
import DeckList from "./DeckList.jsx"
import { useNavigate } from "react-router-dom";
import { Deck } from "./../../classes/deck.js"

function DeckPicker(props){
  const navigate = useNavigate();
  function navigateTo(path){
    navigate(path);
  }

  const sortDeck = (sortType) => {
    const updatedDecks = [...props.decks];
    updatedDecks.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortType === "A-Z" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    props.setDecks(updatedDecks);
  };

  //add new deck
  const addDeck = () => {
    const updatedDecks = [...props.decks, new Deck({name:"New Deck"})];
    props.setDecks(updatedDecks);
    props.saveDecks(updatedDecks);
  };

  //delete deck
  const deleteDeck = (deckIndex) => {
    if(props.decks.length === 1){
      const updatedDecks = [new Deck({name:"New Deck"})];
      props.setDecks(updatedDecks);
      props.saveDecks(updatedDecks);
    }else{
      const updatedDecks = props.decks.filter((_,index) => index !== deckIndex);
      props.setDecks(updatedDecks);
      props.saveDecks(updatedDecks);
    }
  };

  return <>{/* DeckPicker */}
    <div className="container" hidden={props.hiddenDeck}>
      <div className="row">
        <div className="col-2 p-3"><h1>Decks</h1></div>
        <div className="col-7"></div>
        <div className="col-3 d-grid gap-2 p-3">
          <button type="button" className="btn btn-primary" onClick={()=>{navigateTo("/");}}>Back</button>
        </div>
      </div>
      <div className="row p-4"></div>
      <div className="row">
        <button type="button" className="btn btn-primary" onClick={()=>{addDeck()}}>Create New Deck</button>
      </div>
      <div className="row p-3">
        <div className="col-6 d-grid">
          <button type="button" className="btn btn-secondary" onClick={()=>{sortDeck("A-Z")}}>Sort A-Z</button>
        </div>
        <div className="col-6 d-grid">
          <button type="button" className="btn btn-secondary" onClick={()=>{sortDeck("Z-A")}}>Sort Z-A</button>
        </div>
      </div>
      <div className="row p-3"></div>
      <div className="row">
        <DeckList
          decks={props.decks}
          deleteDeck={deleteDeck}
          showCardEditor={props.showCardEditor}
          deckIndex={props.deckIndex}/>
      </div>
    </div>
  </>
}

export {DeckPicker};
