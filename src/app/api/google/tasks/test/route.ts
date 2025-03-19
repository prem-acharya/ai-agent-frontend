import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getGoogleAccessToken } from "@/config/googleConfig";

export async function GET() {
  try {
    // Get user ID from Clerk auth
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Try to get Google access token
    const googleAccessToken = await getGoogleAccessToken(userId);

    if (!googleAccessToken) {
      return NextResponse.json({
        success: false,
        message:
          "No Google access token available. Please connect your Google account with Tasks scope.",
      });
    }

    // Test the Google Tasks API by listing task lists
    const response = await fetch(
      "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({
        success: false,
        message: "Error accessing Google Tasks API",
        status: response.status,
        error: errorData,
      });
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Successfully connected to Google Tasks API",
      taskLists: data.items || [],
    });
  } catch (error) {
    console.error("Error testing Google Tasks API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error testing Google Tasks API",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
