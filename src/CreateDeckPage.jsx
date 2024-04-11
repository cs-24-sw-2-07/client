import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";

const deckArray = [
  {
    name: "hej1",
    cards: [
      { Q: "hej1 question1", A: "hej1 answer1" },
      { Q: "hej1 question2", A: "hej1 answer2" },
      { Q: "hej1 question3", A: "hej1 answer3" },
      { Q: "hej1 question4", A: "hej1 answer4" }
    ]
  },
  {
    name: "hej2",
    cards: [
      { Q: "hej2 question1", A: "hej2 answer1" },
      { Q: "hej2 question2", A: "hej2 answer2" },
      { Q: "hej2 question3", A: "hej2 answer3" },
      { Q: "hej2 question4", A: "hej2 answer4" }
    ]
  },
  {
    name: "hej3",
    cards: [
      { Q: "hej3 question1", A: "hej3 answer1" },
      { Q: "hej3 question2", A: "hej3 answer2" },
      { Q: "hej3 question3", A: "hej3 answer3" },
      { Q: "hej3 question4", A: "hej3 answer4" }
    ]
  },
  {
    name: "hej4",
    cards: [
      { Q: "hej4 question1", A: "hej4 answer1" },
      { Q: "hej4 question2", A: "hej4 answer2" },
      { Q: "hej4 question3", A: "hej4 answer3" },
      { Q: "hej4 question4", A: "hej4 answer4" }
    ]
  },
  {
    name: "hej5",
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
  let [deckName, setDeckName]=useState(decks[0].name);
  let [deckIndex, setDeckIndex]=useState(0);
  let [cardIndex, setCardIndex]=useState(0); 
  let [questionHook, setQuestionHook]=useState(decks[0].cards[0].Q); 
  let [answerHook, setAnswerHook]=useState(decks[0].cards[0].A); 
  
  //save changes on edit. 
  useEffect(() => {
    setAnswerHook(decks[deckIndex].cards[cardIndex].A);
    setQuestionHook(decks[deckIndex].cards[cardIndex].Q);
  }, [cardIndex]);

  useEffect(() => {
    let updatedDeck = decks;
    updatedDeck[deckIndex].cards[cardIndex].Q=questionHook;
    setDecks(updatedDeck);
  }, [questionHook]);
  
  useEffect(() => {
    let updatedDeck = decks;
    updatedDeck[deckIndex].cards[cardIndex].A=answerHook;
    setDecks(updatedDeck);
  }, [answerHook]);

  useEffect(()=>{
    let updatedDeck = decks;
    updatedDeck[deckIndex].name=deckName;
    setDecks(updatedDeck)
  }, [deckName])

  //add new deck
  const addDeck = () => {
    const newDeck = { name: "New Deck", cards: [{Q:"",A:""}]};
    const updatedDecks = [...decks, newDeck];
    setDecks(updatedDecks);
  };

  //delete deck
  const deleteDeck = (deckIndex) => {
    if(decks.length === 1){
      const updatedDecks = [{ name: "New Deck", cards: [{Q:"",A:""}]}];
      setDecks(updatedDecks);
    }else{
      const updatedDecks = decks.filter((deck,index) => index !== deckIndex);
      setDecks(updatedDecks);
    }
  };

  //add new card
  const addNewCard=()=>{
    const newCard = {Q:"",A:""};
    const updatedDeck = [...decks];
    updatedDeck[deckIndex].cards.push(newCard);
    setDecks(updatedDeck);
  }

  //delete card
  const deleteCard = () => {
    const updatedDecks = [...decks];
    updatedDecks[deckIndex].cards.splice(cardIndex,1);
    setDecks(updatedDecks);
    setAnswerHook(decks[deckIndex].cards[cardIndex].A);
    setQuestionHook(decks[deckIndex].cards[cardIndex].Q);
  }
  
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
    setAnswerHook(decks[deckIndex].cards[cardIndex].A);
    setQuestionHook(decks[deckIndex].cards[cardIndex].Q);
  }

  function showDecks(){
    setHiddenDeck(false);
  }
    
  //renders list of cards and shows the individual card when clicked
  function ListCards(){
    return <>
      <label htmlFor="cards">Pick A Card:</label>
      <select className="form-select" id="cards" size="18">
        {// ? is if there are no cards, else it would chare
          decks[deckIndex]?.cards.map((_,index)=>
            <option className={(index===cardIndex)?"text-primary font-wieght-bold":""}key={index} selected={(index===cardIndex)?true:false} value={"card"+index} onClick={() => {setCardIndex(index);}}>{"Card "+index}</option>)
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
          <div className="col-9">
            <div className="row">
              <label htmlFor="question">Question:</label>
              <textarea type="text" placeholder="Place Your Question Here" id="question" rows="9" value={questionHook} onChange={(e) => {setQuestionHook(e.target.value);}}></textarea>
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
