import { CardsList } from "./CardsList.jsx";

function DeckEditor({
  hiddenDeck,
  showDecks,
  deckName,
  setDeckName,
  cards,
  cardIndex,
  showCard,
  card,
  updateCard,
  addNewCard,
  deleteCard,
}) {
  return (
    <div className="container" hidden={!hiddenDeck}>
      <div className="row">
        <div className="col-5 p-3">
          <h1>Deck Editor</h1>
        </div>
        <div className="col-4"></div>
        <div className="col-3 d-grid gap-2 p-3">
          <button type="button" className="btn btn-primary" onClick={showDecks}>
            Back To Decks
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <label htmlFor="deckName" className="p-3 form-control-lg">
            Deck Name:{" "}
          </label>
          <input
            type="text"
            id="deckName"
            className="form-control form-control-lg"
            placeholder="Set Deck Name"
            value={deckName}
            onChange={(e) => {
              setDeckName(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="row p-3"></div>
      <div className="row">
        <div className="col-3">
          <CardsList cards={cards} cardIndex={cardIndex} showCard={showCard} />
        </div>
        <div className="col-9">
          <div className="row">
            <label htmlFor="cardName">Card Name: </label>
            <input
              type="text"
              id="cardName"
              className="form-control form-control"
              placeholder="Set Card Name"
              value={card.name}
              onChange={(e) =>
                updateCard({
                  ...card,
                  name: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="row">
            <label htmlFor="question">Question:</label>
            <textarea
              type="text"
              placeholder="Place Your Question Here"
              id="question"
              rows="9"
              value={card.question}
              onChange={(e) =>
                updateCard({
                  ...card,
                  question: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="row">
            <label htmlFor="answer">Answer:</label>
            <textarea
              type="text"
              placeholder="Place Your Answer Here"
              id="answer"
              rows="9"
              value={card.answer}
              onChange={(e) =>
                updateCard({
                  ...card,
                  answer: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row p-3"></div>
      <div className="row">
        <div className="col-2 d-grid ">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addNewCard}
          >
            Add New Card
          </button>
        </div>
        <div className="col-2 d-grid ">
          <button
            type="button"
            className="btn btn-primary"
            onClick={deleteCard}
          >
            Delete Card
          </button>
        </div>
      </div>
    </div>
  );
}

export { DeckEditor };
