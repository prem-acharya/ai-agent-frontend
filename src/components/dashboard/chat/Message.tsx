"use client";

import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  role: "agent" | "user";
  content: string;
  agents: string[];
  model: string;
}

export default function Message({
  role,
  content,
  agents,
  model,
}: MessageProps) {
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
        <ReactMarkdown>{content}</ReactMarkdown>
        {role === "agent" && (
          <div className="flex flex-col text-muted-foreground pt-2 text-xs">
            <p>Agents: {agents.join(", ")}</p>
            <p>Model: {model}</p>
          </div>
        )}
      </div>
    </div>
  );
}
