'use client';

import Link from "next/link";
import RightArrow from "@public/svg/mypage/right-arrow-mypage.svg";
import ReserveInfo from "@public/svg/mypage/reserve-info.svg";
import ChannelTalk from "@public/svg/mypage/channel-talk.svg";
import ChannelIOScript from "@/utils/channeltalk";
import { useState } from "react";
import LoginModal from "../../../components/login-modal";
import { useModalStore } from "@/lib/zustand/useModalStore";


export default function MyPage() {
    const tmpUser = {
        'name': '윤영준',
        'email': 'yyj0917@yonsei.ac.kr',
    }
    const [isUser, setIsUser] = useState(false);
    const { openModal } = useModalStore();

    
    
    const etc = [
        {
            link: '/mypage/open-source',
            text: '오픈소스 라이선스'
        },
        {
            link: '/mypage/terms-of-use',
            text: '이용약관'
        },
        {
            link: '/mypage/privacy-policy',
            text: '개인정보처리방침'
        },
    ]
    
    
    
    return (
        <div className="w-full h-auto flex flex-col ">
            {/* 로그인 및 회원가입 region */}
            <div className="relative w-full h-[132px] text-grey450">
                {!isUser ? (
                    // 비로그인 상태
                    <div className="absolute left-5 top-[50px] flex flex-col gap-[5px]">
                        <div 
                            className="flex items-center gap-5 cursor-pointer"
                            onClick={()=>openModal()}>
                            <p className="text-head1">로그인 및 회원가입</p>
                            <RightArrow />
                        </div>
                        <p className="text-body1 text-grey650">
                            3초 가입으로 더 편리해진 뮤사이를 경험해보세요.
                        </p>
                    </div>
                ) : (
                    // 로그인 상태
                    <div className="absolute left-5 top-[50px] flex flex-col gap-[5px]">
                        <p className="text-head1">{tmpUser.name} 님</p>
                        <p className="text-body1 text-grey650">{tmpUser.email}</p>
                    </div>
                )}
            </div>
            
            {/* design bar */}
            <div className="w-full h-[0.5px] bg-grey850"></div>

            {/* 예약내역 && 채널톡 region */}
            <div className="w-full h-[106px] flex">
                <Link href="/mypage/reservation" className="flex flex-col items-center justify-center w-1/2 gap-1 text-grey150">
                    <ReserveInfo />
                    <p className="text-body1 ">예약 정보</p>
                    {isUser && (
                        <p className="text-body1 text-grey550">보기</p>
                    )}
                </Link>
                <Link id="custom-channel-talk" href="/mypage/channel-talk" className="flex flex-col items-center justify-center w-1/2 gap-1 text-grey150">
                    <ChannelTalk />
                    <p className="text-body1">1:1 채널톡</p>
                    {isUser && (
                        <p className="text-body1 text-grey550">문의하기</p>
                    )}
                </Link>
            </div>

            {/* design bar */}
            <div className="w-full h-[0.5px] bg-grey850"></div>

            {/* 고객센터 - 자주 묻는 질문 */}
            <div className="mt-8 ml-5 flex flex-col gap-5">
                <h1 className="text-body1 text-grey650">고객센터</h1>
                <div className="flex flex-col gap-2">
                    <Link href={'/fre-questions'} className="flex items-center">
                        <p className="text-body1 text-grey150">자주 묻는 질문</p>
                    </Link>
                </div>
            </div>
            {/* 내 계정 (로그인 상태에서만 표시) */}
            {isUser && (
                <div className="mt-10 ml-5 flex flex-col gap-5">
                    <h1 className="text-body1 text-grey650">내 계정</h1>
                    <div className="flex flex-col gap-2">
                        <Link href="/mypage/logout" className="flex items-center">
                            <p className="text-body1 text-grey150">로그아웃</p>
                        </Link>
                        <Link href="/mypage/delete-account" className="flex items-center">
                            <p className="text-body1 text-grey150">회원탈퇴</p>
                        </Link>
                    </div>
                </div>
            )}
            {/* 약관 - 그 외 필요정보 */}
            <div className="mt-10 ml-5 flex flex-col gap-5">
                <h1 className="text-body1 text-grey650">
                    약관
                </h1>
                <div className="flex flex-col gap-2">
                    {etc.map((item, index) => (
                        <Link key={index} href={item.link} className="flex items-center">
                            <p className="text-body1 text-grey150">{item.text}</p>
                        </Link>
                    ))}
                </div>
            </div>
            {/* LoginModal 컴포넌트 */}
            <LoginModal/>
            {/* ChannelIOScript 컴포넌트 */}
            <ChannelIOScript />

            
        </div>
        
    );
  }