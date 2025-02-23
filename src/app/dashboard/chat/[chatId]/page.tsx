"use client";

import { useParams } from "next/navigation";

export default function ChatPage() {
  const { chatId } = useParams();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div>Chat Page for Chat ID: {chatId}</div>
    </div>
  );
}
