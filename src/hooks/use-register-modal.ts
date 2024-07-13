import { create } from "zustand";

interface RegisterModalState {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useRegisterModalStore = create<RegisterModalState>()((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
