'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthStore, useLoginStore } from '@/lib/zustand/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';

export default function KakaoCallbackPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient(); // QueryClient 가져오기

  useEffect(() => {
    // URL에서 code 파라미터 추출
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // 백엔드로 인가 코드 전달
      let isRequestSent = false; // 중복 요청 방지 플래그

      if (!isRequestSent) {
        isRequestSent = true;
      }
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/callback`, { params: { code }, withCredentials: true })
        .then((response) => {
          const accessToken = response.data.data.accessToken;
          // JWT 토큰을 AuthStore에 저장
          queryClient.setQueryData(['authToken'], accessToken);
          useLoginStore.getState().setLoggedIn(); // 로그인 상태 변경
          setLoading(false);

          if (window.history.length > 1) {
            router.push('/mypage'); // 이전 페이지로 이동
          } else {
            router.push('/'); // 이전 페이지가 없는 경우 홈으로 이동
          }
        })
        .catch((error) => {
          setError('로그인에 실패했습니다.');
          setLoading(false);
        });
    }
  }, []);

  return null;
}
// export default function KakaoCallbackPage() {
//   const searchParams = useSearchParams();
//   const code = searchParams?.get('code');

//   useEffect(() => {
//     if (code) {
//       axios
//         .get('http://localhost:8080/auth/kakao/callback', { params: { code } })
//         .then((response) => {
//           console.log('로그인 성공:', response.data);
//           localStorage.setItem('accessToken', response.data.data.accessToken);
//         })
//         .catch((error) => {
//           console.error('로그인 실패:', error);
//         });
//     }
//   }, [code]);

//   if (!code) {
//     return <div>코드가 없습니다. URL을 확인해주세요.</div>;
//   }

//   return <div>카카오 로그인 중...</div>;
// }
