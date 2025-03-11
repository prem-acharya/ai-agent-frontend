"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserButton } from "@clerk/nextjs";
import { useChatStore } from "@/store/chatStore";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const models = [
  {
    value: "gemini",
    label: "Gemini 2.0 Flash",
    icon: "/model/google.svg",
    invert: "false",
  },
  {
    value: "gpt4o",
    label: "GPT-4o",
    icon: "/model/chatgpt.svg",
    invert: "true",
  },
  // {
  //   value: "gpt-4o-mini",
  //   label: "GPT-4o Mini",
  //   icon: "/model/chatgpt.svg",
  // },
];

export const Header = () => {
  const { model, setModel } = useChatStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex pr-4 pl-4 h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger
              className="focus-visible:ring-0"
              aria-label="Select AI Model"
            >
              <div className="flex items-center gap-2">
                <SelectValue placeholder="Select AI Model" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem
                  key={model.value}
                  value={model.value}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={model.icon}
                      alt={model.label}
                      width={20}
                      height={20}
                      className={cn(
                        model.invert === "true" ? "invert" : "brightness-100"
                      )}
                    />
                    {model.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};
