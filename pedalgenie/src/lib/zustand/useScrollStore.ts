// stores/useScrollStore.ts
import { create } from 'zustand';

interface ScrollState {
  isHeaderVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;
  isGNBVisible: boolean;
  setGNBVisible: (visible: boolean) => void;
  isCategoryFixed: boolean;
  setCategoryFixed: (fixed: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  isHeaderVisible: true,
  isGNBVisible: true,
  isCategoryFixed: false,
  setHeaderVisible: (visible) => set({ isHeaderVisible: visible }),
  setGNBVisible: (visible) => set({ isGNBVisible: visible }),
  setCategoryFixed: (fixed) => set({ isCategoryFixed: fixed }),
}));
