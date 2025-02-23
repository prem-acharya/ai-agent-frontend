"use client";

export default function Footer() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-12 flex items-center justify-center text-xs text-muted-foreground">
        AI can make mistakes. Do your own research.
      </div>

      <div className="absolute right-4 bottom-4 flex justify-end">
        <div className="flex items-center justify-center rounded-full bg-background/5 text-xs text-muted-foreground w-6 h-6 border border-muted-foreground/25">
          ?
        </div>
      </div>
    </div>
  );
}
