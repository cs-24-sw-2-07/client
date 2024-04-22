import { useEffect } from "react";
//import { useNavigate } from "react-router-dom";

function DisplayHand(props) {
  useEffect(()=>{
    let newHandDeck=[];
    props.hand.forEach(i => {
      newHandDeck.push(props.myDeck.cards[i]);
    });
    props.setHandDeck(newHandDeck)
  },[props.hand])
  
  return (
    <div className="row">
      <DisplayCardsInHand 
        hand={props.hand}
        handDeck={props.handDeck}
        myTurn={props.myTurn}
        disableCards={props.disableCards}
        setdisableCards={props.setdisableCards}
        setDisplayCard={props.setDisplayCard}
        myDeck={props.myDeck}
      />
    </div>
  );
}


function DisplayCardsInHand(props) {
  return (<>
    {props.handDeck.map((card,index)=>
      <div className="col-4 d-grid p-1" key={index}>
        <button type="button" className="btn btn-primary" disabled={props.disableCards} onClick={()=>{props.setdisableCards(true); props.setDisplayCard(props.myDeck.cards[props.hand[index]])}}>
          Card Name: {card.name}
          <br/>
          Question:{card.question}
          <br/>
          Answer:{card.answer}
        </button>
      </div>
      
    )}
  </>
  );
}

export {DisplayHand};