"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        signUpUrl="/sign-up"
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
