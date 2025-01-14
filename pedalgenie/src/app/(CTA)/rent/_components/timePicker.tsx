'use client';

import { useState } from "react";

// 픽업 시간은 오전 9:00~ 오후 7:00 까지
// 이중 불가능한 시간은 디비에서 받아올 예정. 지금은 일단 임시 지정 해주었음
// 아 그러고보니 선택한 날짜가 오늘 일 경우 => 현재 시간이 지난 시간도 X를 해주어야 됨

// 특정 시간을 표시하는 픽업 시간 버튼 컴포넌트
// 받아온 {time}이 [disabled/isSelected/onClick]이냐에 따라 서로 다른 스타일 적용
const PickUpTimeButton = ({ time, disabled, isSelected, onClick }) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined} // 비활성화된 시간은 클릭 이벤트 제거
      className={`flex items-center justify-center w-full h-[34px] border-1.5 rounded-sm text-body2 ${
        disabled
          ? 'border-grey750 text-grey150 cursor-not-allowed opacity-30 text-opacity-30' // 비활성화된 시간
          : isSelected
          ? 'border-red bg-darkRed' // 선택된 시간
          : 'border-grey750 text-grey150 hover:bg-grey950 hover:text-white cursor-pointer' // 기본 시간
      }`}
    >
      {time}
    </div>
  );
};

export default function TimePicker() {
  // 오전 9시부터 오후 7시까지 시간 목록
  // db 체크하고 타입 바꾸기
  const times = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', // 오전
    '12:00', '12:30', '1:00', '1:30', '2:00', '2:30',  // 오후
    '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00',
  ];

  // 임시로 픽업 불가능한 시간 체크
  const disabledTimes = ['10:00', '3:00', '4:00'];

  // 선택된 시간 상태
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="pt-1">
      <p className="text-title2 text-grey150">픽업 시간</p>

      {/* 오전 */}
      <section className="py-[10px]">
        <p className="text-body2 text-grey150 pb-2">오전</p>
        <div className="grid grid-cols-4 gap-3">
          {times.slice(0, 6).map((time) => (
            <PickUpTimeButton
              key={time}
              time={time}
              disabled={disabledTimes.includes(time)}
              isSelected={selectedTime === time} // 선택된 시간과 비교
              onClick={() => setSelectedTime(time)} // 클릭 시 선택된 시간 업데이트
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
              isSelected={selectedTime === time} // 선택된 시간과 비교
              onClick={() => setSelectedTime(time)} // 클릭 시 선택된 시간 업데이트
            />
          ))}
        </div>
      </section>
    </div>
  );
}