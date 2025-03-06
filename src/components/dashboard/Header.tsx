"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserButton } from "@clerk/nextjs";

const models = [
  { value: "gemini", label: "Gemini 2.0 Flash" },
  { value: "gpt4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="flex pr-4 pl-4 h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="gemini">
            <SelectTrigger className="w-[180px]" aria-label="Select AI Model">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem
                  key={model.value}
                  value={model.value}
                  className="cursor-pointer"
                >
                  {model.label}
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
