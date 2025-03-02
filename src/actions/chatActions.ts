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

export const sendMessage = async (messages: UserMessage[]) => {
  try {
    const response = await axiosConfig.post("/api/v1/chat", {
      messages,
      websearch: messages[0].websearch,
    });

    const data = response.data;

    const message: AgentMessage = {
      role: "agent",
      content: data.response,
      error: data.error,
      agents: data.agent ? [data.agent] : [""],
      model: data.model || "gpt-4o",
    };

    return message;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
