import { useState } from "react";
import { ChatIcon } from "../../assets/icons/ChatIcon";
import { CreateRoom } from "./createRoom";
import { ChatRoom } from "./chatRoom";

export const Room = () => {
  const [isJoined, setIsJoined] = useState(true);
  const tempToggle = () => {
    setIsJoined(!isJoined);
  };
  return (
    <div className=" border-2 border-gray-400 border-opacity-30 rounded-md mx-auto w-full p-3">
      <div className="flex items-center">
        <span>
          <ChatIcon />
        </span>
        <p className="ms-2  text-lg" onClick={tempToggle}>
          {" "}
          Chat with your friends!
        </p>
      </div>
      <p className="text-xs mt-2">
        It's a quick chat application, we won't save your data.
      </p>
      <div>{isJoined ? <ChatRoom /> : <CreateRoom />}</div>
    </div>
  );
};
