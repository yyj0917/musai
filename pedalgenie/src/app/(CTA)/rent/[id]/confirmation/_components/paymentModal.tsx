'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import CopyButton from './copyButton';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { CreateRentReservation } from '@/lib/api/(product)/reservation';
import Loading from '@/components/loading';
import dayjs from 'dayjs';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void; // 부모에서 모달 닫기 제어
  id: number;
  totalPrice: string;
}

export default function PaymentModal({ isOpen, onClose, id, totalPrice }: PaymentModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 파라미터에서 EndDate 받아오기
  const endDateParam = searchParams.get('EndDate');
  // `EndDate`가 없을 경우 기본값 설정 (현재 날짜)
  const endDate = endDateParam ? dayjs(endDateParam) : dayjs();
  // "YYYY-MM-DDT00:00:00" 포맷으로 변환
  const formattedEndDateTime = endDate.format('YYYY-MM-DD') + 'T00:00:00';

  // 파라미터에서 timeId 받아오기
  const timeIdParam = searchParams.get('TimeId');
  if (!timeIdParam) {
    console.log('timeId 불러오기 실패');
    return null;
  } // timeIdParam이 null일 때 0으로 설정하여 항상 useMutation이 실행되도록 수정.
  const timeId = timeIdParam ? parseInt(timeIdParam, 10) || 0 : 0;

  // 대여 생성 요청
  const {
    mutate: createRent,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => CreateRentReservation(Number(id), timeId, formattedEndDateTime),
    onSuccess: (data) => {
      console.log('대여 예약 성공:', data);
      toast({ description: '대여 예약이 완료되었어요!' });
      router.push(`/product/${id}`);
      onClose();
    },
    onError: (error) => {
      console.error('대여 예약 실패:', error);
      toast({ description: '대여 예약에 실패했어요. 다시 시도해주세요.' });
    },
  });

  const handleCloseRentPage = () => {
    router.push(`/product/${id}`);
    createRent();
    onClose(); // 모달 닫기
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
        style={{ animation: `${isOpen ? 'slideUp' : 'slideDown'} 0.3s ease-in-out` }}>
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
          onClick={handleCloseRentPage}>
          {totalPrice}원 입금 완료했어요
        </Button>
      </div>
      {isPending && <Loading />}
    </div>
  );
}
