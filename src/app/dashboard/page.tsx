"use client";

import { UserButton } from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";

export default function Dashboard() {
  // const userData = auth();
  // console.log(userData);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <header className="flex justify-end w-full">
        <div className="flex items-center gap-2">
          <UserButton />
        </div>
      </header>
      <div className="flex-grow">
        <p className="text-lg text-center mb-8">
          Manage your tasks and settings here.
        </p>
      </div>
    </main>
  );
}
