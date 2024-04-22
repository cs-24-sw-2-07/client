//renders list of cards and shows the individual card when clicked
function ListCards({cards, cardIndex, showCard}){
  return <>
    <label htmlFor="cards">Pick A Card:</label>
    <select className="form-select" id="cards" size="18" defaultValue={cardIndex}>
      {// ? is if there are no cards
        cards.map((_,index)=>
          <option className={(index===cardIndex)?"text-primary font-wieght-bold":""}key={index} onClick={() => {showCard(index);}}>{"Card "+[index+1]+": " + cards[index].name}</option>)
      }
    </select>
  </>
}

export {ListCards};
