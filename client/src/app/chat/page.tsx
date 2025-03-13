"use client";
import { useState, useEffect, useRef } from "react";

interface Message {
  username: string;
  message: string;
}

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new WebSocket("ws://localhost:9000/ws");

      socket.onopen = () => {
        console.log("✅ Connected to WebSocket");
      };

      socket.onmessage = (event: MessageEvent) => {
        try {
          const newMessage: Message = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (err) {
          console.error("❌ Error parsing message:", err);
        }
      };

      socket.onerror = (error) => {
        console.log("❌ WebSocket Error:", error);
      };

      socket.onclose = () => {
        console.warn("⚠️ WebSocket Disconnected. Reconnecting...");
        setTimeout(connectWebSocket, 2000); // Reconnect after 2 seconds
      };

      socketRef.current = socket;
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && socketRef.current) {
      if (socketRef.current.readyState === WebSocket.OPEN) {
        const messageData: Message = { username: "User", message };
        socketRef.current.send(JSON.stringify(messageData));
        setMessage("");
      } else {
        console.warn("⚠️ WebSocket not open. Cannot send message.");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-bg text-text p-4">
        <h1 className="text-xl font-semibold">Real-time Chat</h1>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
        {messages.length === 0 ? (
          <div>No messages yet</div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.username === "User" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-2 rounded-xl ${
                  msg.username === "User"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <strong>{msg.username}:</strong> {msg.message}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-3 border-t border-gray-300 bg-white">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
