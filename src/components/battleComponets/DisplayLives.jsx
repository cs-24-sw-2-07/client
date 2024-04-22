//import { useState } from "react";
//import { useNavigate } from "react-router-dom";

function DisplayLives(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-5">
                    <h1>
            MyLives: {"❤".repeat(props.myLives)}
                        {"🖤".repeat(props.maxLives - props.myLives)}
                    </h1>
                </div>
                <div className="col-2 text-center">
                    <h1>{[props.myTurn ? "Your Turn" : "Opp Turn"]}</h1>
                </div>
                <div className="col-5 text-end">
                    <h1>
            OppLives: {"❤".repeat(props.oppLives)}
                        {"🖤".repeat(props.maxLives - props.oppLives)}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export { DisplayLives };
