'use client';

import NextMonth from '@public/svg/rent/next-month.svg';
import PrevMonth from '@public/svg/rent/prev-month.svg';

import React, { useState } from 'react';
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isBefore, isSameDay, getDay } from 'date-fns';

import { availableDates } from '@/types/reservation-type';
import { useToast } from '@/hooks/use-toast';

interface CalendarProps {
  availableDates?: availableDates[];
  onDateChange: (date:string|null) => void;
  setRentDuration: (rentDuration: number) => void;
}

export default function Calendar({ availableDates, onDateChange, setRentDuration }: CalendarProps) {
  const today = new Date(); // 현재 날짜
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(today)); // 현재 월의 시작일
  const { toast } = useToast();

  // 조건에 맞는 날짜 필터링
  const totalRentableDates =
    availableDates
      ?.filter((date) => {
        const parsedDate = new Date(date.localDate);
        return isBefore(today, parsedDate) || isSameDay(today, parsedDate); // 오늘 이후의 날짜
      })
      .filter((date) => date.rentStatus === 'OPEN') // 상태가 OPEN인 날짜
      .map((date) => date.localDate) || []; // localDate만 추출

  // ✅ 타입 명시 추가
  const [startDate, setStartDate] = useState<Date | null>(null); // 대여 시작일
  const [endDate, setEndDate] = useState<Date | null>(null); // 대여 종료일

  const handlePrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1)); // 이전 달로 이동
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1)); // 다음 달로 이동
  };

  // 달력에서 날짜 선택
  const handleDateClick = (selectedDate: Date) => {
    const formattedStartDate = format(selectedDate, 'yyyy-MM-dd');
    if (!startDate && !endDate) {
      setStartDate(selectedDate);
      setRentDuration(0);
      onDateChange(formattedStartDate);
    } else if (startDate && !endDate && selectedDate > startDate) {
      const duration = Math.ceil((selectedDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000) + 1);
      const rangeDates = eachDayOfInterval({ start: startDate, end: selectedDate }).map((date) => format(date, 'yyyy-MM-dd'));
      if (duration < 3) {
        toast({
          description: '대여 기간은 최소 3일 이상부터 가능합니다.',
        });
        resetSelection();
      } else if (rangeDates.some((date) => !totalRentableDates.includes(date))) {
        toast({
          description: '대여 기간 중 불가능한 날짜가 있습니다. 다시 선택해주세요.',
        });
        resetSelection();
      } else {
        setEndDate(selectedDate);
        setRentDuration(duration);
      }
    } else {
      setStartDate(selectedDate);
      onDateChange(formattedStartDate);
      setEndDate(null);
      setRentDuration(0);
    }
  };

  const resetSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setRentDuration(0);
    onDateChange(null);
  };

  const generateDates = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const dates = eachDayOfInterval({ start, end });

    // 월의 1일이 무슨 요일인지 계산하여 앞에 빈칸 추가
    const firstDayOfWeek = getDay(start); // 0(일요일) ~ 6(토요일)
    return Array(firstDayOfWeek).fill(null).concat(dates); // 빈칸(null) 추가 후 날짜 배열 결합
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-grey950 p-4 rounded-lg w-full">
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between gap-3">
        <button onClick={handlePrevMonth}>
          <PrevMonth />
          {/* 좌측버튼 */}
        </button>
        <h2 className="text-base font-semibold">{format(currentMonth, 'yyyy년 M월')}</h2>
        <button onClick={handleNextMonth}>
          <NextMonth />
          {/* 우측버튼 */}
        </button>
      </div>

      {/* 날짜 그리드 */}
      <div className="w-full grid place-items-center grid-cols-7 gap-y-[10px]">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <span key={day} className="text-center text-sm text-grey450">
            {day}
          </span>
        ))}
        {generateDates().map((date, index) => {
          if (date === null) {
            // 빈칸 렌더링
            return <div key={`empty-${index}`} className="w-[34px] h-[34px]" />;
          }

          const formattedDate = format(date, 'yyyy-MM-dd');
          const isStart = startDate && formattedDate === format(startDate, 'yyyy-MM-dd');
          const isEnd = endDate && formattedDate === format(endDate, 'yyyy-MM-dd');
          const isInRange = startDate && endDate && date > startDate && date < endDate;
          const isBeforeToday = isBefore(date, today);
          const isRentable = totalRentableDates.includes(formattedDate); // 대여 가능 여부 확인

          return (
            <button
              key={formattedDate}
              onClick={() => handleDateClick(date)}
              className={`w-[34px] h-[34px] rounded-full text-sm relative flex items-center justify-center
                ${
                  isBeforeToday || !isRentable
                    ? 'text-grey750' // 비활성화된 날짜 스타일
                    : 'text-grey250'
                }
                ${isInRange || isStart || isEnd ? 'bg-red bg-opacity-10 rounded-none w-full' : 'hover:bg-grey900'}
                ${isStart ? 'rounded-l-full' : ''}
                ${isEnd ? 'rounded-r-full' : ''}`}
              disabled={isBeforeToday || !isRentable}>
              {/* ✅ 배경 요소 (z-0) */}
              {isStart || isEnd ? (
                <span className="absolute inset-0 rounded-full w-[34px] border-1.5 border-red bg-darkRed z-0 ml-[5px]"></span>
              ) : null}
              {/* ✅ 숫자 요소 (z-10) */}
              <span className="relative z-10">{format(date, 'd')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
