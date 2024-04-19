//renders list of cards and shows the individual card when clicked
function ListCards(props){
  return <>
    <label htmlFor="cards">Pick A Card:</label>
    <select className="form-select" id="cards" size="18" defaultValue={props.cardIndex}>
      {// ? is if there are no cards
        props.decks[props.deckIndex]?.cards.map((_,index)=>
          <option className={(index===props.cardIndex)?"text-primary font-wieght-bold":""}key={index} onClick={() => {props.setCardIndex(index);}}>{"Card "+[index+1]+": "+props.decks[props.deckIndex].cards[index].name}</option>)
      }
    </select>
  </>
}

export {ListCards};
