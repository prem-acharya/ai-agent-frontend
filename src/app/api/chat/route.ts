import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getGoogleAccessToken } from "@/config/googleConfig";

export async function POST(request: NextRequest) {
  try {
    const { content, model, websearch, reasoning } = await request.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Message content is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get user ID from Clerk auth
    const { userId } = await auth();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("API URL:", apiUrl);
    // Only attempt to get Google access token if user is authenticated
    let googleAccessToken = null;
    if (userId) {
      googleAccessToken = await getGoogleAccessToken(userId);
      console.log("Got Google access token:", googleAccessToken ? "Yes" : "No");
    }

    const response = await fetch(`${apiUrl}/api/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        model,
        websearch,
        reasoning,
        google_access_token: googleAccessToken,
      }),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to communicate with AI service" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { readable, writable } = new TransformStream();

    const reader = response.body?.getReader();
    const writer = writable.getWriter();

    if (reader) {
      const processStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              await writer.close();
              break;
            }

            await writer.write(value);
          }
        } catch (error) {
          console.error("Error processing stream:", error);
          await writer.abort(error);
        }
      };

      processStream();
    }

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error in chat API route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
