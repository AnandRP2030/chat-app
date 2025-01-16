import React, { useRef, useState } from "react";
import { CopyIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { ShowToast } from "../../types/showToast";

export const CreateRoom = () => {
  const [isRoomIdAvail, setIsRoomIdAvail] = useState(false);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputRoomIdRef = useRef<HTMLInputElement>(null);
  const createRoomId = () => {
    setIsRoomIdAvail(true);
    showToast({
      icon: "😍",
      toastMsg: "Room Created successfully.",
    });
  };

  const showToast = (data: ShowToast) => {
    toast.success(data.toastMsg, {
      icon: data.icon,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        fontSize: "12px",
      },
    });
  };
  const copyRoomId = () => {
    showToast({
      icon: "😊",
      toastMsg: "Room id copy to clipboard.",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = inputNameRef.current ? inputNameRef.current.value : "";
    const roomId = inputRoomIdRef.current ? inputRoomIdRef.current.value : "";
    if (!username) {
      showToast({
        icon: "🥲",
        toastMsg: "Please enter your name",
      });
      return;
    }

    if (!roomId) {
      showToast({
        icon: "👿",
        toastMsg: "Please provide the  room id",
      });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={createRoomId}
        className="w-full mt-3 bg-black text-white border-2 rounded dark:bg-white dark:text-black  py-1 my-2"
      >
        Create New Room
      </button>
      <input
        ref={inputNameRef}
        className="w-full px-3 bg-transparent my-3 h-8 text-sm py-3 "
        type="text"
        placeholder="Enter your name"
      />
      <div className="flex justify-between items-center">
        <input
          ref={inputRoomIdRef}
          className="w-10/12 px-3 bg-transparent my-3 h-8 text-sm py-3"
          type="text"
          placeholder="Enter room Id"
        />
        <button
          type="submit"
          className="w-2/12 bg-black dark:bg-white text-white dark:text-black hover:shadow h-8  text-sm border-none ml-3"
        >
          Join Room
        </button>
      </div>

      {isRoomIdAvail && (
        <div className="h-20 bg-chatGray-500 text-white p-4 flex justify-center items-center flex-col">
          <p className="text-sm">Share this code with your friend</p>
          <div className="flex gap-5 justify-center mt-2">
            <span>E483EA</span>
            <button
              type="button"
              className="h-5 w-5 text-sm"
              onClick={copyRoomId}
            >
              <CopyIcon />
            </button>
          </div>
        </div>
      )}
    </form>
  );
};
