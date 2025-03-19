import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getGoogleAccessToken } from "@/config/googleConfig";

export async function GET() {
  try {
    // Get user ID from Clerk auth
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { connected: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Try to get Google access token
    const googleAccessToken = await getGoogleAccessToken(userId);

    return NextResponse.json({
      connected: !!googleAccessToken,
      message: googleAccessToken
        ? "Connected to Google api service"
        : "Not connected to Google api service",
    });
  } catch (error) {
    console.error("Error checking Google api service auth status:", error);
    return NextResponse.json(
      { connected: false, message: "Error checking connection status" },
      { status: 500 }
    );
  }
}
