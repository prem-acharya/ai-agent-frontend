"use client";

import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-end sticky top-0 z-50 p-4 bg-background/50 backdrop-blur-sm">
      <UserButton
        afterMultiSessionSingleSignOutUrl="/"
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "h-10 w-10 rounded-full",
          },
          variables: {
            colorBackground: isDark ? "#212126" : "#ffffff",
            colorNeutral: isDark ? "white" : "black",
            colorPrimary: isDark ? "#ffffff" : "#000000",
            colorTextOnPrimaryBackground: isDark ? "black" : "white",
            colorText: isDark ? "white" : "black",
            colorInputText: isDark ? "white" : "black",
            colorInputBackground: isDark ? "#26262B" : "#f0f0f0",
          },
        }}
      />
    </div>
  );
}
