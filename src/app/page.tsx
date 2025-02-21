"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Bot, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl text-center space-y-8">
        <div className="space-y-4">
          <div className="text-6xl pb-2 font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            AI Agent
          </div>
          <p className="text-xl text-muted-foreground">
            Automate your work with our intelligent solutions powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
          <div className="p-4 border border-primary flex flex-col items-center justify-center rounded-lg bg-card">
            <Bot className="w-8 h-8 mb-2 text-primary" />
            <div className="font-semibold">Smart Automation</div>
            <p className="text-sm text-muted-foreground">
              Automate tasks with AI
            </p>
          </div>
          <div className="p-4 border border-primary flex flex-col items-center justify-center rounded-lg bg-card">
            <Sparkles className="w-8 h-8 mb-2 text-primary" />
            <div className="font-semibold">Intelligent Analysis</div>
            <p className="text-sm text-muted-foreground">
              Get insights from your data
            </p>
          </div>
          <div className="p-4 border border-primary flex flex-col items-center justify-center rounded-lg bg-card">
            <Zap className="w-8 h-8 mb-2 text-primary" />
            <div className="font-semibold">Quick Results</div>
            <p className="text-sm text-muted-foreground">
              Fast and efficient processing
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="default"
                size="lg"
                className="group rounded-full"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl="/dashboard"
              forceRedirectUrl="/dashboard"
            >
              <Button
                variant="default"
                size="lg"
                className="group rounded-full"
              >
                Sign Up
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
