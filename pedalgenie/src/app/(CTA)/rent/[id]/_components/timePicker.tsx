'use client';

import { MouseEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchRentableTime } from '@/lib/api/(product)/reservation';

// 날짜 선택 되기 전 즉, api로 받아올 데이터가 없을 시
// 날짜를 선택해주세요 텍스트 대체

interface TimePickerProps {
  id: number;
}

interface PickUpTimeButtonProps {
  time: string;
  disabled: boolean;
  isSelected: boolean;
  onClick: MouseEventHandler;
}

export default function TimePicker({ id }: TimePickerProps) {
  const router = useRouter();

  const {
    data: RentableTime,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['RentableTime', id], // 캐싱 키
    queryFn: () => fetchRentableTime(id, '2025-02-03'), // 날짜 첫번째 날짜로
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 상태 유지
  });

  // 특정 시간을 표시하는 픽업 시간 버튼 컴포넌트
  const PickUpTimeButton = ({ time, disabled, isSelected, onClick }: PickUpTimeButtonProps) => {
    return (
      <div
        onClick={!disabled ? onClick : undefined} // 비활성화된 시간은 클릭 이벤트 제거
        className={`flex items-center justify-center w-full h-[34px] border-1.5 rounded-sm text-body2 ${
          disabled
            ? 'border-grey750 text-grey150 cursor-not-allowed opacity-30 text-opacity-30' // 비활성화된 시간
            : isSelected
              ? 'border-red bg-darkRed' // 선택된 시간
              : 'border-grey750 text-grey150 hover:bg-grey950 hover:text-white cursor-pointer' // 기본 시간
        }`}>
        {time}
      </div>
    );
  };

  const handleNextStep = () => {
    if (selectedTime) {
      router.push('/rent/agreement'); // 약관 동의 페이지로 이동
    }
  };

  // 오전 9시부터 오후 7시까지 시간 목록
  const times = [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30', // 오전
    '12:00',
    '12:30',
    '1:00',
    '1:30',
    '2:00',
    '2:30', // 오후
    '3:00',
    '3:30',
    '4:00',
    '4:30',
    '5:00',
    '5:30',
    '6:00',
    '6:30',
    '7:00',
  ];

  // 임시로 픽업 불가능한 시간 체크
  const disabledTimes = ['10:00', '3:00', '4:00'];

  // 선택된 시간 상태
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="pt-1">
      <p className="text-title2 text-grey150">픽업 시간</p>

      {/* 오전 */}
      <section className="py-[10px] pb-10">
        <p className="text-body2 text-grey150 pb-2">오전</p>
        <div className="grid grid-cols-4 gap-3">
          {times.slice(0, 6).map((time) => (
            <PickUpTimeButton
              key={time}
              time={time}
              disabled={disabledTimes.includes(time)}
              isSelected={selectedTime === time}
              onClick={() => setSelectedTime(time)}
            />
          ))}
        </div>

        {/* 오후 */}
        <p className="text-body2 text-grey150 pb-2 mt-4">오후</p>
        <div className="grid grid-cols-4 gap-2">
          {times.slice(6).map((time) => (
            <PickUpTimeButton
              key={time}
              time={time}
              disabled={disabledTimes.includes(time)}
              isSelected={selectedTime === time}
              onClick={() => setSelectedTime(time)}
            />
          ))}
        </div>
      </section>

      {/* 다음으로 버튼 */}
      <Button
        variant={'custom'}
        className={`w-full  ${selectedTime ? 'bg-red text-grey150' : 'bg-grey750 text-grey150 opacity-30 cursor-not-allowed'}`}
        onClick={handleNextStep}
        disabled={!selectedTime} // 선택된 시간이 없으면 비활성화
      >
        다음으로
      </Button>
    </div>
  );
}
