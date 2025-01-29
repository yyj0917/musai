'use client';

import TopBar from '../_components/topBar';
import ReservationInfo from './_components/reservationInfo';
import NoticeSection from './_components/noticeSection';
import AgreementSection from './_components/agreementSection';
import PaymentSummary from '../_components/paymentSummary';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// ProductDetail의 상품명
// 대여 기간, 픽업 일정

export default function Agreement({ params }: { params: { id: number } }) {
  const { id } = params; // 파라미터로 받아온 ProductId 값

  return (
    <div className="w-full flex flex-col text-grey250 font-pretendard ">
      <TopBar />
      <div className="w-full h-[calc(100vh-50px)] overflow-y-auto scroll-smooth scrollbar-hide ">
        <div className="p-4 border-b-0.5 border-grey850">
          <ReservationInfo productId={id} />
          <PaymentSummary />
        </div>
        <div className="p-4">
          <NoticeSection />
          <AgreementSection id={id} />
        </div>
      </div>
    </div>
  );
}
