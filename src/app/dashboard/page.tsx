"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import { ChatMessageItem } from "@/components/dashboard/chat-message";
import { ChatInput } from "@/components/dashboard/chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
  const { messages, isLoading } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex-1 flex flex-col h-[calc(100vh-7rem)]">
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center p-8 text-center">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Welcome to AI Agent</h3>
                  <p className="text-muted-foreground">
                    Start a conversation with the AI agent by typing a message
                    below.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col divide-y">
                {messages.map((message, index) => (
                  <ChatMessageItem key={index} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          <div className="p-4">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
}
