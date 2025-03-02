"use client";

import Header from "@/components/dashboard/Header";
import Conversation from "@/components/dashboard/chat/Conversation";
import ChatInput from "@/components/dashboard/chat/ChatInput";
import { useState } from "react";

export default function Dashboard() {
  const [messages, setMessages] = useState<
    {
      role: "agent" | "user";
      content: string;
      agents: string[];
      model: string;
    }[]
  >([]);

  const addUserMessage = (message: { role: "user"; content: string }) => {
    const newMessage = {
      ...message,
      agents: [],
      model: "",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const addAgentMessage = (message: {
    role: "agent";
    content: string;
    agents: string[];
    model: string;
  }) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Conversation messages={messages} />
      <ChatInput
        onSendUserMessage={addUserMessage}
        onSendAgentMessage={addAgentMessage}
      />
    </div>
  );
}
