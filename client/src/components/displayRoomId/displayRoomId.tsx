import { CopyIcon } from "lucide-react";

interface RoomId {
  copyRoomId: () => void;
  roomId: string;
}

export const DisplayRoomId = ({ copyRoomId, roomId }: RoomId) => {
  return (
    <div className="h-20 bg-chatGray-500 text-white p-4 flex justify-center items-center flex-col">
      <p className="text-sm">Share this code with your friend</p>
      <div className="flex gap-5 justify-center mt-2">
        <span>{roomId}</span>
        <button type="button" className="h-5 w-5 text-sm" onClick={copyRoomId}>
          <CopyIcon />
        </button>
      </div>
    </div>
  );
};
