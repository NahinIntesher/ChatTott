import React, { Dispatch, SetStateAction, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBar";
import ChatListBox from "./ChatListBox";
import Footer from "./Footer";
import logo from "/public/images/ChatTottLogo.png";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const router = useRouter();

  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "2m ago",
      unread: 2,
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Meeting at 3 PM",
      time: "1h ago",
      unread: 0,
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Thanks for your help!",
      time: "2h ago",
      unread: 1,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      lastMessage: "Let's catch up soon",
      time: "1d ago",
      unread: 0,
    },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/login");
  };

  // Memoize the filteredChats list
  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="transition-all duration-300 bg-bg border-r border-border flex flex-col w-full md:w-1/4">
      {/* Header */}
      <div className="flex justify-start items-center px-5 py-3 bg-primary text-text space-x-1">
        <Image src={logo} alt="ChatTott" width={40} height={40} />
        <h1 className="text-xl font-semibold hidden md:block">ChatTott</h1>
      </div>

      {/* Search Box Component */}
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <Link href={`/chat/${chat.id}`} key={chat.id}>
            <ChatListBox
              key={chat.id}
              chat={chat}
              setSelectedChat={setSelectedChat}
            />
          </Link>
        ))}
      </div>

      {/* Footer */}
      <Footer handleLogout={handleLogout} />
    </div>
  );
};
