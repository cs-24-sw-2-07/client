import { useState, useEffect } from "react";
import { socket } from "../../socket.js";

function DisplayLives(props) {
    const [lives, setLives] = useState(props.playerLives);
    const [turn, setTurn] = useState(props.turn.current);

    useEffect(()=>{

        function switchRolesFunc(data) {
            setTurn(data.turn.current);
        }

        socket.on("lifeUpdate", setLives);
        socket.on("switchRoles", switchRolesFunc);

        return () => {
            socket.off("lifeUpdate", setLives);
            socket.off("switchRoles", switchRolesFunc);
        };
    },[]);

    return (
        <>
            <h1 className="text-center">{turn === socket.id ? "Your Turn" : `${lives.find(player => player.id === turn)?.name}'s turn`}</h1>
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
