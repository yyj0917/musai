'use client';

import CTAvector from '@public/svg/CTA-vector.svg';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Button } from './button';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import LoginModal from '../modal/login-modal';
import ProductHeart from '@/app/(CTA)/product/[id]/_components/ProductHeart';

interface CTAProps {
  productId: number;
  isRentable: boolean | undefined;
  isDemoable: boolean | undefined;
  isLiked: boolean | undefined | null;
  setIsProductUiLiked: (isLiked: boolean) => void;
  isProductUiLiked: boolean;
}

export default function CTA({
  productId,
  isRentable,
  isDemoable,
  isLiked,
  setIsProductUiLiked,
  isProductUiLiked,
}: CTAProps) {
  // 로그인 관련
  const { isLoggedIn } = useLoginStore();
  const { toast } = useToast();
  const { openLoginModal } = useModalStore();

  // 대여 또는 시연 불가능할 경우 토스트 메시지
  const handleUnableToast = (action: string) => {
    toast({
      description: `${action} 불가능한 상품입니다.`,
    });
  };

  return (
    <nav className="bg-grey1000 absolute bottom-0 w-full flex justify-between items-center pt-3 pb-[50px] px-[20px] border-t-[1px] border-grey750 font-pretendard">
      <ProductHeart
        isLiked={isLiked}
        productId={productId}
        setIsProductUiLiked={setIsProductUiLiked}
        isProductUiLiked={isProductUiLiked}
      />
      <div className="flex justify-center items-center gap-5 text-label1 text-grey250">
        {/* 대여 예약하기 */}
        {isLoggedIn === false ? (
          <Button variant="reserve" onClick={() => openLoginModal()}>
            대여 예약하기
          </Button>
        ) : isRentable === true ? (
          <Link href={`/rent/${productId}`}>대여 예약하기</Link>
        ) : (
          <Button variant="reserve" onClick={() => handleUnableToast('대여')}>
            대여 예약하기
          </Button>
        )}

        <CTAvector />

        {/* 시연 예약하기 */}
        {isLoggedIn === false ? (
          <Button variant="reserve" onClick={() => openLoginModal()}>
            시연 예약하기
          </Button>
        ) : isDemoable === true ? (
          <Link href={`/demo/${productId}`}>시연 예약하기</Link>
        ) : (
          <Button variant="reserve" onClick={() => handleUnableToast('시연')}>
            시연 예약하기
          </Button>
        )}
      </div>
      <LoginModal />
    </nav>
  );
}
