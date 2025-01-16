import { ChatIcon } from "../../assets/icons/ChatIcon";

export const CreateNewRoom = () => {
  return (
    <div className="border-black border-2 shadow-md rounded-md dark:border-gray-500 mx-auto w-full p-3">
      <div className="flex items-center">
        <span>
          <ChatIcon />
        </span>
        <p className="ms-2  text-lg"> Chat with your friends!</p>
      </div>
      <p className="text-xs mt-2">
        It's a quick chat application, we won't save your data.
      </p>
      <button className="w-full mt-3 bg-black text-white border-2 rounded dark:bg-white dark:text-black  py-1 my-2">
        Create New Room
      </button>
      <input
        className="w-full px-3 bg-transparent my-3 h-8 text-sm py-3"
        type="text"
        placeholder="Enter your name"
      />
      <div className="flex justify-between items-center">
        <input
          className="w-10/12 px-3 bg-transparent my-3 h-8 text-sm py-3"
          type="text"
          placeholder="Enter room Id"
        />
        <button className="w-2/12 bg-black hover:text-red-500 hover:shadow-sm text-white h-10 text-sm border-none ml-3">Join Room</button>
      </div>
    </div>
  );
};
