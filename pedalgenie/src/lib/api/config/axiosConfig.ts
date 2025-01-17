import axios from 'axios';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { refetchAccessToken } from '../auth';
import { use } from 'react';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터 - zustand에 있는 토큰 가져와서 헤더에 담아서 보내는 instance
axiosInstance.interceptors.request.use(
  (config) => {
    // const accessToken = queryClient.getQueryData<string>(['authToken']);

    const accessToken = useAuthStore.getState().accessToken;
    // const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzM2OTU2NjU3LCJleHAiOjE3MzcwNDMwNTd9.PU3wycESDwk_2sDS6KGld-WrJCDcn2_yiLTEAF69Mkk';
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
let isRefreshing = false; // 재발급 상태를 관리하는 플래그

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
    const { response, config } = error;

    if (response?.status === 401 && !config.__isRetryRequest && !isRefreshing) {
      config.__isRetryRequest = true; // 재요청 여부 플래그 + 요구되는 api 호출의 재요청
      isRefreshing = true; // 재발급 요청 상태 설정

      try {
        // 리프레시 토큰으로 AccessToken 재발급 + 첫 재요청
        const refetchToken = await refetchAccessToken(); // 토큰 재발급 함수 호출 - reissue api 재요청을 제어해야 함
        useAuthStore.getState().setAccessToken(refetchToken);
        useAuthStore.getState().setLoggedIn(true); 
        
        // 새로 받은 AccessToken으로 재요청
        config.headers['Authorization'] = `Bearer ${refetchToken}`;
        return axiosInstance.request(config);

      } catch (refreshError) {
        // 재발급도 실패한 경우 로그아웃 처리
        useAuthStore.getState().setLoggedIn(false); // Zustand 상태 변경
      } finally {
        isRefreshing = false; // 재발급 상태 초기화
      }
    }
    return Promise.reject(error);
  }
);



export default axiosInstance;
