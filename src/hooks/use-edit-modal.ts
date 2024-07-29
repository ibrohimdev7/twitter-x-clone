import { create } from "zustand";

interface EditModalState {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useEditModalStore = create<EditModalState>()((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
