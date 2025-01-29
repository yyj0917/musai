import { MouseEventHandler, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchRentableTime } from '@/lib/api/(product)/reservation';

interface AvailableTimeSlots {
  time: string; // "10:00:00"
  status: string;
  availableDateTimedId: number;
};

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

// 24시간 형식을 12시간 형식으로 변환하는 함수
const formatTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour; // 0시는 12AM, 13시는 1PM
  return `${formattedHour}:${minute.toString().padStart(2, '0')}`;
};

// 특정 시간을 표시하는 버튼 컴포넌트
const PickUpTimeButton = ({ time, disabled, isSelected, onClick }: PickUpTimeButtonProps) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`flex items-center justify-center w-full h-[34px] border-1.5 rounded-sm text-body2 ${
      disabled
        ? 'border-grey750 text-grey150 cursor-not-allowed opacity-30 text-opacity-30'
        : isSelected
        ? 'border-red bg-darkRed'
        : 'border-grey750 text-grey150 hover:bg-grey950 hover:text-white cursor-pointer'
    }`}>
    {formatTime(time)}
  </div>
);

export default function TimePicker({ id, targetDate }: TimePickerProps) {
  const router = useRouter();

  // 오전 9시부터 오후 7시까지 시간 목록 (24시간 형식)
  const times = Array.from({ length: 21 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  const [selectedTime, setSelectedTime] = useState<string>('');
  const [disabledTimes, setDisabledTimes] = useState<string[]>(times);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null); // selectedTimeId 상태 추가

  // targetDate 변경 시 선택된 시간 초기화
  useEffect(() => {
    setSelectedTime('');
    setSelectedTimeId(null); // 선택된 시간 ID도 초기화
  }, [targetDate]);

  // targetDate가 null이 아닐 때만 API 호출
  const { data: RentableTime } = useQuery({
    queryKey: ['RentableTime', id, targetDate],
    queryFn: () => fetchRentableTime(id, targetDate as string),
    enabled: !!targetDate,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (Array.isArray(RentableTime?.availableTimeSlots)) {
      const availableTimes = RentableTime.availableTimeSlots
        .filter((slot) => slot.status === 'OPEN') // `OPEN` 상태인 시간만 선택
        .map((slot) => slot.time.slice(0, 5)); // "10:00:00" -> "10:00"
      setDisabledTimes(times.filter((time) => !availableTimes.includes(time)));
    } else {
      setDisabledTimes([...times]); // 데이터를 받지 못하면 전체 비활성화
    }
  }, [RentableTime]);

  // 선택한 시간에 해당하는 availableDateTimedId를 찾아서 URL에 추가
  const handleNextStep = () => {
    if (selectedTime && RentableTime?.availableTimeSlots) {
      const reservationData = {
        productId: id,
        availableDateTimeId: RentableTime.availableTimeSlots.find((slot) => slot.time.slice(0, 5) === selectedTime)?.availableDateTimeId,
        rentEndDateTime: `${targetDate}T${selectedTime}:00`,
      };
      router.push(
        `/rent/${id}/agreement?pickUpTime=${selectedTime}&TimeId=${reservationData.availableDateTimeId}&StartDate=${targetDate}&EndDate=${targetDate}`
      );
    }
  };

  // 오전/오후 시간 나누기
  const morningTimes = times.filter((time) => parseInt(time.split(':')[0]) < 12);
  const afternoonTimes = times.filter((time) => parseInt(time.split(':')[0]) >= 12);

  return (
    <div className="pt-1">
      <p className="text-title2 text-grey150">픽업 시간</p>

      <section className="py-[10px] pb-10">
        {/* 오전 */}
        <p className="text-body2 text-grey150 pb-2">오전</p>
        <div className="grid grid-cols-4 gap-3">
          {morningTimes.map((time) => (
            <PickUpTimeButton
              key={time}
              time={time}
              disabled={targetDate === null || disabledTimes.includes(time)}
              isSelected={selectedTime === time}
              onClick={() => {
                setSelectedTime(time);
              }}
            />
          ))}
        </div>

        {/* 오후 */}
        <p className="text-body2 text-grey150 pb-2 mt-4">오후</p>
        <div className="grid grid-cols-4 gap-2">
          {afternoonTimes.map((time) => (
            <PickUpTimeButton
              key={time}
              time={time}
              disabled={targetDate === null || disabledTimes.includes(time)}
              isSelected={selectedTime === time}
              onClick={() => {
                setSelectedTime(time);
              }}
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
