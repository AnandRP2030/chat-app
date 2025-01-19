import { CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { showToast } from "../../config/toast";
type MessageInputs = {
  message: string;
};
interface ChatInterface {
  username: string;
  myMessage: boolean;
  message: string;
}
export const ChatRoom = () => {
  const [chats, setChats] = useState<ChatInterface[]>([
    {
      message: "hi there",
      myMessage: true,
      username: "Anand",
    },
    {
      message: "Hey, how are you?",
      myMessage: false,
      username: "Aravind",
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<MessageInputs>();
  const onSendMessage: SubmitHandler<MessageInputs> = (data) => {
    console.log(data);
    const msgLength = data.message.length;
    console.log("msg", msgLength);
    if (msgLength > 50) {
      console.log("msg", msgLength);
      showToast({
        icon: "🥲",
        toastMsg: "Please send small messages.",
      });
      return;
    }

    const newChat: ChatInterface = {
      message: data.message,
      myMessage: chats.length % 2 === 0,
      username: "anand",
    };

    setChats([...chats, newChat]);

    reset();
  };

  return (
    <div>
      <div className="text-xs h-10 mt-5 bg-chatGray-500 text-white p-4 flex justify-between items-center">
        <p className="flex space-x-3">
          Room Id: <span> DBS004 </span>
          <span className="cursor-pointer">
            <CopyIcon size={16} />
          </span>
        </p>
        <p>
          Users: <span>1</span>
        </p>
      </div>

      <div className="h-72 border-2 overflow-y-auto border-gray-400 border-opacity-30 mt-3 p-4 space-y-2">
        {chats.map((chat: ChatInterface, i) => {
          return chat.myMessage ? (
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
