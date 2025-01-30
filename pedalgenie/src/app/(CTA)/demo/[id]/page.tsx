'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { fetchDemoableDate } from '@/lib/api/(product)/reservation';

import Calendar from './_components/calendar';
import TimePicker from './_components/timePicker';
import TopBar from './_components/topBar';
import SymbolLogo from '@public/svg/symbol-logo.svg';
import Loading from '@/components/loading';
import { useRouter } from 'next/navigation';

export default function Demo({ params }: { params: { id: number } }) {
  const [startDate, onStartDateChange] = useState<string | null>(null);
  const { id } = params;
  const router = useRouter();

  // 예약 가능한 날짜 가져오기
  const {
    data: DemoableDate,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['DemoableDate', id],
    queryFn: () => fetchDemoableDate(id),
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 상태 유지
  });

  if (isError) {
    return <div className="relative h-[100dvh] min-w-[360px] max-w-[415px] lg:max-w-[375px] mx-auto bg-grey1000 font-pretendard">
    <div className=" w-full h-full flex flex-col justify-center items-center overflow-hidden">
      <div className="mb-16 flex flex-col items-center gap-[14px] text-grey650 text-body1">
        <SymbolLogo />
        <p className='break-words'>예약 날짜 조회중 에러가 발생했습니다.<br/>잠시 후 이용해주세요.</p>
      </div>
      <div className="absolute bottom-[30px] px-4 w-full h-[52px] flex gap-2 text-label1 text-grey150">
        <button onClick={() => router.back()} className="bg-grey750 rounded flex-1 flex justify-center items-center">
          뒤로 가기
        </button>
        <button onClick={() => router.push('/')} className="bg-red rounded flex-1 flex justify-center items-center">
          홈으로 가기
        </button>
      </div>
    </div>
  </div>;
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
