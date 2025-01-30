'use client';

import { useSearchParams } from 'next/navigation';

export default function RentFeeSummary() {
  const searchParams = useSearchParams();
  const rentPricePerDay = searchParams.get('rentPricePerDay');
  const rentDuration = searchParams.get('rentDuration');

  // rentPricePerDay와 rentDuration을 숫자로 변환
  const rentPricePerDayNum = rentPricePerDay ? parseInt(rentPricePerDay, 10) : 0;
  const rentDurationNum = rentDuration ? parseInt(rentDuration, 10) : 0;

  let formattedRentPricePerDay = '0';
  if (rentPricePerDayNum) {
    formattedRentPricePerDay = rentPricePerDayNum.toLocaleString('ko-KR');
  }

  // totalPrice 계산
  let totalPrice = '0';
  if (rentPricePerDayNum && rentDurationNum) {
    const calculatedTotalPrice = Math.ceil(rentPricePerDayNum * rentDurationNum);
    totalPrice = calculatedTotalPrice.toLocaleString('ko-KR');
  }

  return (
    <>
      <h2 className="text-title2 pb-3">결제 금액</h2>

      {/* 결제 금액 요약 섹션 */}
      <section className="flex flex-col bg-grey850 p-4 rounded-sm space-y-1">
        {/* 1일 대여료 */}
        <div className="flex justify-between">
          <p className="text-grey550 text-body2">1일 대여료</p>
          <p className="text-label1">{formattedRentPricePerDay}원</p>
        </div>

        {/* 대여 일수 */}
        <div className="flex justify-between border-b border-grey750 pb-3">
          <p className="text-grey550 text-body2">x 대여 일수</p>
          <p className="text-label1">{rentDurationNum}일</p>
        </div>

        {/* 합계 금액 */}
        <div className="flex justify-between pt-2 text-red text-title1">
          <p>합계</p>
          <p>{totalPrice}원</p>
        </div>
      </section>
    </>
  );
}
