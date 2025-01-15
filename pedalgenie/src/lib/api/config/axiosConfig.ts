import axios from 'axios';
import { useAuthStore } from '@/lib/zustand/useAuthStore';


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
    // const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzM2NzY2OTU1LCJleHAiOjE3MzY4NTMzNTV9.C23ZGdq4aGYI72Po1QUl2BEjtWY2O-UilSj5gAYWcXs';
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
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
  (error) => {
    // 에러 처리 로직 - 401 -> 쿠키에 리프레시 토큰이 없어서 그냥 아예 로그아웃 상태.
    const { response } = error;

    if (response?.status === 401) {
      const authStore = useAuthStore.getState();
      
      // 로그아웃 상태 처리
      authStore.setLoggedIn(false);

      // 추가적으로 로그아웃 페이지로 리다이렉트 (필요 시)
      // router.push('/login');
    }
    return Promise.reject(error);
  }
);



export default axiosInstance;
