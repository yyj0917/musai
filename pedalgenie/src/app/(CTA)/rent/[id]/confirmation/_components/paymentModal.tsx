'use client';

import { Button } from '@/components/ui/button';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import CopyButton from './copyButton';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void; // 부모에서 모달 닫기 제어
  id: number;
}

export default function PaymentModal({ isOpen, onClose, id }: PaymentModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const endDateParam = searchParams.get('EndDate');
  const rentDurationParam = searchParams.get('rentDuration'); // '4'
  const rentPricePerDayParam = searchParams.get('rentPricePerDay'); // '1000'

  const { toast } = useToast();

  const handleCloseRentPage = () => {
    router.push(`/product/${id}`);
    onClose(); // 모달 닫기
    toast({
      description: '대여 예약이 완료되었어요!',
    });
  };

  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

  const accountInfo = '신한 110203923432'; // 임시 계좌 정보

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
      onClick={onClose} // 바깥쪽 클릭 시 모달 닫기
    >
      <div
        className="bg-grey850 px-4 pt-6 pb-8 rounded-t-2xl rounded-b-none w-[375px] transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
        style={{ animation: `${isOpen ? 'slideUp' : 'slideDown'} 0.3s ease-in-out` }}
      >
        <h2 className="text-title2 pb-2 text-grey150">입금 계좌</h2>
        <p className="font-semibold pb-3 text-body2 text-red white-space: pre-line">
          입금자명을 뮤뮤로 해주세요.
          <br />
          입금자명이 카카오 닉네임과 다르면 관리자 승인이 어려워요.
        </p>
        <section className="flex flex-col bg-grey750 p-4 rounded-sm space-y-1">
          <div className="flex items-center">
            <div className="flex flex-col flex-1">
              <p>{accountInfo}</p>
              <p>예금주 : 구연성</p>
            </div>
            {/* 계좌 복사 버튼 */}
            <CopyButton textToCopy={accountInfo} />
          </div>
        </section>

        {/* 닫기 버튼 */}
        <Button
          variant={'custom'}
          className={'mt-6 bg-red text-ivory px-4 rounded w-full text-body2'}
          onClick={handleCloseRentPage}
        >
          300,000원 입금 완료했어요
        </Button>
      </div>
    </div>
  );
}
