"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { useSidebarStore } from "@/hook/use-sidebar";
import { cn } from "@/lib/utils";

export default function Header() {
  const { isOpen, setIsOpen } = useSidebarStore();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={cn(
        "sticky top-0 flex h-16 w-full shrink-0 items-center px-6",
        isOpen ? "z-0" : "z-50"
      )}
    >
      <div className="flex flex-1 items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10 rounded-lg bg-transparent hover:bg-foreground/15 border",
            isOpen ? "opacity-0" : "opacity-100"
          )}
          onClick={handleToggle}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
        <div
          className={cn(
            "text-lg font-semibold",
            isOpen ? "opacity-0" : "opacity-100"
          )}
        >
          Chat with AI
        </div>
      </div>
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "h-8 w-8 rounded-full",
          },
        }}
      />
    </header>
  );
}
