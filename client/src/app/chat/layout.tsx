"use client";
import { Sidebar } from "@/components/ui/Sidebar";
import React, { useState, useEffect } from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen flex">
      {/* Sidebar (Persistent) */}
      <Sidebar />

      {/* Main Chat Area: Only visible if window width >= 768 */}
      {!isMobile && <div className="flex-1">{children}</div>}
    </div>
  );
};

export default ChatLayout;
