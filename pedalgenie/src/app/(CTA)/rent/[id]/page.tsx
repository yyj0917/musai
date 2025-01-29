'use client';

import Calendar from './_components/calendar';
import TimePicker from './_components/timePicker';
import TopBar from './_components/topBar';
import PaymentSummary from './_components/paymentSummary';
import AlertCircle from '@public/svg/rent/alert-circle.svg';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// ProductDetail의 가격 , 수수료료

import { fetchRentableDate } from '@/lib/api/(product)/reservation';
import Loading from '@/components/loading';

export default function Rent({ params }: { params: { id: number } }) {
  const [rentDuration, setRentDuration] = useState<number>(0);
  // rentDuration: Calender에서 선택한 날짜에서 가져올거임.
  const [targetDate, setTargetDate] = useState<string | null>(null);
  // targerDate 에서 예약 가능한 시간을 가져옴

  const { id } = params; // 파라미터로 받아온 ProductId 값

  const {
    data: RentableDate,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['RentableDate', id], // 캐싱 키
    queryFn: () => fetchRentableDate(id), // fetchShopDetail 함수 호출
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 상태 유지
  });

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <div className="w-full h-full flex flex-col bg-grey1000 text-grey250 font-pretendard">
      <TopBar />
      <div className="w-full h-[calc(100vh-50px)] overflow-y-auto scroll-smooth scrollbar-hide">
        <div className="p-4">
          <div className="text-title2 pb-3">대여 기간</div>
          <Calendar
            availableDates={RentableDate?.availableDates}
            onDateChange={setTargetDate}
            setRentDuration={setRentDuration}
          />
          <p className="flex w-full pt-5 text-body2 text-red gap-1.5">
            <AlertCircle />
            대여 기간은 최소 3일 이상부터 가능합니다
          </p>
          <PaymentSummary rentPricePerDay={RentableDate?.rentPricePerDay} rentDuration={rentDuration} />
        </div>
        <section className="w-full px-4 pt-4 pb-10 border-t-0.5 border-grey850">
          <TimePicker id={id} targetDate={targetDate} />
        </section>
        {isLoading && <Loading />}
      </div>
    </div>
  );
}
