import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("error", console.error);
//   setInterval(() => {
//     ws.send("ITC price" + Math.random());
//   }, 1000);
  ws.on("message", (e) => {
    const msg = e.toString();
    console.log('msg', msg)
    if (msg == "ping") {
        console.log('msg 2', msg)
      ws.send("pong");
    }else {
        
        ws.send("pong not working");
    }
    
  });
});
