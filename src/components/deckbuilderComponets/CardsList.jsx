//renders list of cards and shows the individual card when clicked
function CardsList({cards, cardIndex, showCard}){
    return <>
        <label htmlFor="cards">Pick A Card:</label>
        <select className="form-select" id="cards" size="18" defaultValue={cardIndex}>
            {// ? is if there are no cards
                cards.map((_,index)=>
                    <option selected={index==cardIndex} key={index} onClick={() => {showCard(index);}}>{"Card "+[index+1]+": " + cards[index].name}</option>)
            }
        </select>
    </>;
}

export {CardsList};
