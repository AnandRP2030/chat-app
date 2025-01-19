import { WebSocketServer, WebSocket } from "ws";
import { createRoomId } from "./utils/createRoomId";
import { JOINING_STATUS, SocketMessagesType } from "./types";
const wss = new WebSocketServer({ port: 8080 });

interface Room {
  roomId: string;
  clients: Set<WebSocket>;
  messages: { username: string; message: string }[];
}

let rooms = new Map<string, Room>();

wss.on("connection", (socket: WebSocket) => {
  console.log("Client connected");

  socket.on("message", (message: string) => {
    try {
      const parsedMessage = JSON.parse(message.toString());

      if (parsedMessage.type === SocketMessagesType.CREATE) {
        const roomId = createRoomId();

        rooms.set(roomId, {
          roomId,
          clients: new Set([socket]),
          messages: [],
        });

        const successResponse = {
          type: SocketMessagesType.CREATE,
          roomId,
        };

        socket.send(JSON.stringify(successResponse));
      }

      if (parsedMessage.type === SocketMessagesType.JOIN) {
        const { roomId, username } = parsedMessage.payload;

        const existingRoom = rooms.get(roomId);

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

        existingRoom.clients.add(socket);

        const successResponse = {
          type: SocketMessagesType.JOIN,
          message: `Successfully joined the room ${roomId}`,
          joiningStatus: JOINING_STATUS.SUCCESS,
          previousMessages: existingRoom.messages,
        };
        socket.send(JSON.stringify(successResponse));
      }

      if (parsedMessage.type === SocketMessagesType.CHAT) {
        const { roomId, username, message } = parsedMessage.payload;
        const room = rooms.get(roomId);
        if (!room) return;

        const chatMessage = { username, message };
        room.messages.push(chatMessage);
        const res = {
          type: SocketMessagesType.CHAT,
          username,
          message,
        };
        room.clients.forEach((client) => {
          client.send(JSON.stringify(res));
        });
      }
    } catch (error) {
      console.error("Invalid json: ", message.toString(), error);
    }
  });
  socket.on("close", () => {
    console.log("Client disconnected");
    rooms.forEach((room, roomId) => {
      if (room.clients.has(socket)) {
        room.clients.delete(socket);
      }

      if (room.clients.size === 0) {
        rooms.delete(roomId);
      }
    });
  });
});
