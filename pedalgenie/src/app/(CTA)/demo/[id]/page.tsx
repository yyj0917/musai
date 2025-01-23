'use client';

import { useQuery } from '@tanstack/react-query';
import Calendar from './_components/calendar';
import TimePicker from './_components/timePicker';
import TopBar from './_components/topBar';
import AlertCircle from '@public/svg/rent/alert-circle.svg';
import { fetchDemoableDate } from '@/lib/api/(product)/reservation';

export default function Demo({ params }: { params: { id: number } }) {
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

  return (
    <div className="w-full h-full flex flex-col bg-grey1000 text-grey250 font-pretendard">
      <TopBar />
      <div className="w-full h-[calc(100vh-50px)] overflow-y-auto scroll-smooth scrollbar-hide ">
        <div className="p-4">
          <div className="text-title2 pb-3">시연 날짜</div>
          <Calendar />
        </div>
        <section className="w-full p-4 border-t-0.5 border-grey850">
          <TimePicker id={id} />
        </section>
      </div>
    </div>
  );
}
