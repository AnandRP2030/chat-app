import { useState } from "react";
import { CreateRoom } from "./createRoom";
import { ChatRoom } from "./chatRoom";
import { RoomHeading } from "../roomHeading/roomHeading";
import { UserData } from "../../types/userTypes";

export const Room = () => {
  const [userData, setUserData] = useState<UserData>({
    roomId: "",
    username: "",
  });
  const [joinChat, setJoinChat] = useState(false);
  const changeUserDetails = (newData: UserData) => {
    setUserData(newData);
  };

  const navigateToChat = () => {
    setJoinChat(true);
  };

  return (
    <div className=" border-2 border-gray-400 border-opacity-30 rounded-md mx-auto w-full p-3">
      <RoomHeading />
      <div>
        {joinChat ? (
          <ChatRoom userData={userData} />
        ) : (
          <CreateRoom
            changeUserDetails={changeUserDetails}
            navigateToChat={navigateToChat}
          />
        )}
      </div>
    </div>
  );
};
