import { CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { showToast } from "../../config/toast";
import { ToastIcons, ToastMessages } from "../../types/showToast";
import { UserData } from "../../types/userTypes";
import { useWebSocket } from "../../hooks/useWebsocket";
import {
  JOINING_STATUS,
  NewMessage,
  SocketMessagesType,
} from "../../types/wsTypes";
type MessageInputs = {
  message: string;
};
interface ChatInterface {
  username: string;
  message: string;
}

interface ChatRoomProps {
  userData: UserData;
}

export const ChatRoom = ({ userData }: ChatRoomProps) => {
  const [chats, setChats] = useState<ChatInterface[]>([]);

  const copyRoomId = () => {
    navigator.clipboard.writeText(userData.roomId);
    showToast({
      icon: ToastIcons.ROOM_ID_COPIED,
      toastMsg: ToastMessages.ROOM_ID_COPIED,
    });
  };

  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const { register, handleSubmit, watch, reset } = useForm<MessageInputs>();

  const { ws } = useWebSocket();
  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        console.log(`Web socket connected.`);
      };
      const joinRoom = {
        type: SocketMessagesType.JOIN,
        payload: userData,
      };
      ws.send(JSON.stringify(joinRoom));

      ws.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log("rec ", receivedMessage);
        if (
          receivedMessage.type === SocketMessagesType.JOIN &&
          receivedMessage.joiningStatus === JOINING_STATUS.SUCCESS
        ) {
          setChats(receivedMessage.previousMessages);
        }

        if (receivedMessage.type === SocketMessagesType.CHAT) {
          console.log(receivedMessage.newMessage)
          setChats([...chats, receivedMessage.newMessage]);
          console.log('check' , [...chats, receivedMessage.newMessage])
        }
      };
    }
  }, [userData, ws]);
  const onSendMessage: SubmitHandler<MessageInputs> = (data) => {
    const msgLength = data.message.length;
    // todo => fix this magical strings and numbers
    if (msgLength > 50) {
      showToast({
        icon: "🥲",
        toastMsg: "Please send small messages.",
      });
      return;
    }

    if (ws) {
      const newChat: NewMessage = {
        type: SocketMessagesType.CHAT,
        payload: {
          ...userData,
          message: data.message,
        },
      };
      console.log("new ch", newChat);
      ws.send(JSON.stringify(newChat));
      reset();
    }
  };

  return (
    <div>
      <div className="text-xs h-10 mt-5 bg-chatGray-500 text-white p-4 flex justify-between items-center">
        <p className="flex space-x-3">
          Room Id: <span> {userData.roomId} </span>
          <span className="cursor-pointer" onClick={copyRoomId}>
            <CopyIcon size={16} />
          </span>
        </p>
        <p>
          Users: <span>1</span>
        </p>
      </div>

      <div className="h-72 border-2 overflow-y-auto border-gray-400 border-opacity-30 mt-3 p-4 space-y-2">
        {chats?.map((chat: ChatInterface, i) => {
          return i % 2 === 0 ? (
            <div key={i} className={`flex flex-col items-end `}>
              <span className="text-xs text-gray-500 text-muted-foreground mb-0.5 ">
                {chat.username}
              </span>
              <span className="break-words text-sm bg-chatWhite-600 text-black inline-block rounded-lg px-3 py-1.5">
                {chat.message}
              </span>
            </div>
          ) : (
            <div key={i} className={`flex flex-col items-start `}>
              <span className="text-xs text-gray-500 text-muted-foreground mb-0.5 ">
                {chat.username}
              </span>
              <span className="break-words bg-chatBlack-600 text-sm bg-muted text-chatWhite-600 inline-block rounded-lg px-3 py-1.5">
                {chat.message}
              </span>
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </div>

      <form
        className="flex justify-between items-center"
        onSubmit={handleSubmit(onSendMessage)}
      >
        <input
          {...register("message", { required: true })}
          className="w-10/12 px-3 bg-transparent my-3 h-8 text-sm py-3"
          type="text"
          placeholder="Send message here.."
        />
        <span></span>
        <button
          disabled={watch("message")?.length === 0}
          type="submit"
          className="w-2/12 bg-black text-white dark:bg-white  dark:text-black hover:shadow h-8  text-sm border-none ml-3"
        >
          Send
        </button>
      </form>
    </div>
  );
};
