// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect '/' to '/home?nameFilter=최신순'
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/home';

    // 쿼리 파라미터 추가
    // url.searchParams.set('nameFilter', '최신순');
    return NextResponse.redirect(url);
  }

  // Redirect '/home' to '/home?nameFilter=최신순' (if missing 'nameFilter')
  // if (request.nextUrl.pathname === '/home' && !request.nextUrl.searchParams.has('nameFilter')) {
  //   const url = request.nextUrl.clone();
  //   url.searchParams.set('nameFilter', '최신순');
  //   return NextResponse.redirect(url);
  // }

  // 권한에 따라 접근 제어 (추후 확장)
  // 예: 사용자가 로그인하지 않았을 경우 특정 페이지 접근 막기
  //   const userToken = request.cookies.get('userToken'); // 쿠키에서 유저 정보를 가져온다고 가정합니다.

  //   // 로그인 여부에 따른 접근 제한 (예시: /profile 페이지 접근 제한)
  //   if (request.nextUrl.pathname.startsWith('/profile') && !userToken) {
  //     const loginUrl = request.nextUrl.clone();
  //     loginUrl.pathname = '/login';
  //     return NextResponse.redirect(loginUrl);
  //   }

  return NextResponse.next(); // 그 외의 경우 계속 진행
}

export const config = {
  matcher: ['/', '/profile/:path*', '/home'], // 미들웨어가 적용될 경로 설정
};
