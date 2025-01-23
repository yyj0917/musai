'use client';

import { useParams } from 'next/navigation'; // useParams로 URL 파라미터를 추출
import CTAHeart from '@public/svg/CTA-heart.svg';
import CTAvector from '@public/svg/CTA-vector.svg';
import Link from 'next/link';

// 로그인 체크

interface CTAProps {
  id: number;
}

export default function CTA({ id }: CTAProps) {
  const productId = id;

  return (
    <nav className="bg-grey1000 absolute bottom-0 w-full flex justify-between items-center pt-3 pb-[50px] px-[20px] border-t-[1px] border-grey750 font-pretendard">
      <CTAHeart />
      <div className="flex justify-center items-center gap-[26px] text-label1 text-grey250">
        <Link href={`/rent/${productId}`}>대여 예약하기</Link>
        <CTAvector />
        <Link href={`/demo/${productId}`}>시연 예약하기</Link>
      </div>
    </nav>
  );
}
