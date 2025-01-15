// src/stores/authStore.ts
import {create} from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  setAccessToken: (token: string | undefined) => void;
  setLoggedIn: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    // false로 고쳐야 함. 지금은 개발용 임시 true
    isLoggedIn: true,
    accessToken: null,

    // Access Token 저장
    setAccessToken: (token) => set({ accessToken: token }),

    // 로그인 상태 설정
    setLoggedIn: (status) => set({ isLoggedIn: status }),
}));
