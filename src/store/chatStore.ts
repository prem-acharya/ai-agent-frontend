import { create } from "zustand";
import { ChatMessage } from "@/actions/chatActions";

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  model: string;
  websearch: boolean;
  reasoning: boolean;
  addMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  setModel: (model: string) => void;
  setWebsearch: (websearch: boolean) => void;
  setReasoning: (reasoning: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  model: "gemini",
  websearch: false,
  reasoning: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setModel: (model) => set({ model }),
  setWebsearch: (websearch) => set({ websearch }),
  setReasoning: (reasoning) => set({ reasoning }),
  clearMessages: () => set({ messages: [] }),
}));
