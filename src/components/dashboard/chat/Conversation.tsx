"use client";

import Message from "@/components/dashboard/chat/Message";
import { useEffect, useState } from "react";

export default function Conversation() {
  const [messages, setMessages] = useState<
    { role: "agent" | "user"; content: string }[]
  >([
    { role: "agent", content: "Hello, how can I assist you today?" },
    { role: "user", content: "I need assistance with my code." },
    { role: "agent", content: "What specific help do you need?" },
  ]);

  useEffect(() => {
    const fetchMessages = () => {
      const newMessages: { role: "agent" | "user"; content: string }[] = [
        { role: "user", content: "I'm looking for some help with my project." },
      ];
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };
    fetchMessages();
  }, []);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl flex flex-col h-[calc(70vh-10rem)] md:h-[calc(78vh-10rem)] lg:h-[calc(75vh-10rem)] overflow-y-auto">
        <div className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="text-center text-foreground/50 mt-10">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg, index) => <Message key={index} {...msg} />)
          )}
        </div>
      </div>
    </div>
  );
}
