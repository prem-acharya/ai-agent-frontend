import { clerkClient } from "@clerk/nextjs/server";

/**
 * Gets the Google OAuth access token for a user
 * @param clerkUserId The Clerk user ID
 * @returns The access token for Google Tasks API
 */
export async function getGoogleAccessToken(
  clerkUserId: string
): Promise<string | null> {
  try {
    const clerk = await clerkClient();
    const token = await clerk.users.getUserOauthAccessToken(
      clerkUserId,
      "oauth_google"
    );

    console.log("Google OAuth token data:", token);

    if (token.data.length === 0 || token.data[0].token == null) {
      console.log("No Google OAuth token found for user");
      return null;
    }

    return token.data[0].token;
  } catch (error) {
    console.error("Error fetching Google OAuth token:", error);
    return null;
  }
}
