// useModalStore.ts
import { create } from 'zustand';

interface ModalStoreState {
  isLoginOpen: boolean;
  isLogoutOpen: boolean;
  isWithdrawOpen: boolean;
  isCancelOpen: boolean;

  openLoginModal: () => void;
  closeLoginModal: () => void;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
  openWithdrawModal: () => void;
  closeWithdrawModal: () => void;
  openCancelModal: () => void;
  closeCancelModal: () => void;
}

export const useModalStore = create<ModalStoreState>((set) => ({
  isLoginOpen: false,
  isLogoutOpen: false,
  isWithdrawOpen: false,
  isCancelOpen: false,
  openLoginModal: () => set({ isLoginOpen: true }),
  closeLoginModal: () => set({ isLoginOpen: false }),
  openLogoutModal: () => set({ isLogoutOpen: true }),
  closeLogoutModal: () => set({ isLogoutOpen: false }),
  openWithdrawModal: () => set({ isWithdrawOpen: true }),
  closeWithdrawModal: () => set({ isWithdrawOpen: false }),
  openCancelModal: () => set({ isCancelOpen: true }),
  closeCancelModal: () => set({ isCancelOpen: false }),
}));
