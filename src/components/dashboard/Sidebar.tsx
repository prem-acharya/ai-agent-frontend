"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal, Zap, Search, Plus } from "lucide-react";
import { useIsMobile } from "@/hook/use-mobile";
import { useSidebarStore } from "@/hook/use-sidebar";
import { cn } from "@/lib/utils";

interface TimeGroup {
  title: string;
  items: Array<{
    id: string;
    title: string;
  }>;
}

const timeGroups: TimeGroup[] = [
  {
    title: "Today",
    items: [
      {
        id: "1",
        title: "Clerk redirect in Next.js",
      },
    ],
  },
  {
    title: "Yesterday",
    items: [
      {
        id: "2",
        title: "Git Merge Summary",
      },
      {
        id: "3",
        title: "AI Agent Domain Ideas",
      },
    ],
  },
  {
    title: "Previous 7 Days",
    items: [
      {
        id: "4",
        title: "Git Commit Message Guide",
      },
      {
        id: "5",
        title: "Setup Husky in Next.js",
      },
      {
        id: "6",
        title: "Next.js Git Commit Message",
      },
    ],
  },
  {
    title: "Previous 30 Days",
    items: [
      {
        id: "7",
        title: "Git Commit Message Guide",
      },
      {
        id: "8",
        title: "Setup Husky in Next.js",
      },
      {
        id: "9",
        title: "Next.js Git Commit Message",
      },
      {
        id: "10",
        title: "Next.js Git Commit Message",
      },
      {
        id: "11",
        title: "Next.js Git Commit Message",
      },
    ],
  },
];

const ChatItem = ({ title, id }: { title: string; id: string }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { toggle } = useSidebarStore();

  const handleClick = () => {
    router.push(`/dashboard/chat/${id}`);
    if (isMobile) {
      toggle();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="group flex items-center justify-between rounded-lg px-3 py-2 hover:bg-accent/50 pl-2"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className="truncate text-sm font-light">{title}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 opacity-0 group-hover:opacity-100"
        aria-label="More options"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function Sidebar() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isOpen, setIsOpen } = useSidebarStore();
  const [mounted, setMounted] = React.useState(false);

  // Handle initial mount
  React.useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem("sidebar-store")) {
      setIsOpen(!isMobile);
    }
  }, [mounted, isMobile, setIsOpen]);

  const handleNewChat = () => {
    router.push("/dashboard/chat/new");
    if (isMobile) {
      setIsOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-xs z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          "flex h-screen flex-col border-r bg-background transition-all duration-300",
          isOpen ? "w-72" : "w-0",
          isMobile && "fixed left-0 top-0 z-50",
          !isOpen && "opacity-0"
        )}
      >
        <div className="flex h-16 items-center px-4 pb-2 pt-4">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg"
              onClick={handleNewChat}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg"
              onClick={handleNewChat}
            >
              <Plus size={22} strokeWidth={2.5} />
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-6 py-4">
            {timeGroups.map((group) => (
              <div key={group.title}>
                <div className="mb-2 px-2 text-xs text-muted-foreground">
                  {group.title}
                </div>
                <div className="">
                  {group.items.map((item) => (
                    <ChatItem key={item.id} id={item.id} title={item.title} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex h-20 items-center px-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 h-18 bg-foreground/5"
          >
            <div className="flex items-center justify-center rounded-full bg-muted-foreground/10 p-2">
              <Zap className="h-4 w-4 " />
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="text-sm font-semibold">Upgrade to Pro</div>
              <div className="text-xs text-muted-foreground">
                More access to AI tools
              </div>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
