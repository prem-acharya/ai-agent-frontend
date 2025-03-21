"use client";

import { ChatMessage } from "@/actions/chatActions";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useChatStore } from "@/store/chatStore";
import { models } from "./Header";
import { useEffect, useRef } from "react";

interface ChatMessageProps {
  message: ChatMessage;
}

// Typing indicator component - white dot that pulses
const TypingIndicator = () => {
  return (
    <span
      className="inline-block h-4 w-4 bg-white rounded-full animate-pulse"
      style={{
        marginLeft: "2px",
        verticalAlign: "middle",
        display: "inline-block",
      }}
    />
  );
};

export const ChatMessageItem = ({ message }: ChatMessageProps) => {
  const { user } = useUser();
  const { model, isLoading } = useChatStore();
  const isUser = message.role === "user";
  const selectedModel = models.find((m) => m.value === model);

  // Check if this is the last message and if AI is generating
  const messages = useChatStore.getState().messages;
  const isLastAIMessage =
    !isUser && messages.length > 0 && message === messages[messages.length - 1];
  const isGenerating = isLastAIMessage && isLoading;

  // Ref to find the last text node for appending the indicator
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This ensures the loading indicator is attached to the end of content
    if (isGenerating && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isGenerating, message.content]);

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

        <div className="text-sm" ref={contentRef}>
          {message.content === "" && isGenerating ? (
            <TypingIndicator />
          ) : (
            <div style={{ display: "inline" }}>
              <span
                dangerouslySetInnerHTML={{
                  __html: message.content
                    .replace(/---/g, "<hr />")
                    .replace(/^###\s+(.*)$/gm, "<h3>$1</h3>")
                    .replace(/^##\s+(.*)$/gm, "<h2>$1</h2>")
                    .replace(/^#\s+(.*)$/gm, "<h1>$1</h1>")
                    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                    .replace(/^- (.*)$/gm, "<li>$1</li>")
                    .replace(/`(.*?)`/g, "<code>$1</code>")
                    .replace(
                      /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
                      "<a href='$2' target='_blank' rel='noopener noreferrer'>$1</a>"
                    )
                    .replace(/\n/g, "<br />"),
                }}
              />
              {isGenerating && <TypingIndicator />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
