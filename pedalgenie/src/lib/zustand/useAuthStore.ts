// src/stores/authStore.ts
import {create} from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  setLoggedIn: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,

  // Access Token 저장
  setAccessToken: (token) => set({ accessToken: token }),

  // 로그인 상태 설정
  setLoggedIn: (status) => set({ isLoggedIn: status }),
}));
