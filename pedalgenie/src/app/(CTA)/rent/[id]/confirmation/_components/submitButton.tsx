'use client';

import { useState } from 'react';
import PaymentModal from './paymentModal';
import { useSearchParams } from 'next/navigation';

interface SubmitButtonProps {
  id: number;
}

export default function SubmitButton({ id }: SubmitButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

  const handleOpenModal = () => setIsModalOpen(true); // 모달 열기
  const handleCloseModal = () => setIsModalOpen(false); // 모달 닫기

  const searchParams = useSearchParams();
  const rentDurationParam = searchParams.get('rentDuration'); // '4'
  const rentPricePerDayParam = searchParams.get('rentPricePerDay'); // '1000'

  // rentPricePerDay와 rentDuration을 숫자로 변환
  const rentPricePerDayNum = rentDurationParam ? parseInt(rentDurationParam, 10) : 0;
  const rentDurationNum = rentPricePerDayParam ? parseInt(rentPricePerDayParam, 10) : 0;

  let totalPrice = '0';
  // totalPrice 계산
  if (rentPricePerDayNum && rentDurationNum) {
    totalPrice = Math.ceil(rentPricePerDayNum * rentDurationNum).toLocaleString('ko-KR');
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-red text-white py-4 rounded-lg w-full font-semibold text-body1 mt-10">
        {totalPrice}원 입금하기
      </button>

      {/* 모달 */}
      {isModalOpen && <PaymentModal isOpen={isModalOpen} onClose={handleCloseModal} id={id} totalPrice={totalPrice} />}
    </>
  );
}
