'use client';

import Calendar from './_components/calendar';
import TimePicker from './_components/timePicker';
import TopBar from './_components/topBar';
import AlertCircle from '@public/svg/rent/alert-circle.svg';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// ProductDetail의 가격 , 수수료료

import { fetchDemoableDate } from '@/lib/api/(product)/reservation';
import Loading from '@/components/loading';

export default function Demo({ params }: { params: { id: number } }) {
  const [startDate, onStartDateChange] = useState<string | null>(null);

  const { id } = params; // 파라미터로 받아온 ProductId 값

  const {
    data: DemoableDate,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['DemoableDate', id], // 캐싱 키
    queryFn: () => fetchDemoableDate(id), // fetchShopDetail 함수 호출
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 상태 유지
  });

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  console.log('DemoableDate', DemoableDate);

  return (
    <div className="w-full h-full flex flex-col bg-grey1000 text-grey250 font-pretendard">
      <TopBar />
      <div className="w-full h-[calc(100vh-50px)] overflow-y-auto scroll-smooth scrollbar-hide">
        <div className="p-4">
          <div className="text-title2 pb-3">시연 기간</div>
          <Calendar
            availableDates={DemoableDate}
            onStartDateChange={onStartDateChange}
          />
          <span className="flex justify-between w-full text-red text-title1 pt-5">
            <p>
            금액
            </p>
            <p>
            무료
            </p>
          </span>
        </div>
        <section className="w-full px-4 pt-4 pb-10 border-t-0.5 border-grey850">
          <TimePicker
            id={id}
            demoDate={startDate}
          />
        </section>
        {isLoading && <Loading />}
      </div>
    </div>
  );
}
