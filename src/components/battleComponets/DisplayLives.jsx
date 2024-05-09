import { useState, useEffect } from "react";
import { socket } from "../../socket.js"

function DisplayLives(props) {
    // [{id: "1234", name:"test user", lives:3},{id: "2345", name:"test2 user", lives:2}, {id:"3456", name:"christian lugter", lives:1}]
    let [lives, setLives] = useState(props.playerLives);
    console.log(lives);

    useEffect(()=>{
        socket.on("lifeUpdate", setLives);

        return () => {
            socket.off("lifeUpdate", setLives);
        };
    },[])

    return (
        <>
            <h1 className="text-center">{props.turn === socket.id ? "Your Turn" : `${lives.find((player) => player.id === props.turn)?.name}'s turn`}</h1>
            <div className="container-fluid bg-light py-3 border rounded-1 border-secondary-subtle">
                {lives.map(playerlife => (
                    <div className="row" key={playerlife.id}>
                        <h3 className="col-7">{(socket.id === playerlife.id) ? playerlife.name + " (You)" : playerlife.name}</h3>
                        <div className="col-5 text-end">
                            <h3>
                                {"❤".repeat(playerlife.lives)}
                                {"🖤".repeat(props.maxLives - playerlife.lives)}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export { DisplayLives };
