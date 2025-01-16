import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

interface Room {
  socket: WebSocket;
  roomId: string;
}

let allSockets: Room[] = [];
wss.on("connection", (socket: WebSocket) => {
  socket.on("message", (message: string) => {
    try {
      const parsedMessage = JSON.parse(message.toString());
      if (parsedMessage.type === "join") {
        const previousMembersOnSameRoom = allSockets.filter(
          (room: Room) => room.roomId === parsedMessage.payload.roomId
        );

        allSockets.push({
          socket,
          roomId: parsedMessage.payload.roomId,
        });

        previousMembersOnSameRoom.forEach((room: Room) => {
          room.socket.send(`A new guy joined on ${parsedMessage.payload.roomId}`);
        });

        socket.send(
          `You have successfully joined the room ${parsedMessage.payload.roomId}`
        );
      }

      if (parsedMessage.type === "chat") {
        const currentUserRooms = allSockets.filter(
          (room: Room) => room.roomId === parsedMessage.payload.roomId
        );
        currentUserRooms.forEach((currRoom) => {
          currRoom.socket.send(`${parsedMessage.payload.message}`);
        });
      }
    } catch (error) {
      console.error("Invalid json: ", message.toString(), error);
    }
  });
  socket.on("close", () => {
    socket.send("disconnected / server stopped");
  });
});
