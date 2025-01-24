// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // const refreshToken = request.cookies.get('refreshToken')?.value;
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/home';

    // 쿼리 파라미터 추가
    // url.searchParams.set('nameFilter', '최신순');
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // 그 외의 경우 계속 진행
}

export const config = {
  matcher: ['/', '/profile/:path*', '/home'], // 미들웨어가 적용될 경로 설정
};
