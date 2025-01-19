import { useState } from "react";
import { CreateRoom } from "./createRoom";
import { ChatRoom } from "./chatRoom";
import { RoomHeading } from "../roomHeading/roomHeading";

export const Room = () => {
  const [isJoined, setIsJoined] = useState(true);
  const joinRoom = () => {
    setIsJoined(!isJoined);
  };
  return (
    <div className=" border-2 border-gray-400 border-opacity-30 rounded-md mx-auto w-full p-3">
      <RoomHeading joinRoom={joinRoom} />
      <div>
        {isJoined ? (
          <ChatRoom/>
        ) : (
          <CreateRoom joinRoom={joinRoom} />
        )}
      </div>
    </div>
  );
};
