import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getGoogleAccessToken } from "@/config/googleConfig";

export async function POST(request: NextRequest) {
  try {
    // Get user ID from Clerk auth
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Get the task details from the request body
    const { title, notes, due } = await request.json();

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Task title is required" },
        { status: 400 }
      );
    }

    // Get Google Tasks access token
    const googleAccessToken = await getGoogleAccessToken(userId);

    if (!googleAccessToken) {
      return NextResponse.json({
        success: false,
        message:
          "No Google access token available. Please connect your Google account with Tasks scope.",
      });
    }

    // Step 1: Get or create a task list
    console.log("Getting task lists");
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

    let taskListId: string;

    if (taskLists.length === 0) {
      console.log("No task lists found, creating one");
      const createListResponse = await fetch(
        "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "AI Assistant Tasks",
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
      taskListId = newList.id;
    } else {
      taskListId = taskLists[0].id;
    }

    console.log(`Using task list ID: ${taskListId}`);

    // Define interface for task data
    interface TaskData {
      title: string;
      notes?: string;
      due?: string;
    }

    // Step 2: Create the task
    const taskData: TaskData = { title };

    if (notes) {
      taskData.notes = notes;
    }

    // Format due date if provided
    if (due) {
      let dueDate = due;

      if (due.toLowerCase() === "today") {
        const today = new Date();
        dueDate = `${today.toISOString().split("T")[0]}T00:00:00.000Z`;
      } else if (due.toLowerCase() === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dueDate = `${tomorrow.toISOString().split("T")[0]}T00:00:00.000Z`;
      } else if (due.length === 10) {
        // YYYY-MM-DD format
        dueDate = `${due}T00:00:00.000Z`;
      }

      taskData.due = dueDate;
    }

    console.log("Creating task with data:", taskData);

    const createTaskResponse = await fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
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

    const createdTask = await createTaskResponse.json();

    return NextResponse.json({
      success: true,
      message: "Task created successfully",
      task: createdTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { success: false, message: "Error creating task", error: String(error) },
      { status: 500 }
    );
  }
}
