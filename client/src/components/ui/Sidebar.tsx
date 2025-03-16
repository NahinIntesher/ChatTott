"use client";
import React, {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useMemo,
} from "react";
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
  const [chats, setChats] = useState<any[]>([]);

  const fetchChats = async () => {
    const response = await fetch("http://localhost:8000/allusers", {
      method: "GET",
      credentials: "include",
    });
    if (response?.status == 200) {
      const data = await response.json();
      setChats(data.users);
    } else {
      console.error("Failed to fetch chats");
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
