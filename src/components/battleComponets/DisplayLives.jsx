import { useState, useEffect } from "react";
import { socket } from "../../socket.js"

function DisplayLives(props) {
    let [myLife, setMyLife] = useState(props.maxLives);
    let [oppLife, setOppLife] = useState(props.maxLives);

    useEffect(()=>{

        function lifeUpdateFunc(data){
            console.log("lives:", data)
            setMyLife(data)
        }
        function lifeUpdateOppFunc(data){
            console.log("lives:", data)
            setOppLife(data)
        }

        socket.on("lifeUpdate", lifeUpdateFunc)
        socket.on("lifeUpdateOpp", lifeUpdateOppFunc)
 
        return () => {
            socket.off("lifeUpdate", lifeUpdateFunc)
            socket.off("lifeUpdateOpp", lifeUpdateOppFunc)
        };
    },[])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-5">
                    <h1>
            MyLives: {"❤".repeat(myLife)}
                        {"🖤".repeat(props.maxLives - myLife)}
                    </h1>
                </div>
                <div className="col-2 text-center">
                    <h1>{[props.myTurn ? "Your Turn" : "Opponent Turn"]}</h1>
                </div>
                <div className="col-5 text-end">
                    <h1>
                    OpponentLives: {"❤".repeat(oppLife)}
                        {"🖤".repeat(props.maxLives - oppLife)}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export { DisplayLives };
