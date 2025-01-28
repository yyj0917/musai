import { MouseEventHandler, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchRentableTime } from '@/lib/api/(product)/reservation';

interface TimePickerProps {
  id: number;
  targetDate: string | null;
}

interface PickUpTimeButtonProps {
  time: string;
  disabled: boolean;
  isSelected: boolean;
  onClick: MouseEventHandler;
}

export default function TimePicker({ id, targetDate }: TimePickerProps) {
  const router = useRouter();

  // 특정 시간을 표시하는 픽업 시간 버튼 컴포넌트
  const PickUpTimeButton = ({ time, disabled, isSelected, onClick }: PickUpTimeButtonProps) => {
    return (
      <div
        onClick={!disabled ? onClick : undefined}
        className={`flex items-center justify-center w-full h-[34px] border-1.5 rounded-sm text-body2 ${
          disabled
            ? 'border-grey750 text-grey150 cursor-not-allowed opacity-30 text-opacity-30'
            : isSelected
            ? 'border-red bg-darkRed'
            : 'border-grey750 text-grey150 hover:bg-grey950 hover:text-white cursor-pointer'
        }`}>
        {time}
      </div>
    );
  };

  const handleNextStep = () => {
    if (selectedTime) {
      router.push(`/rent/${id}/agreement`);
    }
  };

  // 오전 9시부터 오후 7시까지 시간 목록
  const times = [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '1:00',
    '1:30',
    '2:00',
    '2:30',
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

  const [selectedTime, setSelectedTime] = useState<string>('');
  const [disabledTimes, setDisabledTimes] = useState<string[]>([]);

  // targetDate가 null이 아닐 때만 API 호출
  const { data: RentableTime, isLoading, isError } = useQuery({
    queryKey: ['RentableTime', id, targetDate],
    queryFn: () => fetchRentableTime(id, targetDate as string),
    enabled: !!targetDate, // targetDate가 null이 아닐 경우에만 활성화
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (RentableTime && Array.isArray(RentableTime.availableTimeSlots)) {
      const availableTimes = RentableTime.availableTimeSlots
        .filter((slot) => slot.status !== 'OPEN') // 예약 불가능한 시간 필터링
        .map((slot) => slot.time.slice(0, 5)); // "10:00:00" -> "10:00"
      setDisabledTimes(availableTimes);
    }
  }, [RentableTime]);

  console.log('날짜 선택, 불가능 시간: ', disabledTimes);

  return (
    <div className="pt-1">
      <p className="text-title2 text-grey150">픽업 시간</p>

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

      <Button
        variant={'custom'}
        className={`w-full ${selectedTime ? 'bg-red text-grey150' : 'bg-grey750 text-grey150 opacity-30 cursor-not-allowed'}`}
        onClick={handleNextStep}
        disabled={!selectedTime}>
        다음으로
      </Button>
    </div>
  );
}
