import axiosConfig from "@/services/axiosConfig";

export interface UserMessage {
  role: "user";
  content: string;
  websearch: boolean;
}

export interface AgentMessage {
  role: "agent";
  content: string;
  error?: string | null;
  agents: string[];
  model: string;
}

interface StreamMode {
  reasoning: "reasoning";
  answer: "answer";
}

interface StreamChunk {
  type: "start" | "content" | "end";
  mode: keyof StreamMode;
  model: string;
  text?: string;
  tools?: string[];
}

interface ChatRequest {
  messages: UserMessage[];
  model: string;
  websearch: boolean;
  reasoning: boolean;
}

const processStreamChunks = (chunks: StreamChunk[]): AgentMessage => {
  const answerChunk = chunks.find(
    (chunk) => chunk.type === "content" && chunk.mode === "answer"
  );

  if (!answerChunk?.text) {
    throw new Error("No valid answer received from API");
  }

  return {
    role: "agent",
    content: answerChunk.text,
    error: null,
    agents: answerChunk.tools
      ? ["AI Agent", ...answerChunk.tools]
      : ["AI Agent"],
    model: answerChunk.model,
  };
};

export const sendMessage = async (
  messages: UserMessage[]
): Promise<AgentMessage> => {
  if (!messages.length) {
    throw new Error("No messages provided");
  }

  try {
    const response = await axiosConfig.post<string>(
      "/api/v1/chat",
      {
        messages,
        model: "gpt4o",
        websearch: messages[0].websearch,
        reasoning: true,
      } satisfies ChatRequest,
      {
        responseType: "text",
      }
    );

    if (!response.data) {
      throw new Error("No response data received from API");
    }

    const chunks = response.data
      .split("\n")
      .filter(Boolean)
      .map((chunk) => JSON.parse(chunk) as StreamChunk);

    return processStreamChunks(chunks);
  } catch (error) {
    console.error("[Chat Action] Error sending message:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send message"
    );
  }
};
