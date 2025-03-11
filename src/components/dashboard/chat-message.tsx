"use client";

import { ChatMessage } from "@/actions/chatActions";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useChatStore } from "@/store/chatStore";
import { models } from "./Header";

interface ChatMessageProps {
  message: ChatMessage;
}

export const ChatMessageItem = ({ message }: ChatMessageProps) => {
  const { user } = useUser();
  const { model } = useChatStore();
  const isUser = message.role === "user";
  const selectedModel = models.find((m) => m.value === model);

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 p-4",
        isUser ? "bg-muted/50" : "bg-background"
      )}
    >
      <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow overflow-hidden">
        {isUser ? (
          user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt="User Profile"
              width={32}
              height={32}
              className="object-cover"
            />
          ) : (
            <Image
              src="/user.png"
              alt="User Profile"
              width={32}
              height={32}
              className="object-cover"
            />
          )
        ) : (
          <Image
            src={selectedModel?.icon || "/model/ai.svg"}
            alt="AI Model"
            width={32}
            height={32}
            className={cn(
              "p-1",
              selectedModel?.invert === "true" ? "invert" : "brightness-100"
            )}
          />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <div className="font-semibold text-sm">
          {isUser
            ? user?.firstName || "You"
            : selectedModel?.label || "AI Agent"}
        </div>

        <div className="text-sm">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
