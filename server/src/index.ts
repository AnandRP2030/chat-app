import { WebSocketServer, WebSocket } from "ws";
import { createRoomId } from "./utils/createRoomId";
import { JOINING_STATUS, SocketMessagesType } from "./types";
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

      if (parsedMessage.type === SocketMessagesType.CREATE) {
        const roomId = createRoomId();
        const resObj = {
          type: SocketMessagesType.CREATE,
          roomId,
        };
        allSockets.push({
          socket,
          roomId,
        });

        socket.send(JSON.stringify(resObj));
      }

      if (parsedMessage.type === SocketMessagesType.JOIN) {
        const {roomId, username} = parsedMessage.payload;

        const existingRoom = allSockets.find(
          (socket) => socket.roomId === roomId
        );
        

        //todo => add username to the allsocket.

        if (!existingRoom) {
          const errorResponse = {
            type: SocketMessagesType.JOIN,
            message: `Inavlid room Id  ${roomId}`,
            joiningStatus: JOINING_STATUS.FAILED,
          };
          socket.send(JSON.stringify(errorResponse));
          console.log(
            `Failed join attempt: Invalid room ID ${roomId} for user ${username}`
          );

          return;
        }

        const successResponse = {
          type: SocketMessagesType.JOIN,
          message: `You are successfully joined the room ${parsedMessage.payload.roomId}`,
          joiningStatus: JOINING_STATUS.SUCCESS,
        };
        socket.send(JSON.stringify(successResponse));
      }

      if (parsedMessage.type === SocketMessagesType.CHAT) {
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
