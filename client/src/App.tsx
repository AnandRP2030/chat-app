import { Room } from "./components/room/room";
import { DarkModeToggle } from "./config/theme";
import { useEffect, useState } from "react";
import "./App.css";
import { useWebSocket } from "./hooks/useWebsocket";
function App() {
  const [messages, setMessages] = useState<string[]>([]);

  const { ws } = useWebSocket();

  // creaet connection
  useEffect(() => {
    console.log("ws", ws);
    console.log("ws state", ws?.readyState);

    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('Socket Opened.')
    }
    // if (ws && ws.readyState )
  }, [ws, ws?.readyState]);
  return (
    <div className="min-h-screen bg-white  text-black dark:bg-black dark:text-white p-4">
      <div className="absolute top-5 right-5">
        <DarkModeToggle />
      </div>
      <div className="flex items-center min-h-screen min-w-2xl md:max-w-xl  mx-auto">
        <Room />
      </div>
    </div>
  );
}
export default App;
