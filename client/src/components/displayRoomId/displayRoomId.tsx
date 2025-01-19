import { CopyIcon } from "lucide-react";
import { showToast } from "../../config/toast";
import { ToastIcons, ToastMessages } from "../../types/showToast";

interface RoomId {
  roomId: string;
}

export const DisplayRoomId = ({ roomId }: RoomId) => {
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    showToast({
      icon: ToastIcons.ROOM_ID_COPIED,
      toastMsg: ToastMessages.ROOM_ID_COPIED,
    });
  };
  return (
    <div className="h-20 bg-chatGray-500 text-white p-4 flex justify-center items-center flex-col">
      <p className="text-sm">Share this code with your friend</p>
      <div className="flex gap-2 justify-center mt-2">
        <span>{roomId}</span>
        <button type="button" className="h-5 w-5 mt-0.5" onClick={copyRoomId}>
          <CopyIcon size={16} />
        </button>
      </div>
    </div>
  );
};
