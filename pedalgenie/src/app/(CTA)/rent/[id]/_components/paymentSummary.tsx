'use client';

import React, { useEffect, useState } from 'react';

type PaymentSummaryProps = {
  rentPricePerDay: number | undefined;
  rentDuration: number | undefined;
};

export default function PaymentSummary({ rentPricePerDay, rentDuration }: PaymentSummaryProps) {

  return (
    <section className="w-full">
      <div className="pt-3 pb-3 border-b-0.5 border-grey850 flex justify-between">
        <span className="flex-col">
          <p className="text-grey550 text-label2">{rentPricePerDay}원</p>
          <p className="text-grey550 ">x {rentDuration}일</p>
        </span>
        <p className="pt-6 text-label1 text-grey150">totalcost원</p>
      </div>
      <div className="flex justify-between pt-3 pb-1">
        <p className="text-title1 text-red">합계</p>
        <p className="text-title1 text-red">totalcost원</p>
      </div>
    </section>
  );
}
