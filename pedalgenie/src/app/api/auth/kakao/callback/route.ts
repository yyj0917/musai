// app/api/kakao/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    // 1) 쿼리스트링에서 code 추출
    const { searchParams } = new URL(req.url);
    console.log('searchParams:', searchParams);
    const code = searchParams.get('code');
    if (!code) {
      return NextResponse.json({ success: false, message: 'No code provided' }, { status: 400 });
    }

    // 2) Spring 서버로 요청
    //    이 때, 서버 환경변수나 config로 URL을 가져올 수 있음
    //    (process.env.SPRING_API_URL 등)

    // Spring 서버로 카카오 토큰 교환
    // (withCredentials: true 설정이 필요하다면 axios 설정에 추가)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/callback`, 
      {
        params: { code }, 
        withCredentials: true 
      }
    );

    // 3) Spring 서버가 준 응답
    const data = response.data;
    console.log('카카오 로그인 성공:', data);
    // data 안에 { status, success, message, data: { email, nickname, accessToken, ... } } 라고 가정

    // 4) 클라이언트에게 그대로 전달 (필요 시 가공 가능)
    return NextResponse.json(data);

    // 만약 token을 HttpOnly 쿠키로 설정하고 싶다면:
    // const accessToken = data?.data?.accessToken ?? '';
    // const responseHeaders = new Headers();
    // responseHeaders.append('Set-Cookie', `authToken=${accessToken}; Path=/; HttpOnly; Secure;`);
    // return new NextResponse(JSON.stringify({success: true}), {
    //   status: 200,
    //   headers: responseHeaders
    // });

  } catch (error: any) {
    console.error('카카오 로그인 오류:', error.message);
    return NextResponse.json({ success: false, message: '카카오 로그인 실패', error: error.message }, { status: 500 });
  }
}
