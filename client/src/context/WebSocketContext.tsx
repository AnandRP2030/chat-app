import React, { useEffect, useState, createContext } from "react";
import { BASE_URL } from "../api/baseURL";

type WebSocketContextType = {
  ws: WebSocket | null;
} | null;

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export const myWebSocketContext = createContext<WebSocketContextType>(null);

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [ws, setWS] = useState<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket(BASE_URL);

    setWS(socket);

    socket.onopen = () => {
      console.log(`Socket opened.`);
    };
    socket.onclose = () => {
      console.log(`Socket closed.`);
    };

    socket.onerror = (error) => {
      console.error("[SOCKET ERROR]: ", error);
    };

    return () => {
      socket.close();
    };
  }, []);
  return <myWebSocketContext.Provider value={{ ws }}>{children}</myWebSocketContext.Provider>;
};
