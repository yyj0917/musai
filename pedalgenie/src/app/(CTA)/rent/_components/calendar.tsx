'use client';

import NextMonth from '@public/svg/rent/next-month.svg';
import PrevMonth from '@public/svg/rent/prev-month.svg';

import React, { useState } from 'react';
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isBefore } from 'date-fns';

export default function Calendar() {
  const today = new Date(); // 현재 날짜
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today)); // 현재 월의 시작일
  const [startDate, setStartDate] = useState(null); // 대여 시작일
  const [endDate, setEndDate] = useState(null); // 대여 종료일

  const handlePrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1)); // 이전 달로 이동
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1)); // 다음 달로 이동
  };

  const handleDateClick = (selectedDate) => {
    if (!startDate) {
      setStartDate(selectedDate);
      setEndDate(null); // 새 시작일 선택 시 종료일 초기화
    } else if (selectedDate > startDate && selectedDate - startDate >= 3 * 24 * 60 * 60 * 1000) {
      setEndDate(selectedDate);
    } else {
      alert('대여 종료일은 대여 시작일로부터 최소 3일 이후여야 합니다!');
    }
  };

  const generateDates = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  return (
    <div className='flex flex-col items-center justify-center space-y-4 bg-grey950 p-4 rounded-lg w-full'>
      {/* 헤더 영역 */}
      <div className='flex items-center justify-between gap-3'>
        <button onClick={handlePrevMonth}>
          <PrevMonth />
          {/* 좌측버튼 */}
        </button>
        <h2 className='text-base font-semibold'>{format(currentMonth, 'yyyy년 M월')}</h2>
        <button onClick={handleNextMonth}>
          <NextMonth />
          {/* 우측버튼 */}
        </button>
      </div>

      {/* 날짜 그리드 */}
      <div className='w-full grid place-items-center grid-cols-7 gap-y-[10px]'>
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <span key={day} className='text-center text-sm text-grey450'>
            {day}
          </span>
        ))}
        {generateDates().map((date) => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          const isToday = formattedDate === format(today, 'yyyy-MM-dd');
          const isStart = startDate && formattedDate === format(startDate, 'yyyy-MM-dd');
          const isEnd = endDate && formattedDate === format(endDate, 'yyyy-MM-dd');
          const isInRange = startDate && endDate && date > startDate && date < endDate;
          const isBeforeToday = isBefore(date, today); // 오늘 이전 날짜 확인

          return (
            <button
              key={formattedDate}
              onClick={() => handleDateClick(date)}
              className={`w-[34px] h-[34px] rounded-full text-sm ${
                isBeforeToday ? 'text-grey750' : 'text-grey250'
              } ${isStart ? 'border-1.5 border-red  bg-darkRed' : isEnd ? 'border-1.5 border-red bg-darkRed' : isInRange ? 'bg-red bg-opacity-10 rounded-none w-full' : 'hover:bg-gray-700'}`}
              disabled={isBeforeToday}>
              {format(date, 'd')}
              {/* isToday 오늘 날짜부분, hover 부분 수정하기 */}
            </button>
          );
        })}
      </div>
    </div>
  );
}
