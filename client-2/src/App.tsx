import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    // @ts-ignore
    setSocket(ws);

    ws.onmessage = (e) => {
      console.log(e.data);
    };
    ws.onclose = () => {
      console.log("socekt closed");
    };
    ws.onopen = () => {
      console.log("socekt opened");
    };
  }, []);
  const sendMsg = () => {
    if (!socket) {
      return;
    }
    // @ts-ignore
    socket.send("ping");
  };
  return (
    <>
      <h1> web socket </h1>
      <input type="text" placeholder="message" />
      <button onClick={sendMsg}>Send</button>
    </>
  );
}

export default App;
