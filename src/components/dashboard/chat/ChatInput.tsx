"use client";

import { useState } from "react";
import { Plus, Earth, Lightbulb, AudioLines, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { sendMessage } from "@/actions/chatActions";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendAgentMessage: (message: {
    role: "agent";
    content: string;
    agents: string[];
    model: string;
  }) => void;

  onSendUserMessage: (message: { role: "user"; content: string }) => void;
}

export default function ChatInput({
  onSendAgentMessage,
  onSendUserMessage,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [websearch, setWebsearch] = useState(false);
  const [reasoning, setReasoning] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const response = await sendMessage([
          { role: "user", content: inputValue, websearch },
        ]);
        onSendUserMessage({
          role: "user",
          content: inputValue,
        });
        onSendAgentMessage({
          role: "agent",
          content: response.content,
          agents: response.agents,
          model: response.model || "",
        });
        console.log(response);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setInputValue("");
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col items-center z-10">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="chat-input w-full rounded-2xl p-4 flex flex-col border border-foreground/20">
            <div className="relative">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything"
                className="border-none no-resize focus-visible:ring-0 px-2 py-3 text-lg placeholder-muted-foreground w-full"
                aria-label="Ask anything"
              />
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-foreground/20">
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  aria-label="Add options"
                >
                  <Plus />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full",
                    websearch
                      ? "bg-blue-500 text-foreground hover:bg-blue-600"
                      : ""
                  )}
                  aria-label="Web Search"
                  onClick={() => setWebsearch(!websearch)}
                >
                  <Earth />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full",
                    reasoning
                      ? "bg-yellow-400 text-foreground hover:bg-yellow-500"
                      : ""
                  )}
                  aria-label="Reason"
                  onClick={() => setReasoning(!reasoning)}
                >
                  <Lightbulb />
                </Button>
              </div>
              <div className="flex items-center justify-end space-x-2">
                {inputValue ? (
                  <Button
                    type="submit"
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                    aria-label="Send message"
                  >
                    <Send />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    aria-label="Voice input"
                  >
                    <AudioLines />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center max-w-md">
          AI Agent built by{" "}
          <Link
            href="https://premacharya.vercel.app"
            className="underline text-blue-500"
            target="_blank"
          >
            Prem Acharya
          </Link>
        </p>
      </div>
    </div>
  );
}
