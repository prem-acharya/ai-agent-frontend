"use client";

import Header from "@/components/dashboard/Header";
import Conversation from "@/components/dashboard/chat/Conversation";
import ChatInput from "@/components/dashboard/chat/ChatInput";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Conversation />
      <ChatInput />
    </div>
  );
}
