import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
const allSockets: WebSocket[] = [];

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  allSockets.push(ws);
  // setInterval(() => {
  //   ws.send("ITC price" + Math.random());
  // }, 1000);
  userCount++;
  ws.send(`userCount:  ${userCount}`);
  console.log(`user count: ${userCount}`)
  ws.on("message", (message) => {
    const msg = message.toString();
    
    allSockets.forEach((s) => {
      s.send(msg)
    })
    
  });
});
