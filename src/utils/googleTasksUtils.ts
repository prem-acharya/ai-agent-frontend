/**
 * Checks if the current user has connected their Google Tasks account
 * @returns A promise that resolves to a boolean indicating if Google Tasks is connected
 */
export async function isGoogleTasksConnected(): Promise<boolean> {
  try {
    const response = await fetch("/api/google/tasks/auth-status");

    if (!response.ok) {
      console.error("Failed to check Google Tasks connection status");
      return false;
    }

    const data = await response.json();
    return data.connected;
  } catch (error) {
    console.error("Error checking Google Tasks connection:", error);
    return false;
  }
}

/**
 * Gets the appropriate message to display based on Google Tasks connection status
 * @param isConnected Whether Google Tasks is connected
 * @returns A message to display to the user
 */
export function getTasksConnectionMessage(isConnected: boolean): string {
  return isConnected
    ? "Connected to Google Tasks"
    : "To use Google Tasks features, please connect your Google account with Tasks scope";
}
