import { useState } from "react";
import { useNavigate } from "react-router-dom";

const deckArray = [
  {
    name: "hej1",
    id: 0,
    cards: [
      { Q: "hej1 question1", A: "hej1 answer1" },
      { Q: "hej1 question2", A: "hej1 answer2" },
      { Q: "hej1 question3", A: "hej1 answer3" },
      { Q: "hej1 question4", A: "hej1 answer4" }
    ]
  },
  {
    name: "hej2",
    id: 1,
    cards: [
      { Q: "hej2 question1", A: "hej2 answer1" },
      { Q: "hej2 question2", A: "hej2 answer2" },
      { Q: "hej2 question3", A: "hej2 answer3" },
      { Q: "hej2 question4", A: "hej2 answer4" }
    ]
  },
  {
    name: "hej3",
    id: 2,
    cards: [
      { Q: "hej3 question1", A: "hej3 answer1" },
      { Q: "hej3 question2", A: "hej3 answer2" },
      { Q: "hej3 question3", A: "hej3 answer3" },
      { Q: "hej3 question4", A: "hej3 answer4" }
    ]
  },
  {
    name: "hej4",
    id: 3,
    cards: [
      { Q: "hej4 question1", A: "hej4 answer1" },
      { Q: "hej4 question2", A: "hej4 answer2" },
      { Q: "hej4 question3", A: "hej4 answer3" },
      { Q: "hej4 question4", A: "hej4 answer4" }
    ]
  },
  {
    name: "hej5",
    id: 4,
    cards: [
      { Q: "hej5 question1", A: "hej5 answer1" },
      { Q: "hej5 question2", A: "hej5 answer2" },
      { Q: "hej5 question3", A: "hej5 answer3" },
      { Q: "hej5 question4", A: "hej5 answer4" }
    ]
  }
];

function CreateDeckPage(){ 
  const navigate = useNavigate();
  function navigateTo(path){
    navigate(path);
  }
  
  //Makes hooks in use
  let [hiddenDeck, setHiddenDeck]=useState(false);
  let [decks, setDecks]=useState(deckArray);
  let [deckName, setDeckName]=useState("DeckName");
  let [deckIndex, setDeckIndex]=useState();
  let [cardIndex, setcardIndex]=useState("1"); 

  //add new deck
  const addDeck = () => {
    const newDeck = { name: "New Deck", id: decks.length + 1 };
    const updatedDecks = [...decks, newDeck];
    setDecks(updatedDecks);
  };

  //delete deck
  const deleteDeck = (deleteIndex) => {
    const updatedDecks = decks.filter((deck, index) => deck.id !== deleteIndex);
    setDecks(updatedDecks);
  };

  
  //sort deck
  const sortDeck = (sortType) => {
    // Works, but do not 100% know why
    let updatedDecks = decks.filter(() => true);
    if(sortType === "A-Z"){
      updatedDecks.sort((a, b) => {
        // Convert names to lowercase for case-insensitive sorting
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1; // Name A comes before Name B
        }
        if (nameA > nameB) {
          return 1; // Name A comes after Name B
        }
        return 0; // Names are equal
      });
    }
    else if (sortType === "Z-A"){
      updatedDecks.sort((a, b) => {
        // Convert names to lowercase for case-insensitive sorting
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA > nameB) {
          return -1; // Name B comes before Name A
        }
        if (nameA < nameB) {
          return 1; // Name B comes after Name A
        }
        return 0; // Names are equal
      });
    }
    setDecks(updatedDecks);
  };
  
  //Renders list of decks on page
  function DeckList(props){
    return <>
      <div className="list-group" id="list-tab" key="list">
        {props.decks.map((deck) =>
          <>
            <div className="row">
              <div className="col-10">
                <button className="list-group-item list-group-item-action" id={"Deck:"+deck.id} onClick={()=>{showCardEditor(deck.id)}}>
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

  function showCardEditor(deckID){
    setHiddenDeck(true);
    let indexOfDeck = decks.findIndex(deck => deck.id === deckID);
    setDeckName(decks[indexOfDeck].name)
    setDeckIndex(indexOfDeck)    
  }

  function showDecks(){
    setHiddenDeck(false);
  }
  
  //renders list of cards and shows the individual card when clicked
  function ListCards(){
    // decks[deckIndex].cards.length
    return <>
      <label htmlFor="cards">Pick A Card</label>
      <select className="form-select" id="cards" size="18" >
        {decks[deckIndex].cards.map((card,index)=>
          <>
            <option selected={(index===cardIndex)?true:false} value={"card"+index} onClick={() => {setcardIndex(index);console.log(cardIndex)}}>{"Card "+index}</option>
          </>)
        }
      </select>
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
          <DeckList decks={decks} />
        </div>        
      </div>
      
      {/* DeckEditor */}
      <div className="container" hidden={!hiddenDeck}>
        <div className="row">
          <div className="col-5 p-3"><h1>Deck Editor</h1></div>
          <div className="col-4"></div>
          <div className="col-3 d-grid gap-2 p-3">
            <button type="button" className="btn btn-primary" onClick={()=>{showDecks()}}>Back To Decks</button>
          </div>
        </div>
        <div className="row">
          {/*<div className="col-4"><h2 htmlFor="deckName">Deck Name:</h2></div>*/}
          <div className="col-12">
            <label htmlFor="deckName" className="p-3 form-control-lg">Deck Name: </label>
            <input type="text" id="deckName" className="form-control form-control-lg" placeholder="Set Deck Name" value={deckName} onChange={(e) => {setDeckName(e.target.value);}}></input>
          </div>
        </div>
        <div className="row p-3"></div>
        <div className="row">
          <div className="col-3">
            <ListCards/>
          </div>
        </div>
          
        <div className="row p-3"></div>
        <div className="row">
          <div className="col-4 d-grid ">
            <button type="button" className="btn btn-primary" onClick={()=>{console.log("du har lavet et kort")}}>Add Now Card</button>
          </div>
          <div className="col-5"></div>
          <div className="col-3 d-grid">
            <button type="button" className="btn btn-primary " style={{ fontSize: "50px" }} onClick={()=>{showDecks()}}>💾</button>
          </div>
        </div>
      </div>

    </>
  );
}

export default CreateDeckPage;
