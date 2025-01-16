'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useChannelIOApi } from 'react-channel-plugin';

import RightArrow from '@public/svg/mypage/right-arrow-mypage.svg';
import ReserveInfo from '@public/svg/mypage/reserve-info.svg';
import ChannelTalk from '@public/svg/mypage/channel-talk.svg';

import LogoHeader from '@/components/logo-header';
import LoginModal from '../../../components/login-modal';
import LogoutModal from '@/components/logout-modal';
import WithdrawModal from '@/components/withdraw-modal';
import { fetchUserInfo } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Spinner } from 'basic-loading';
import { size } from 'lodash';

export default function MyPage() {

  const tmpUser = {
    name: '윤영준',
    email: 'yyj0917@yonsei.ac.kr',
  };
  const [isUser, setIsUser] = useState<boolean>(false);
  const { openLoginModal } = useModalStore();
  const { openLogoutModal } = useModalStore();
  const { openWithdrawModal } = useModalStore();
  const queryClient = useQueryClient();

  const { showMessenger } = useChannelIOApi();

  const fetchMembers = async () => {
    const accessToken = queryClient.getQueryData<string>(['authToken']);
    useAuthStore.getState().setAccessToken(accessToken);
    try {

      const response = await fetchUserInfo(); // API 호출
      setIsUser(true);
      return response;
    } catch (error) {
      // error handling 필요
      return
    }
  }

  // React Query로 fetchUserInfo 데이터 캐싱
  const { data: memberData, isLoading, isError } = useQuery({
    queryKey: ['memberInfo'], // 캐싱 키
    queryFn: fetchMembers, // fetchMembers 함수
    staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선하다고 간주
    gcTime: 1000 * 60 * 10, // 10분 동안 캐싱 유지
    enabled: true, // 활성화
  });
  
  
  
  // 초기 데이터를 설정하는 useEffect
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const initialData = await fetchMembers(); // 데이터를 서버에서 가져옴
        if (initialData) queryClient.setQueryData(['memberInfo'], initialData); // 초기 데이터를 캐싱
        
      } catch (error) {
        // console.error('초기 데이터 가져오기 실패:', error);
        // error handling 필요
      }
    };

    fetchInitialData();
  }, [queryClient]);

  const etc = [
    {
      link: '/mypage/open-source',
      text: '오픈소스 라이선스',
    },
    {
      link: '/mypage/terms-of-use',
      text: '이용약관',
    },
    {
      link: '/mypage/privacy-policy',
      text: '개인정보처리방침',
    },
  ];
  const option = {
    bgColor: '#6E6E6E',
    barColor: '#FFFFFF',
    size: 50,
    speed: 1,
    thickness: 4,
  }
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner option={option} />
      </div>
    );
  }

  return (
    <div className="w-full h-auto flex flex-col ">
      <LogoHeader />
      {/* 로그인 및 회원가입 region */}
      <div className="relative w-full h-[82px] text-grey450">
        {!isUser ? (
          // 비로그인 상태
          <div className="absolute left-4 top-[10.5px] flex flex-col gap-1">
            <div className="flex items-center gap-5 cursor-pointer" onClick={() => openLoginModal()}>
              <p className="text-head1">로그인 및 회원가입</p>
              <RightArrow />
            </div>
            <p className="text-caption1 text-grey650">3초 가입으로 더 편리해진 뮤사이를 경험해보세요.</p>
          </div>
        ) : (
          // 로그인 상태
          <div className="absolute left-4 top-[10.5px] flex flex-col gap-1">
            <p className="text-head1">{memberData?.nickname} 님</p>
            <p className="text-body1 text-grey650">{memberData?.email}</p>
          </div>
        )}
      </div>

      {/* 예약내역 && 채널톡 region */}
      <div className="w-full h-[106px] flex">
        <Link
          href="/mypage/reservation/preview"
          className="flex flex-col items-center justify-center w-1/2 gap-1 text-grey150 border-r-[0.5px] border-grey850">
          <ReserveInfo />
          <p className="text-body1 ">예약 내역</p>
          {isUser && <p className="text-body1 text-grey550">보기</p>}
        </Link>
        <button
          className="custom-channeltalk flex flex-col items-center justify-center w-1/2 gap-1 text-grey150"
          onClick={showMessenger}>
          <ChannelTalk />
          <p className="text-body1">1:1 채널톡</p>
          {isUser && <p className="text-body1 text-grey550">문의하기</p>}
        </button>
      </div>

      {/* 내 계정 (로그인 상태에서만 표시) */}
      {isUser && (
        <div className="mt-10 ml-5 flex flex-col gap-5">
          <h1 className="text-body1 text-grey650">내 계정</h1>
          <div className="flex flex-col gap-2">
            <button className="w-20 flex items-center" onClick={() => openLogoutModal()}>
              <p className="text-body1 text-grey150">로그아웃</p>
            </button>
            <button className="w-20 flex items-center" onClick={() => openWithdrawModal()}>
              <p className="text-body1 text-grey150">회원탈퇴</p>
            </button>
          </div>
        </div>
      )}
      {/* 약관 - 그 외 필요정보 */}
      <div className="mt-10 ml-5 flex flex-col gap-5">
        <h1 className="text-body1 text-grey650">약관</h1>
        <div className="flex flex-col gap-2">
          {etc.map((item, index) => (
            <Link key={index} href={item.link} className="max-w-28 flex items-center">
              <p className="text-body1 text-grey150">{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
      {/* LoginModal 컴포넌트 */}
      <LoginModal />
      {/* LogoutModal 컴포넌트 */}
      <LogoutModal />
      {/* WithdrawModal 컴포넌트 */}
      <WithdrawModal />
    </div>
  );
}
