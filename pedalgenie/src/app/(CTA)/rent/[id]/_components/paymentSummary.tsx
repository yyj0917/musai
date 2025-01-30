'use client';

import { differenceInDays, format, parseISO } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type PaymentSummaryProps = {
  rentPricePerDay?: number;
  rentDuration: number;
};

export default function PaymentSummary({ rentPricePerDay, rentDuration }: PaymentSummaryProps) {
  const searchParams = useSearchParams();
  const startDateParam = searchParams.get('StartDate'); // 2025-09-17
  const endDateParam = searchParams.get('EndDateTime'); // 2025-09-26T17:30:00

  console.log('rentDuration', rentDuration);

  if (!rentPricePerDay) rentPricePerDay = 0;
  if (!rentDuration) rentDuration = 0;

  // 날짜 변환 처리
  const startDate = startDateParam ? parseISO(startDateParam) : null;
  const endDate = endDateParam ? parseISO(endDateParam.split('T')[0]) : null;

  const totalPrice = Math.ceil(rentPricePerDay * rentDuration).toLocaleString('ko-KR');

  return (
    <section className="w-full">
      <div className="pt-3 pb-3 border-b-0.5 border-grey850 flex justify-between">
        <span className="flex-col">
          <p className="text-grey550 text-label2">{rentPricePerDay.toLocaleString('ko-KR')}원</p>
          <p className="text-grey550 ">x {rentDuration}일</p>
        </span>
        <p className="pt-6 text-label1 text-grey150">{totalPrice}원</p>
      </div>
      <div className="flex justify-between pt-3 pb-1">
        <p className="text-title1 text-red">합계</p>
        <p className="text-title1 text-red">{totalPrice}원</p>
      </div>
    </section>
  );
}
