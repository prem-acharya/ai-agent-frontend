"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp
        signInUrl="/sign-in"
        routing="hash"
        appearance={{
          variables: {
            colorBackground: isDark ? "#212126" : "#ffffff",
            colorNeutral: isDark ? "white" : "black",
            colorPrimary: isDark ? "#ffffff" : "#000000",
            colorTextOnPrimaryBackground: isDark ? "black" : "white",
            colorText: isDark ? "white" : "black",
            colorInputText: isDark ? "white" : "black",
            colorInputBackground: isDark ? "#26262B" : "#f0f0f0",
          },
          elements: {
            providerIcon__github: { filter: isDark ? "invert(1)" : "none" },
          },
        }}
      />
    </div>
  );
}
