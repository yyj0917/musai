"use client"

import React, { useState } from "react";
import { addDays, format, isBefore, isAfter, isWithinInterval, parseISO } from 'date-fns';

export default function ({}){
  const today = new Date();  
  const maxDate = addDays(today, 30); // 오늘부터 30일 이후까지 선택 가능
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateClick = (selectedDate) => {
    if (!startDate) {
      setStartDate(selectedDate);
      setEndDate(null); // 새 시작일 선택 시 종료일 초기화
    } else if (
      isAfter(selectedDate, addDays(startDate, 2)) && // 최소 3일 이후만 선택 가능
      isBefore(selectedDate, maxDate)
    ) {
      setEndDate(selectedDate);
    } else {
      alert("대여 종료일은 대여 시작일로부터 최소 3일 이후여야 합니다!");
    }
  };

  const renderDay = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const isDisabled = isBefore(date, today) || isAfter(date, maxDate);
    const isSelectable = startDate && isWithinInterval(date, { start: addDays(startDate, 3), end: maxDate });
    const isStart = startDate && format(startDate, "yyyy-MM-dd") === formattedDate;
    const isEnd = endDate && format(endDate, "yyyy-MM-dd") === formattedDate;

    return (
      <button
        key={formattedDate}
        onClick={() => handleDateClick(date)}
        className={`w-10 h-10 rounded-full mx-1 my-1 ${
          isStart ? "bg-blue-500 text-white" : isEnd ? "bg-green-500 text-white" : ""
        } ${isDisabled ? "text-gray-400 cursor-not-allowed" : isSelectable ? "bg-gray-200 hover:bg-blue-100" : "hover:bg-gray-200"}
        `}
        disabled={isDisabled}
      >
        {format(date, "d")}
      </button>
    );
  };

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i <= 30; i++) {
      const date = addDays(today, i);
      dates.push(date);
    }
    return dates;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-semibold">대여 기간 선택</h2>
      <div className="grid grid-cols-7 gap-2">
        {generateDates().map((date) => renderDay(date))}
      </div>
      <div className="mt-4">
        {startDate && (
          <p className="text-gray-700">
            대여 시작일: <span className="font-semibold">{format(startDate, "yyyy-MM-dd")}</span>
          </p>
        )}
        {endDate && (
          <p className="text-gray-700">
            대여 종료일: <span className="font-semibold">{format(endDate, "yyyy-MM-dd")}</span>
          </p>
        )}
      </div>
    </div>
  );
};
