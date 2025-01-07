// stores/useScrollStore.ts
import { create } from 'zustand';

interface ScrollState {
  isHeaderVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  isHeaderVisible: true,
  setHeaderVisible: (visible) => set({ isHeaderVisible: visible }),
}));
