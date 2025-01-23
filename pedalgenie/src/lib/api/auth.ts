import { UserInfo } from '@/types/auth-type';
import axiosInstance from './config/axiosConfig';

// 로그아웃 - header bearer type access token 필요
export async function logout(): Promise<void> {
    try {
      await axiosInstance.post('/logout');

    } catch (error) {
      throw new Error('Unable to logout. Please try again later.');
    }
}

// 회원탈퇴 - header bearer type access token 필요
export async function withDrawUser(): Promise<void> {
    try {
      await axiosInstance.delete('/withdraw');
    } catch (error) {
      throw new Error('Unable to withdraw user. Please try again later.');
    }
}

// 회원조회 - header bearer type access token 필요 - tanstack query 캐싱
export async function fetchUserInfo(): Promise<UserInfo> {
    try {
      const response = await axiosInstance.get('/members');

      // 바로 모든 data return
      return response.data.data;
    } catch (error) {
      throw new Error('Unable to fetch articles. Please try again later.');
    }
}

// 쿠키게 있는 리프레시 토큰으로 엑세스 토큰 재발급 - tanstack query 캐싱
export async function refetchAccessToken(): Promise<string> {
    try {
        const response = await axiosInstance.get('/api/reissue');
        return response.data.data.accessToken;
    } catch (error) {
        throw new Error('Unable to refetch access token. Please try again later.');
    }
}