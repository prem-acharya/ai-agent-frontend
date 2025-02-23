import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isOpen: false,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
    }),
    {
      name: "sidebar-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: unknown) => ({
        isOpen: (persistedState as Partial<SidebarStore>).isOpen ?? false,
        toggle: () => {},
        setIsOpen: () => {},
      }),
    }
  )
);
