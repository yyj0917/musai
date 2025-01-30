'use client';

import { differenceInDays, parseISO } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type PaymentSummaryProps = {
  rentPricePerDayProp?: number;
  rentDurationProp?: number;
};

export default function PaymentSummary({ rentPricePerDayProp, rentDurationProp }: PaymentSummaryProps) {
  const searchParams = useSearchParams();
  const startDateParam = searchParams.get('StartDate'); // 2025-09-17
  const endDateParam = searchParams.get('EndDate');
  const rentDurationParam = searchParams.get('rentDuration'); // '4'
  const rentPricePerDayParam = searchParams.get('rentPricePerDay'); // '1000'

  let rentDuration = 0;
  let rentPricePerDay = 0;

  // 날짜 값이 없으면 기본값 설정
  const startDate = startDateParam ? parseISO(startDateParam) : null;
  const endDate = endDateParam ? parseISO(endDateParam) : null;

  // rentPricePerDayProp이 있으면 Prop을 우선적으로 사용
  if (rentPricePerDayProp !== undefined) {
    rentPricePerDay = rentPricePerDayProp;
  } else if (rentPricePerDayParam) {
    rentPricePerDay = parseInt(rentPricePerDayParam, 10);
  }

  // rentDurationProp이 있으면 이를 우선적으로 사용
  if (rentDurationProp !== undefined) {
    rentDuration = rentDurationProp;
  } else if (rentDurationParam) {
    // rentDurationProp이 없으면 rentDurationParam을 사용
    rentDuration = parseInt(rentDurationParam, 10);
  } else if (startDate && endDate) {
    // rentDurationParam이 없으면 startDate와 endDate 차이를 계산하여 사용
    rentDuration = differenceInDays(endDate, startDate) + 1; // 날짜 차이 + 1 (포함된 날짜 수)
  }

  // 총 가격 계산
  const totalPrice = Math.ceil(rentPricePerDay * rentDuration).toLocaleString('ko-KR');

  return (
    <section className="w-full">
      <div className="pt-3 pb-3 border-b-0.5 border-grey850 flex justify-between">
        <span className="flex-col">
          <p className="text-grey550 text-label2">{rentPricePerDay.toLocaleString('ko-KR')}원</p>
          <p className="text-grey550">x {rentDuration}일</p>
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
