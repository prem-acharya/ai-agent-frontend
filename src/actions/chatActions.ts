export interface ChatMessage {
  role: "user" | "agent";
  content: string;
}

export interface ChatRequest {
  content: string;
  model: string;
  websearch: boolean;
  reasoning: boolean;
}

export async function sendChatMessage(request: ChatRequest): Promise<Response> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
}
