import { ChatIcon } from "../../assets/icons/ChatIcon";

export const RoomHeading = () => {
  return (
    <div>
      <div className="flex items-center">
        <span>
          <ChatIcon />
        </span>
        <p className="ms-2  text-lg"> Chat with your friends!</p>
      </div>
      <p className="text-xs mt-2">
        It's a quick chat application, we won't save your data.
      </p>
    </div>
  );
};
