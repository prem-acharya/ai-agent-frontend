"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Search, Lightbulb, Mic, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingShapes from "@/components/dashboard/FloatingShapes";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("Submitted:", inputValue);
      setInputValue("");
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      focusInput();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 chat-container relative overflow-hidden">
      <FloatingShapes />

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-light mb-8 text-center gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          What can I help with?
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div
            className={`chat-input w-full rounded-2xl p-4 flex flex-col ${
              isInputFocused ? "shadow-lg" : ""
            }`}
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="Ask anything"
                className="bg-transparent outline-hidden px-2 py-3 text-lg placeholder-gray-400 w-full"
                aria-label="Ask anything"
              />

              <AnimatePresence>
                {inputValue && (
                  <motion.button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <motion.button
                  type="button"
                  className="icon-button p-2 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Add options"
                >
                  <Plus size={20} className="text-gray-300" />
                </motion.button>

                <motion.button
                  type="button"
                  className="icon-button flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Search"
                >
                  <Search size={16} className="text-gray-300" />
                  <span className="text-gray-300">Search</span>
                </motion.button>

                <motion.button
                  type="button"
                  className="icon-button flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Reason"
                >
                  <Lightbulb size={16} className="text-gray-300" />
                  <span className="text-gray-300">Reason</span>
                </motion.button>
              </div>

              <motion.button
                type="button"
                className="mic-button p-2 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Voice input"
              >
                <Mic size={20} className="text-white" />
              </motion.button>
            </div>
          </div>
        </motion.form>

        <motion.p
          className="text-gray-400 text-sm mt-6 text-center max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Ask me anything about your project, creative ideas, or technical
          questions.
        </motion.p>
      </div>
    </main>
  );
}
