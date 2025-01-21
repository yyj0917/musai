// stores/useScrollStore.ts
import { create } from 'zustand';

interface ScrollState {
  isHeaderVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;

  isGNBVisible: boolean;
  setGNBVisible: (visible: boolean) => void;

  isCategoryFixed: boolean;
  setCategoryFixed: (fixed: boolean) => void;

  isGradientVisible: boolean;
  setGradientVisible: (visible: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  isHeaderVisible: true,
  setHeaderVisible: (visible) => set({ isHeaderVisible: visible }),

  isGNBVisible: true,
  setGNBVisible: (visible) => set({ isGNBVisible: visible }),

  isCategoryFixed: false,
  setCategoryFixed: (fixed) => set({ isCategoryFixed: fixed }),

  isGradientVisible: true,
  setGradientVisible: (visible) => set({ isGradientVisible: visible }),
}));
