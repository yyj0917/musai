'use client';

import { useState } from 'react';
import PaymentModal from './paymentModal';

interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

  const handleOpenModal = () => setIsModalOpen(true); // 모달 열기

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-red text-white py-4 rounded-lg w-full font-semibold text-body1 mt-10">
        {text}
      </button>

      {/* 모달 */}
      {isModalOpen && <PaymentModal isOpen={isModalOpen} />}
    </>
  );
}
