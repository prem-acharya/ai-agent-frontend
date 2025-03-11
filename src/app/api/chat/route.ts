import { NextRequest } from "next/server";

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

    const response = await fetch(
      "https://aiagent-prem-api.vercel.app/api/v1/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          model,
          websearch,
          reasoning,
        }),
      }
    );

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
