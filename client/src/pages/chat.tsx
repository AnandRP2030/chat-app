import React, { useState, useEffect, useRef } from "react";

export const Chat = () => {
  const [socket, setSocket] = useState();
  const [msg, setMsg] = useState<string[]>([]);
  const revMsg = msg.reverse();
  const inputRef = useRef(null);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    // @ts-ignore
    setSocket(ws);

    ws.onmessage = (e) => {
      setMsg((prevData) => [...prevData, e.data]);
      console.log(e.data);
    };

    ws.onclose = () => {
      console.log("socekt closed");
    };
    ws.onopen = () => {
      console.log("socekt opened");
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!socket) {
      return;
    }
    // @ts-ignore
    socket.send(inputRef.current.value);
    // @ts-ignore
    inputRef.current.value = "";
  };
  return (
    <div className="h-screen w-screen ">
      <h1 className="text-red-500 text-2xl"> Chat APP </h1>

      <ul className="h-4/5 overflow-auto">
        {revMsg.map((e, i) => (
          <li
            key={i}
            className="bg-blue-300  shadow-md  text-black border-3 border-blue-400 mt-3 w-40 px-5 py-3 rounded-md"
          >
            {" "}
            {e}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="flex justify-start space-x-10">
        <input ref={inputRef} type="text" placeholder="message" />
        <button
          type="submit"
          className="border-3 px-5 py-3 rounded-md border-x-green-300 bg-red-800 text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
};
