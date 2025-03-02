"use client";

import { cn } from "@/lib/utils";

interface MessageProps {
  role: "agent" | "user";
  content: string;
}

export default function Message({ role, content }: MessageProps) {
  const isUser = role === "user";
  return (
    <div
      className={cn("flex", isUser ? "justify-end" : "justify-start", "my-2")}
    >
      <div
        className={cn(
          "max-w-xl p-3 rounded-2xl text-sm",
          isUser ? "bg-foreground/10" : ""
        )}
      >
        {content}
      </div>
    </div>
  );
}
