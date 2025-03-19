export interface ChatMessage {
  role: "user" | "agent";
  content: string;
}

export interface ChatRequest {
  content: string;
  model: string;
  websearch: boolean;
  reasoning: boolean;
  google_access_token?: string | null;
}

export async function sendChatMessage(request: ChatRequest): Promise<Response> {
  try {
    // Check if we need to add Google Tasks token
    if (
      request.content.toLowerCase().includes("task") ||
      request.content.toLowerCase().includes("todo") ||
      request.content.toLowerCase().includes("reminder")
    ) {
      try {
        // Get Google Tasks authentication status
        const authResponse = await fetch("/api/google/auth-status");
        if (authResponse.ok) {
          const authData = await authResponse.json();
          if (authData.connected) {
            console.log(
              "Google Tasks is connected, including token in request"
            );
            // The token will be retrieved on the server side
          } else {
            console.log("Google Tasks is not connected");
          }
        }
      } catch (error) {
        console.error("Error checking Google Tasks auth:", error);
      }
    }

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
