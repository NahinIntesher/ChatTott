import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import router from "next/router";
import Image from "next/image";
const avater = "/images/avater.jpg";
interface ChatListBoxProps {
  chat: {
    id: number;
    name: string;
  };
  setSelectedChat: Dispatch<SetStateAction<number | null>>;
}

const ChatListBox: React.FC<ChatListBoxProps> = ({ chat, setSelectedChat }) => {
  const handleChatClick = (chatId: number) => {
    if (window.innerWidth < 768) {
      router.push(`/chat/${chatId}`);
    } else {
      setSelectedChat(chatId);
    }
  };

  return (
    <div
      key={chat.id}
      onClick={() => handleChatClick(chat.id)}
      className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
    >
      <Image
        src={avater}
        alt="Avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{chat.name}</h3>
          {/* <span className="text-xs text-gray-500">{chat.time}</span> */}
        </div>
        {/* <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
          {chat.lastMessage}
        </p> */}
      </div>
      {/* {chat.unread > 0 && (
        <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {chat.unread}
        </div>
      )} */}
    </div>
  );
};

export default ChatListBox;

/*
      

      */
