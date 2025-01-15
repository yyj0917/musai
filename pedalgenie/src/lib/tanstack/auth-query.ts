'use client';

import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// useMutation 타입 제네릭
// useMutation<
//   TData = unknown, // 성공 시 반환 타입
//   TError = unknown, // 오류 타입
//   TVariables = void, // mutation 함수에 전달할 변수 타입
//   TContext = unknown // mutation 실행 중 사용할 컨텍스트 타입
// >(mutationFn, options);
type AuthResponse = {
    data: {
      accessToken: string;
    };
  };

// const fetchAuthToken = async (code: string): Promise<string> => {
//     const response = await axios.get<AuthResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/callback`, {
//       params: { code },
//       withCredentials: true,
//     });
//     return response.data.data.accessToken;
//   };
// // 토큰 요청 훅
// export const useAuthMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation<string, Error, string>(
//     fetchAuthToken,
//     {
//       onSuccess: (accessToken: string) => {
//         queryClient.setQueryData(['authToken'], accessToken); // 토큰 캐싱
//         console.log('토큰 저장:', accessToken);
//       },
//       onError: (error : Error) => {
//         console.error('토큰 요청 실패:', error);
//       },
//     }
//   );
// };

// 토큰 캐시 useQuery 훅
export const useAuthToken = () => {
    const queryClient = useQueryClient();
  
    // 토큰을 캐시에서 가져오는 useQuery 훅
    return useQuery({
        queryKey: ['authToken'], // Query Key
        queryFn: async () => {
            // 이미 캐시에 토큰이 저장되어 있다면 반환
            const cachedToken = queryClient.getQueryData<string>(['authToken']);
            if (cachedToken) {
              return cachedToken;
            }
      
            // 없으면 에러 반환 또는 null 처리
            throw new Error('토큰이 존재하지 않습니다.');
           
            },
        enabled: true,
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 신선하다고 간주
        retry: 3, // 토큰 조회 실패 시 재시도하지 않음
    }
    );
  };

