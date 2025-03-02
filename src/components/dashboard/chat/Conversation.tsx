"use client";

import Message from "@/components/dashboard/chat/Message";

interface ConversationProps {
  messages: {
    role: "agent" | "user";
    content: string;
    agents?: string[];
    model?: string;
  }[];
}

export default function Conversation({ messages }: ConversationProps) {
  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl flex flex-col h-[calc(70vh-10rem)] md:h-[calc(78vh-10rem)] lg:h-[calc(75vh-10rem)] overflow-y-auto">
        <div className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="text-center text-foreground/50 mt-10">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg, index) => (
              <Message
                key={index}
                role={msg.role}
                content={msg.content}
                agents={msg.agents || []}
                model={msg.model || ""}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
