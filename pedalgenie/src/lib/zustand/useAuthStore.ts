// src/stores/authStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | undefined) => void;
}
interface LoginState {
  isLoggedIn: boolean;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // false로 고쳐야 함. 지금은 개발용 임시 true
  isLoggedIn: false,
  accessToken: null,

  // Access Token 저장
  setAccessToken: (token) => set({ accessToken: token }),

  // 로그인 상태 설정
}));

// 로그인 상태 세션 스토리지에 저장 - isLoggedIn
export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      // numberA 증가 함수
      setLoggedIn: () =>
        set((state) => ({
          isLoggedIn: (state.isLoggedIn = true),
        })),
      setLoggedOut: () =>
        set((state) => ({
          isLoggedIn: (state.isLoggedIn = false),
        })),
    }),
    {
      name: 'login-storage', // 저장소 key값
      storage: createJSONStorage(() => localStorage), // 저장소
      version: 1.0, // version 정보
    },
  ),
);
