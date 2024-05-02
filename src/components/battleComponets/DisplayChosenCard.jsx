function DisplayChosenCard({displayCard, myTurn, showAnswer}) {
    return (
        <div className="container-fluid">
            <div className="row  px-3">
                <div className="col-6">
                    <div className="row">
                        <h3>Question:</h3>
                        <textarea
                            type="text"
                            disabled
                            rows="8"
                            value={displayCard.question}
                        ></textarea>
                    </div>

                    <div className="row">
                        <h3>Answer:</h3>
                        <textarea
                            type="text"
                            disabled
                            rows="8"
                            value={(myTurn || showAnswer) ? displayCard.answer : ""}
                        ></textarea>
                    </div>
                </div>
                <div className="col-6">
                    <p>Make whiteboard</p>
                </div>
            </div>
        </div>
    );
}

export { DisplayChosenCard };
