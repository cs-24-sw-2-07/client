import { socket } from "../../socket.js";
import { DisplayLives } from "./DisplayLives.jsx";

function DisplayChosenCard({displayCard, turn, showAnswer, playerLives, maxLives}) {
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
                            value={(turn.current === socket.id || showAnswer) ? displayCard.answer : ""}
                        ></textarea>
                    </div>
                </div>
                <div className="col-6">


                    {/* Displays the life amounts of the players in the top */}
                    <DisplayLives
                        playerLives={playerLives}
                        maxLives={maxLives}
                        turn={turn}
                    />
                </div>
            </div>
        </div>
    );
}

export { DisplayChosenCard };
