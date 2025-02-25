"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const avater = "/images/avater.jpg";

const chats = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Mike Johnson" },
  { id: 4, name: "Sarah Wilson" },
];

const ChatPage: React.FC = () => {
  const params = useParams();
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Get chat ID or pick a random chat
  const id = params?.id
    ? Number(params.id)
    : Math.floor(Math.random() * chats.length) + 1;
  const chat = chats.find((chat) => chat.id === id);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending messages
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages((prev) => [...prev, { text: newMessage, sender: "me" }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is a random reply!", sender: "them" },
      ]);
    }, 1000);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen w-full bg-bg text-text">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-5 shadow-md">
        <Image
          src={avater}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h2 className="text-lg font-semibold">{chat?.name || "Random Chat"}</h2>
      </div>

      {/* Chat Messages */}
      <div ref={chatBoxRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md px-4 py-2 rounded-xl ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-3 border-t border-gray-300 bg-bg">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg outline-none bg-bg text-black dark:text-white"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-3 px-4 py-2 bg-primary text-text rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
