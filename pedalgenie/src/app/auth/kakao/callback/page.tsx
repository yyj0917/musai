'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function KakaoCallbackPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // URL에서 code 파라미터 추출
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // 백엔드로 인가 코드 전달
      axios
        .get('http://localhost:8080/auth/kakao/callback', { params: { code } })
        .then((response) => {
          console.log('로그인 성공:', response.data);
          // JWT 토큰을 로컬스토리지에 저장
          localStorage.setItem('accessToken', response.data.data.accessToken);
          setLoading(false);
        })
        .catch((error) => {
          console.error('로그인 실패:', error);
          setError('로그인에 실패했습니다.');
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <div>로그인 처리 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>로그인 성공! 리다이렉트 중...</div>;
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

