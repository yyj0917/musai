import axios from 'axios';
import { useAuthStore, useLoginStore } from '@/lib/zustand/useAuthStore';
import { refetchAccessToken } from '../auth';
import { use } from 'react';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


let isRefreshing = false; // 중복 재발급 방지를 위한 플래그
let refreshQueue: Array<() => void> = []; 
// 토큰 재발급 대기중인 요청들을 순차적으로 처리하기 위한 큐 -> spinLock처럼 하나의 재발급 요청만 처리하도록 함

// 요청 인터셉터 - zustand에 있는 토큰 가져와서 헤더에 담아서 보내는 instance
// request interceptor에서 accessToken이 없을 때 Cookie에 있는 refreshToken으로 재발급 요청 로직 구현
axiosInstance.interceptors.request.use(
  async (config) => {

    // 재발급 요청 + /api로 시작하는 api 요청은 토큰이 필요없는 호출. 따로 처리 
    // isLoggedIn 확인으로 로그인되어있으면 토큰 넣어서 요청
    // 토큰이 없으면 재발급 요청
    const { accessToken, setAccessToken } = useAuthStore.getState();
    if (config.url?.includes('/api')) {
      if (useLoginStore.getState().isLoggedIn) {
        if (accessToken) {
          config.headers!['Authorization'] = `Bearer ${accessToken}`;
        } else {
          const newToken = await refetchAccessToken();
          setAccessToken(newToken);
          config.headers!['Authorization'] = `Bearer ${newToken}`;
        }
      }
      return config;
    }

    // 토큰이 없거나 이미 만료되었으면 -> 선(先) 재발급
    if (!accessToken) {
      // 이미 다른 요청이 재발급 중이면, 끝날 때까지 대기
      if (isRefreshing) {
        // Promise를 만들어 refreshQueue에 넣고, refresh 후 resolve - 누가 재발급 요청중이면 큐에서 대기.
        await new Promise<void>((resolve) => {
          refreshQueue.push(resolve);
        });
      } else {
        // 재발급 시작
        isRefreshing = true;
        try {
          const newToken = await refetchAccessToken(); 
          setAccessToken(newToken);
        } catch (err) {
          // 재발급 실패 -> Cookie에 refreshToken이 없거나 만료됨 -> 로그아웃
          useLoginStore.getState().setLoggedOut();
          throw err;
        } finally {
          isRefreshing = false;
          // 재발급 대기중이던 요청들 이어가기
          refreshQueue.forEach((cb) => cb());
          refreshQueue = [];
        }
      }
    }
    // 이미 다른 곳에서 토큰이 갱신되었을 수 있으니 다시 읽기
    const finalToken = useAuthStore.getState().accessToken;
    if (finalToken) {
      config.headers!['Authorization'] = `Bearer ${finalToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
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

    if (response?.status === 401 ) {
      // 로그아웃 처리
      useLoginStore.getState().setLoggedOut();
    }
    return Promise.reject(error);
  }
);



export default axiosInstance;
