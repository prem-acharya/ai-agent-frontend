"use client";

import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <header className="flex justify-end w-full">
        <UserButton />
      </header>
      <div className="flex-grow">
        <p className="text-lg text-center mb-8">
          Manage your tasks and settings here.
        </p>
      </div>
    </main>
  );
}
