"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Globe, BrainIcon, Trash2Icon } from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import { sendChatMessage } from "@/actions/chatActions";

// Function to add random typing delay
const createTypingDelay = () => {
  // Word-level delay (0ms - 2ms )
  return Math.floor(Math.random() * 2) + 1;
};

export const ChatInput = () => {
  const [input, setInput] = useState("");

  const {
    addMessage,
    setLoading,
    model,
    websearch,
    setWebsearch,
    reasoning,
    setReasoning,
    clearMessages,
  } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    try {
      // Set loading state to true at the beginning
      setLoading(true);
      setInput("");

      // Add user message
      addMessage({
        role: "user",
        content: trimmedInput,
      });

      // Add an empty agent message that will be filled with the response
      addMessage({ role: "agent", content: "" });

      const response = await sendChatMessage({
        content: trimmedInput,
        model,
        websearch,
        reasoning,
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const messages = useChatStore.getState().messages;
      const lastIndex = messages.length - 1;

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (reader) {
        let accumulatedContent = "";

        // Short initial delay before starting to type
        await new Promise((resolve) => setTimeout(resolve, 100));

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Ensure the final content is set
            const finalMessages = [...useChatStore.getState().messages];
            finalMessages[lastIndex] = {
              ...finalMessages[lastIndex],
              content: accumulatedContent,
            };
            useChatStore.setState({ messages: finalMessages });
            break;
          }

          const chunk = decoder.decode(value);

          // Process strictly word by word for precise dot following
          // Split by whitespace, preserving whitespace and punctuation
          const words = chunk.match(/\S+|\s+|[,.!?;:'"()[\]{}]/g) || [];

          for (const word of words) {
            if (!word) continue;

            accumulatedContent += word;

            // Update the message content with the accumulated content
            const updatedMessages = [...useChatStore.getState().messages];
            updatedMessages[lastIndex] = {
              ...updatedMessages[lastIndex],
              content: accumulatedContent,
            };

            useChatStore.setState({ messages: updatedMessages });

            // Add a variable delay between words to simulate typing
            // Use longer delays for words, shorter for spaces/punctuation
            const delay = /\S+/.test(word) ? createTypingDelay() : 30;
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const messages = useChatStore.getState().messages;
      const updatedMessages = [...messages];
      updatedMessages[updatedMessages.length - 1] = {
        role: "agent",
        content: "Server is under maintenance. Please try again later. 😊",
      };
      useChatStore.setState({ messages: updatedMessages });
    } finally {
      // Set loading state to false when everything is done
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex justify-center sticky bottom-0">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="flex flex-col gap-2 border rounded-3xl p-3">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="min-h-20 resize-none flex-1 border-none focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                type="button"
                variant={websearch ? "default" : "outline"}
                size="icon"
                onClick={() => setWebsearch(!websearch)}
                className="flex items-center gap-1 rounded-full"
                title="Enable web search"
              >
                <Globe className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant={reasoning ? "default" : "outline"}
                size="icon"
                onClick={() => setReasoning(!reasoning)}
                className="flex items-center gap-1 rounded-full"
                title="Enable reasoning"
              >
                <BrainIcon className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={clearMessages}
                className="flex items-center gap-1 rounded-full"
                title="Clear chat"
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>

            <Button
              type="submit"
              size="icon"
              className="rounded-full"
              disabled={!input.trim() || useChatStore.getState().isLoading}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
