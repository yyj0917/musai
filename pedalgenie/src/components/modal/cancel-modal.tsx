'use client';

import { useModalStore } from '@/lib/zustand/useModalStore';
import CloseX from '@public/svg/close-x.svg';

export default function CancelModal() {
  const { isCancelOpen, closeCancelModal } = useModalStore();

  if (!isCancelOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeCancelModal}>
      <div
        className="relative px-5 pt-[50px] pb-6 bg-grey850 text-center w-[90%] max-w-[320px] max-h-[276px] rounded-md shadow-lg"
        onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-5 right-5 text-grey450" onClick={closeCancelModal}>
          <CloseX />
        </button>
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="p-0 flex flex-col justify-center items-center gap-[10px]">
            <h2 className="text-title1 text-grey150 flex flex-col">
              <span>예약 취소를 원한다면,</span>
              <span>아래 채널톡으로 환불 받을</span>
              <span>계좌를 적어주세요</span>
            </h2>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <button onClick={closeCancelModal} className='custom-channeltalk w-full h-11 rounded text-center text-body1 text-grey150 bg-red'>
                채널톡에서 취소 접수하기
            </button>
            <button onClick={closeCancelModal} className="w-full h-11 text-center text-grey150 text-body1">
              아니요. 잘못 눌렀어요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
