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

    // Step 1: Get task lists to find a valid task list ID
    console.log("Step 1: Getting task lists");
    const listsResponse = await fetch(
      "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!listsResponse.ok) {
      return NextResponse.json({
        success: false,
        message: "Failed to get task lists",
        status: listsResponse.status,
        error: await listsResponse.text(),
      });
    }

    const listsData = await listsResponse.json();
    const taskLists = listsData.items || [];

    if (taskLists.length === 0) {
      console.log("No task lists found, creating one");
      // Create a task list if none exists
      const createListResponse = await fetch(
        "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Test Tasks",
          }),
        }
      );

      if (!createListResponse.ok) {
        return NextResponse.json({
          success: false,
          message: "Failed to create task list",
          status: createListResponse.status,
          error: await createListResponse.text(),
        });
      }

      const newList = await createListResponse.json();
      taskLists.push(newList);
    }

    const taskListId = taskLists[0].id;
    console.log(`Using task list: ${taskLists[0].title} (${taskListId})`);

    // Step 2: Create a test task
    console.log("Step 2: Creating test task");
    const createTaskResponse = await fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Test task created at ${new Date().toISOString()}`,
          notes: "This is a test task created via the direct API endpoint",
        }),
      }
    );

    if (!createTaskResponse.ok) {
      return NextResponse.json({
        success: false,
        message: "Failed to create task",
        status: createTaskResponse.status,
        error: await createTaskResponse.text(),
      });
    }

    const taskData = await createTaskResponse.json();

    return NextResponse.json({
      success: true,
      message: "Test task created successfully",
      taskListId: taskListId,
      task: taskData,
    });
  } catch (error) {
    console.error("Error testing task creation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error testing task creation",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
