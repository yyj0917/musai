'use client';

import React, { useEffect, useState } from 'react';

{
  /* API 데이터로 수정 */
}

export default function PaymentSummary({}) {
  return (
    <section className="w-full">
      <div className="pt-3 pb-3 border-b-0.5 border-grey850 flex justify-between">
        <span className='flex-col'>
        <p className="text-grey550 text-label2">30,000원</p>
        <p className="text-grey550 ">x 10일</p>
        </span>
        <p className="text-label1 text-grey150">300,000원</p>
      </div>
      <div className="flex justify-between pt-3 pb-1">
        <p className="text-title1 text-red">합계</p>
        <p className="text-title1 text-red">303,000원</p>
      </div>
    </section>
  );
}
