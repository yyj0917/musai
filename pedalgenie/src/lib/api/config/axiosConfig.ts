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

    // 재발급 요청은 스킵
    if (config.url?.includes('/api')) {
      return config;
    }
    const { accessToken, setAccessToken } = useAuthStore.getState();

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
      // config.__isRetryRequest = true; // 재요청 여부 플래그 + 요구되는 api 호출의 재요청
      // isRefreshing = true; // 재발급 요청 상태 설정

      // try {
      //   // 리프레시 토큰으로 AccessToken 재발급 + 첫 재요청
      //   console.log('refreshing token');
      //   const refetchToken = await refetchAccessToken(); // 토큰 재발급 함수 호출 - reissue api 재요청을 제어해야 함
      //   useAuthStore.getState().setAccessToken(refetchToken);
      //   useLoginStore.getState().setLoggedIn(); // 세션 스토리지에 상태 반영 -> 로그인
        
      //   // 새로 받은 AccessToken으로 재요청
      //   config.headers['Authorization'] = `Bearer ${refetchToken}`;
      //   return axiosInstance.request(config);

      // } catch (refreshError) {
      //   // 재발급도 실패한 경우 로그아웃 처리
      //   useLoginStore.getState().setLoggedOut(); // Zustand 상태 변경 및 스토리지에서 삭제 -> 로그아웃
      // } finally {
      //   isRefreshing = false; // 재발급 상태 초기화
      // }
      console.error('401 응답', error.message);
    }
    return Promise.reject(error);
  }
);



export default axiosInstance;
