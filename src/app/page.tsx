"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-6xl font-bold">Ai Agent</div>
      <div className="text-xl">
        <p>Ai Agent helps you to automate your work.</p>
      </div>
      <div className="mt-4">
        <Button variant="outline">Get Started</Button>
      </div>
    </div>
  );
}
