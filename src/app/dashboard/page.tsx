"use client";

import { Button } from "@/components/ui/button";
import { Globe, Plus, Lightbulb, AudioLines } from "lucide-react";
export default function Dashboard() {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="text-2xl md:text-3xl font-semibold">
          What can I help with?
        </div>
        <div className="flex w-full max-w-2xl flex-col gap-2 rounded-2xl md:rounded-3xl border bg-foreground/10 px-2 md:px-4 py-3 shadow-sm hover:border-foreground/20">
          <div className="flex items-center gap-4 ">
            <textarea
              style={{ resize: "none" }}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-none text-sm outline-none h-14 overflow-auto"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-transparent hover:bg-foreground/15 text-muted-foreground border-muted-foreground/30"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full bg-transparent hover:bg-foreground/15 text-muted-foreground border-muted-foreground/30 focus:bg-[#1A416A] focus:text-blue-400"
              >
                <Globe className="h-4 w-4" />
                Search
              </Button>
              <Button
                variant="outline"
                className="rounded-full bg-transparent hover:bg-foreground/15 text-muted-foreground border-muted-foreground/30 focus:bg-yellow-200 focus:text-slate-700"
              >
                <Lightbulb className="h-4 w-4" />
                Reason
              </Button>
            </div>
            <div>
              <Button
                variant="default"
                size="icon"
                className="rounded-full bg-foreground hover:bg-foreground/70 text-muted-foreground"
                aria-label="Voice input"
              >
                <AudioLines className="h-5 w-5 text-background" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
