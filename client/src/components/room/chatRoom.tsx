import { CopyIcon } from "lucide-react";

export const ChatRoom = () => {
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

      <div className="h-72 border-2 border-gray-400 border-opacity-30 mt-3"></div>

      <div className="flex justify-between items-center">
        <input
          className="w-10/12 px-3 bg-transparent my-3 h-8 text-sm py-3"
          type="text"
          placeholder="Send message here.."
        />
        <button
          type="submit"
          className="w-2/12 bg-black text-white dark:bg-white  dark:text-black hover:shadow h-8  text-sm border-none ml-3"
        >
          Send
        </button>
      </div>
    </div>
  );
};
