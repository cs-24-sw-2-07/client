import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { socket } from "./socket";

function App() {
  const [count, setCount] = useState(0);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  function counterClick() {
    socket.emit("buttonClick", count + 1);
    setCount((count) => count + 1);
  }

  return (
    <>
      <h1>Vite + React</h1>
      <img src={reactLogo} className="logo" alt="React logo" />
      <p>Socket is {isConnected ? "connected" : "disconnected"}</p>
      <button className="btn btn-danger" onClick={counterClick}>
        count is {count}
      </button>
    </>
  );
}

export default App;
