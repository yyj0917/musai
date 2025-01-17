// useModalStore.ts
import { create } from 'zustand';

interface ModalStoreState {
  isLoginOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  isLogoutOpen: boolean;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;

  isWithdrawOpen: boolean;
  openWithdrawModal: () => void;
  closeWithdrawModal: () => void;

  isCancelOpen: boolean;
  openCancelModal: () => void;
  closeCancelModal: () => void;

  isFloatingButton: boolean;
  setFloatingButton: (isFloatingButton: boolean) => void;

  isEmployCheckOpen: boolean;
  openEmployCheckModal: () => void;
  closeEmployCheckModal: () => void;
}

export const useModalStore = create<ModalStoreState>((set) => ({
  isLoginOpen: false,
  openLoginModal: () => set({ isLoginOpen: true }),
  closeLoginModal: () => set({ isLoginOpen: false }),

  isLogoutOpen: false,
  openLogoutModal: () => set({ isLogoutOpen: true }),
  closeLogoutModal: () => set({ isLogoutOpen: false }),

  isWithdrawOpen: false,
  openWithdrawModal: () => set({ isWithdrawOpen: true }),
  closeWithdrawModal: () => set({ isWithdrawOpen: false }),

  isCancelOpen: false,
  openCancelModal: () => set({ isCancelOpen: true }),
  closeCancelModal: () => set({ isCancelOpen: false }),

  isFloatingButton: false,
  setFloatingButton: (isFloatingButton) => set({ isFloatingButton }),

  isEmployCheckOpen: false,
  openEmployCheckModal: () => set({ isEmployCheckOpen: true }),
  closeEmployCheckModal: () => set({ isEmployCheckOpen: false }),
}));
