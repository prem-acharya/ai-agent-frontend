"use client";

import { useParams } from "next/navigation";

export default function ChatPage() {
  const { chatId } = useParams();

  return <div>Chat Page for Chat ID: {chatId}</div>;
}
