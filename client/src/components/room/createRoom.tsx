import { useEffect, useState } from "react";
import { showToast } from "../../config/toast";
import { DisplayRoomId } from "../displayRoomId/displayRoomId";
import { ToastIcons, ToastMessages } from "../../types/showToast";
import { useWebSocket } from "../../hooks/useWebsocket";
import { SocketMessagesType } from "../../types/wsTypes";
import { SubmitHandler, useForm } from "react-hook-form";

interface JoinRoomForm {
  username: string;
  roomId: string;
}

interface JoinRoomType {
  type: string;
  payload: {
    username: string;
    roomId: string;
  };
}

export const CreateRoom = ({
  navigateToChat,
}: {
  navigateToChat: () => void;
}) => {
  const [roomId, setRoomId] = useState("");
  const { ws } = useWebSocket();
  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<JoinRoomForm>();
  const createRoomId = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      showToast({
        icon: ToastIcons.SERVER_ISSUE,
        toastMsg: ToastMessages.SERVER_ISSUE,
      });
      console.log("WEB SOCKET is not opened.", ws);
      return;
    }

    const createRoomIdObj = {
      type: SocketMessagesType.CREATE,
    };
    ws.send(JSON.stringify(createRoomIdObj));
  };

  useEffect(() => {
    if (!ws) {
      return;
    }

    const onMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === SocketMessagesType.CREATE) {
        setRoomId(data.roomId);
      }

      if (data.type === SocketMessagesType.JOIN) {
        if (data.joiningStatus === "success") {
          navigateToChat();
          showToast({
            icon: ToastIcons.ROOM_JOINED,
            toastMsg: ToastMessages.ROOM_JOINED,
          });
        } else {
          showToast({
            icon: ToastIcons.INVALID_ROOM_ID,
            toastMsg: ToastMessages.INVALID_ROOM_ID,
          });
        }
      }
    };
    ws.addEventListener("message", onMessage);

    return () => {
      ws.removeEventListener("message", onMessage);
    };
  }, [ws]);

  const onJoinRoom: SubmitHandler<JoinRoomForm> = (data) => {
    const { username, roomId } = data;
    const joiningRoomData: JoinRoomType = {
      type: SocketMessagesType.JOIN,
      payload: {
        username,
        roomId,
      },
    };
    if (ws) {
      ws.send(JSON.stringify(joiningRoomData));
    }
  };

  const handleValidation = () => {
    if (errors.username) {
      showToast({
        icon: ToastIcons.ENTER_NAME,
        toastMsg: errors.username.message || "",
      });
      return;
    }

    if (errors.roomId) {
      showToast({
        icon: ToastIcons.PROVIDE_ROOM_ID,
        toastMsg: errors.roomId.message || "",
      });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onJoinRoom, handleValidation)}>
      <button
        type="button"
        onClick={createRoomId}
        className="w-full mt-3 bg-black text-white border-2 rounded dark:bg-white dark:text-black  py-1 my-2"
      >
        Create New Room
      </button>
      <input
        {...register("username", {
          required: ToastMessages.ENTER_NAME,
          maxLength: {
            value: 30,
            message: "Maximum Length is 30",
          },
        })}
        className="w-full px-3 bg-transparent my-3 h-8 text-sm py-3 "
        type="text"
        placeholder="Enter your name"
      />

      <div className="flex justify-between items-center">
        <input
          {...register("roomId", {
            required: ToastMessages.PROVIDE_ROOM_ID,
            pattern: {
              value: /^\w{6}$/,
              message: ToastMessages.INVALID_ROOM_ID,
            },
          })}
          className="w-10/12 px-3 bg-transparent my-3 h-8 text-sm py-3"
          type="text"
          placeholder="Enter room Id"
        />
        <button
          type="submit"
          className="w-2/12 bg-black dark:bg-white text-white dark:text-black hover:shadow h-8  text-sm border-none ml-3"
        >
          Join
        </button>
      </div>

      {roomId && <DisplayRoomId roomId={roomId} />}
    </form>
  );
};
