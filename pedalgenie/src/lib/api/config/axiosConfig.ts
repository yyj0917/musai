import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore, useLoginStore } from '@/lib/zustand/useAuthStore';
import { refetchAccessToken } from '../auth';
import { use } from 'react';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefetchLock = false; // 중복 재발급 방지를 위한 플래그 -> Spin Lock 형태로 동시성 제어.
let refreshQueue: Array<() => void> = [];
// 토큰 재발급 대기중인 요청들을 순차적으로 처리하기 위한 큐 -> spinLock처럼 하나의 재발급 요청만 처리하도록 함
// 요청 인터셉터 - zustand에 있는 토큰 가져와서 헤더에 담아서 보내는 instance
// request interceptor에서 accessToken이 없을 때 Cookie에 있는 refreshToken으로 재발급 요청 로직 구현
axiosInstance.interceptors.request.use(
  async (config) => {
    // 재발급 요청 + /api로 시작하는 api 요청은 토큰이 필요없는 호출. 따로 처리
    // isLoggedIn 확인으로 로그인되어있으면 토큰 넣어서 요청
    // 토큰이 없으면 재발급 요청
    const { accessToken } = useAuthStore.getState();
    const { isLoggedIn } = useLoginStore.getState();

    // 1) 재발급 엔드포인트는 Interceptor 로직 스
    if (config.url?.includes('/api/reissue')) {
      return config;
    }

    // 3) "로그인 상태인데 accessToken이 없다" → 재발급 필요
    if (isLoggedIn && !accessToken) {
      if (isRefetchLock) {
        // [Case A] 이미 다른 요청이 재발급 중인 상황
        //    → 대기 열에 넣는다.
        return new Promise((resolve) => {
          refreshQueue.push(() => {
            // 이제는 store에 새 토큰이 있을 것
            const finalToken = useAuthStore.getState().accessToken;
            if (finalToken) {
              config.headers!['Authorization'] = `Bearer ${finalToken}`;
            }
            resolve(config);
          });
        });
      } else {
        // [Case B] 이 요청이 "처음으로 재발급을 수행"하게 됨
        isRefetchLock = true;
        try {
          const newToken = await refetchAccessToken();
          useAuthStore.getState().setAccessToken(newToken);
          // 여기까지 오면 재발급 성공
        } catch (err) {
          // 실패 시 로그아웃 처리 등
          useLoginStore.getState().setLoggedOut();
        } finally {
          // 뮤텍스 해제 + 큐에 쌓인 요청들 진행
          isRefetchLock = false;
          refreshQueue.forEach((cb) => cb());
          refreshQueue = [];
        }

        // ★ 재발급이 "이 요청"에서 끝났으므로,
        //   이미 accessToken이 Store에 세팅되었을 것.
        const finalToken = useAuthStore.getState().accessToken;
        if (finalToken) {
          config.headers!['Authorization'] = `Bearer ${finalToken}`;
        }

        return config;
      }
    }

    // 4) 토큰이 이미 있으면 그냥 헤더 세팅
    if (accessToken) {
      config.headers!['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 헤더에 Authorization이 있는지 확인
    const newAccessToken = response.headers['authorization']?.split(' ')[1]; // 'Bearer <token>' 형식에서 토큰만 추출
    if (newAccessToken) {
      // Access Token을 상태에 저장
      useAuthStore.getState().setAccessToken(newAccessToken);
    }
    return response;
  },
  async (error) => {
    // 에러 처리 로직 - 401 -> 쿠키에 리프레시 토큰이 없어서 그냥 아예 로그아웃 상태.
    const { response } = error;

    if (response?.status === 401) {
      // 로그아웃 처리
      useLoginStore.getState().setLoggedOut();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
