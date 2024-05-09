import { DisplayLives } from "./DisplayLives.jsx";

function DisplayChosenCard({displayCard, myTurn, showAnswer, playerLives}) {
    console.log("displaycard: ", displayCard)
    return (
        <div className="container-fluid pt-3">
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


                    {/* Displays the life amounts of the players in the top */}
                    <DisplayLives
                        playerLives={playerLives}
                        myTurn={myTurn}
                    />
                </div>
            </div>
        </div>
    );
}

export { DisplayChosenCard };
