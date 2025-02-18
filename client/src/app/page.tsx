"use client";
import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import ThemeSwitcher from "@/components/ui/ThemeSwitcherButton";
import logo from "/public/images/ChatTottLogo.png";
import SearchBox from "@/components/ui/SearchBar";
import ChatListBox from "@/components/ui/ChatListBox";

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null); // Track selected chat (for large screens)
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/login");
  };

  // Sample chat data - in a real app, this would come from your backend
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
      lastMessage: "The meeting is at 3 PM",
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

  // Memoize the filteredChats list
  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Full width on small screens, 1/4 width on large screens) */}
        <div className="transition-all duration-300 bg-bg border-r border-border flex flex-col w-full md:w-1/4">
          {/* Header */}
          <div className="flex justify-start items-center px-5 py-3 bg-primary text-text shadow-md space-x-1">
            <Image src={logo} alt="ChatTott" width={40} height={40} />
            <h1 className="text-xl font-semibold hidden md:block">ChatTott</h1>
          </div>

          {/* Search Box Component */}
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

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
          <div className="p-4 flex items-center justify-between bg-primary text-text shadow-md">
            <FaUserCircle size={30} className="cursor-pointer" />
            <div className="flex items-center space-x-3">
              <ThemeSwitcher />
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <FaSignOutAlt className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Chat Area (Hidden on small screens, visible on medium/large screens) */}
        <div className="hidden md:flex flex-1 bg-bg flex-col items-center justify-center">
          {selectedChat ? (
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Chat with {chats.find((chat) => chat.id === selectedChat)?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Start messaging in real-time!
              </p>
            </div>
          ) : (
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Welcome to ChatTott!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select a chat from the sidebar to start messaging.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
