import { useState, useEffect  } from "react";
import { Deck } from "./classes/deck"
import { Card } from "./classes/card"

// Components in use
import { ListCards } from "./components/deckbuilderComponets/ListCards.jsx"
import { DeckPicker } from "./components/deckbuilderComponets/DeckPicker2.jsx"


function CreateDeckPage(){ 

  let startDeck;
  
  useEffect(() => {
    //check for decks in localstorge and retrive if yes
    if(localStorage.getItem("userDeck") !== null){
      startDeck = JSON.parse(localStorage.getItem("userDeck"));
    } else{
      startDeck=[new Deck({name:"New Deck"})]
    }
  }, []);
  
  
  //Makes hooks in use
  let [hiddenDeck, setHiddenDeck]=useState(false);
  let [decks, setDecks]=useState(startDeck);
  let [deckName, setDeckName]=useState(decks[0].name);
  let [cardName, setCardName]=useState(decks[0].cards[0].name);
  let [deckIndex, setDeckIndex]=useState(0);
  let [cardIndex, setCardIndex]=useState(0); 
  let [questionHook, setQuestionHook]=useState(decks[0].cards[0].question); 
  let [answerHook, setAnswerHook]=useState(decks[0].cards[0].answer); 
  console.log(decks)
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

  function showDecks(){
    setHiddenDeck(false);
  }
    
  //save to local storage


  function showCardEditor(deckIndex, cardIndex){
    setHiddenDeck(true);
    setDeckName(decks[2].name)
    setDeckIndex(2)   
    setCardIndex(0);
    setAnswerHook(decks[2].cards[0].answer);
    setQuestionHook(decks[2].cards[0].question);
    setCardName(decks[2].cards[0].name);
  }
  
  function saveDecks(){
    const deckString = JSON.stringify(decks);
    localStorage.setItem("userDeck",deckString);
  }

  return (
    <>
      {/* DeckPicker */}
      <DeckPicker 
        decks={decks} 
        cardIndex={cardIndex} 
        deckIndex={deckIndex} 
        setCardIndex={setCardIndex} 
        setDecks={setDecks} 
        saveDecks={saveDecks}
        hiddenDeck={hiddenDeck}
        showCardEditor={showCardEditor}/>
      
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
            <ListCards decks={decks} cardIndex={cardIndex} deckIndex={deckIndex} setCardIndex={setCardIndex()}/>
          </div>
          <div className="col-9">
            <div className="row">
              <label htmlFor="cardName">Card Name: </label>
              <input type="text" id="cardName" className="form-control form-control" placeholder="Set Card Name" value={cardName} onChange={(e) => {setCardName(e.target.value)}}></input>
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
