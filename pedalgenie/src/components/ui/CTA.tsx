'use client';

import { useParams } from 'next/navigation';
import CTAHeart from '@public/svg/CTA-heart.svg';
import CTAvector from '@public/svg/CTA-vector.svg';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface CTAProps {
  id: number;
  isRentable: boolean;
  isDemoable: boolean;
}

export default function CTA({ id, isRentable, isDemoable }: CTAProps) {
  const productId = id;
  const { toast } = useToast();

  const handleUnableToast = (action: string) => {
    // 대여 또는 시연 불가능할 경우 토스트 메시지
    toast({
      description: `${action} 불가능한 상품입니다.`,
    });
  };

  return (
    <nav className="bg-grey1000 absolute bottom-0 w-full flex justify-between items-center pt-3 pb-[50px] px-[20px] border-t-[1px] border-grey750 font-pretendard">
      <CTAHeart />
      <div className="flex justify-center items-center gap-[26px] text-label1 text-grey250">
        {/* 대여 예약하기 */}
        {isRentable ? (
          <Link href={`/rent/${productId}`}>대여 예약하기</Link>
        ) : (
          <button
            onClick={() => handleUnableToast('대여')}
            className="text-grey250 hover:text-grey400"
          >
            대여 예약하기
          </button>
        )}

        <CTAvector />

        {/* 시연 예약하기 */}
        {isDemoable ? (
          <Link href={`/demo/${productId}`}>시연 예약하기</Link>
        ) : (
          <button
            onClick={() => handleUnableToast('시연')}
            className="text-grey250 hover:text-grey400"
          >
            시연 예약하기
          </button>
        )}
      </div>
    </nav>
  );
}
