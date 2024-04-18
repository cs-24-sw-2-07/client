//Renders list of decks on page
function DeckList(props){
  return <div className="list-group" id="list-tab" key="list">
    {props.decks.map((deck, index) =>
      <div className="row" key={index}>
        <div className="col-10">
          <button type="button" className="list-group-item list-group-item-action" onClick={()=>{props.showCardEditor(props.deckIndex,index)}}>
            {deck.name}
          </button>
        </div>
        <div className="col-2">
          <button type="button" className="list-group-item list-group-item-action text-center" onClick={()=>{props.deleteDeck(index)}}>
                Delete
          </button>
        </div>
      </div>)
    }
  </div>
}

export {DeckList};