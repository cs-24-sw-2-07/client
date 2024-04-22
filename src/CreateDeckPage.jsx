import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { Deck } from "./classes/deck"
import { Card } from "./classes/card"

//check for decks in localstorge and retrive if yes
let startDeck;
if(localStorage.getItem("userDeck") !== null){
  startDeck = JSON.parse(localStorage.getItem("userDeck"));
} else{
  startDeck=[new Deck({name:"New Deck"})]
}

function CreateDeckPage(){ 
  const navigate = useNavigate();
  function navigateTo(path){
    navigate(path);
  }
  
  //Makes hooks in use
  let [hiddenDeck, setHiddenDeck]=useState(false);
  let [decks, setDecks]=useState(startDeck);
  let [deckName, setDeckName]=useState(decks[0].name);
  let [cardName, setCardName]=useState(decks[0].cards[0].name);
  let [deckIndex, setDeckIndex]=useState(0);
  let [cardIndex, setCardIndex]=useState(0); 
  let [questionHook, setQuestionHook]=useState(decks[0].cards[0].question); 
  let [answerHook, setAnswerHook]=useState(decks[0].cards[0].answer); 
  
  //save changes on edit. 
  //updates everytime cardIndex or deckIndex changes
  useEffect(() => {
    setAnswerHook(decks[deckIndex].cards[cardIndex].answer);
    setQuestionHook(decks[deckIndex].cards[cardIndex].question);
    setCardName(decks[deckIndex].cards[cardIndex].name);
  }, [cardIndex]);

  //updates page everytime a question, answer, cardname or deckname is edited
  useEffect(() => {
    let updatedDeck = decks;
    updatedDeck[deckIndex].cards[cardIndex].question=questionHook;
    updatedDeck[deckIndex].cards[cardIndex].answer=answerHook;
    updatedDeck[deckIndex].name=deckName;
    updatedDeck[deckIndex].cards[cardIndex].name=cardName;
    setDecks(updatedDeck);
    saveDecks();
  }, [questionHook, answerHook, deckName, cardName]);

  //add new deck
  const addDeck = () => {
    const updatedDecks = [...decks, new Deck({name:"New Deck"})];
    setDecks(updatedDecks);
    saveDecks();
  };

  //delete deck
  const deleteDeck = (deckIndex) => {
    if(decks.length === 1){
      const updatedDecks = [new Deck({name:"New Deck"})];
      setDecks(updatedDecks);
    }else{
      const updatedDecks = decks.filter((_,index) => index !== deckIndex);
      setDecks(updatedDecks);
    }
  };

  //add new card
  const addNewCard=()=>{
    const updatedDeck = [...decks];
    updatedDeck[deckIndex].cards.push(new Card({name:""}));
    setDecks(updatedDeck);
  }

  //delete card
  const deleteCard = () => {
    if (decks[deckIndex].cards.length!==1){  
      let updatedDecks = [...decks];
      updatedDecks[deckIndex].cards.splice(cardIndex,1);
      setCardIndex(0)
      setDecks(updatedDecks);
      setAnswerHook(decks[deckIndex].cards[cardIndex].answer);
      setQuestionHook(decks[deckIndex].cards[cardIndex].question);  
      setCardName(decks[deckIndex].cards[cardIndex].name);  
    }
  }
  
  const sortDeck = (sortType) => {
    const updatedDecks = [...decks];
    updatedDecks.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortType === "A-Z" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setDecks(updatedDecks);
  };
  
  //Renders list of decks on page
  function DeckList(props){
    return <div className="list-group" id="list-tab" key="list">
      {props.decks.map((deck, index) =>
        <div className="row" key={index}>
          <div className="col-10">
            <button type="button" className="list-group-item list-group-item-action" onClick={()=>{showCardEditor(index)}}>
              {deck.name}
            </button>
          </div>
          <div className="col-2">
            <button type="button" className="list-group-item list-group-item-action text-center" onClick={()=>{deleteDeck(index)}}>
                  Delete
            </button>
          </div>
        </div>)
      }
    </div>
  }

  function showCardEditor(deckIndex){
    setHiddenDeck(true);
    setDeckName(decks[deckIndex].name)
    setDeckIndex(deckIndex)   
    setCardIndex(0);
    setAnswerHook(decks[deckIndex].cards[cardIndex].answer);
    setQuestionHook(decks[deckIndex].cards[cardIndex].question);
    setCardName(decks[deckIndex].cards[cardIndex].name);
  }

  function showDecks(){
    setHiddenDeck(false);
  }
    
  //renders list of cards and shows the individual card when clicked
  function ListCards(){
    return <>
      <label htmlFor="cards">Pick A Card:</label>
      <select className="form-select" id="cards" size="18">
        {// ? is if there are no cards
          decks[deckIndex]?.cards.map((_,index)=>
            <option className={(index===cardIndex)?"text-primary font-wieght-bold":""}key={index} selected={(index===cardIndex)?true:false} onClick={() => {setCardIndex(index);}}>{"Card "+[index+1]+": "+decks[deckIndex].cards[index].name}</option>)
        }
      </select>
    </>
  }
  
  //save to local storage
  function saveDecks(){
    const deckString = JSON.stringify(decks);
    localStorage.setItem("userDeck",deckString);
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
          <div className="col-9">
            <div className="row">
              <label htmlFor="question">Question:</label>
              <textarea type="text" placeholder="Place Your Question Here" id="question" rows="9" value={questionHook} onChange={(e) => {setQuestionHook(e.target.value)}}></textarea>
            </div>
            <div className="row">
              <label htmlFor="question">Question:</label>
              <textarea type="text" placeholder="Place Your Question Here" id="question" rows="9" value={questionHook} onChange={(e) => {setQuestionHook(e.target.value)}}></textarea>
            </div>
            <div className="row">
              <label htmlFor="answer">Answer:</label>
              <textarea type="text" placeholder="Place Your Answer Here" id="answer" rows="9" value={answerHook} onChange={(e) => {setAnswerHook(e.target.value);}}></textarea>
            </div>
          </div>
        </div>
        <div className="row p-3"></div>
        <div className="row">
          <div className="col-2 d-grid ">
            <button type="button" className="btn btn-primary" onClick={()=>{addNewCard()}}>Add New Card</button>
          </div>
          <div className="col-2 d-grid ">
            <button type="button" className="btn btn-primary" onClick={()=>{deleteCard()}}>Delete Card</button>
          </div>
        </div>
      </div>
    </>
  );
}


export default CreateDeckPage;
