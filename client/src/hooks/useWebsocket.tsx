import { useContext } from "react";
import { myWebSocketContext } from "../context/WebSocketContext";

export const useWebSocket = () => {
    const ws = useContext(myWebSocketContext)
    if (!ws) {
        throw new Error("useWebSocket must be inside websocket provider");
    }
    return ws;
}