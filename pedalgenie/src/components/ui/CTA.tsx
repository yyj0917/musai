'use client';

import { useParams } from 'next/navigation';
import CTAHeart from '@public/svg/CTA-heart.svg';
import CTAvector from '@public/svg/CTA-vector.svg';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Button } from './button';
import { Heart } from 'lucide-react';
import { useLikeProductMutation } from '@/hooks/useLikeProductMutation';
import { useState } from 'react';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import LoginModal from '../modal/login-modal';

// 로그인 모달이 안뜸

{
  /* 
const reserveButton = (isLoggedIn: boolean, action: string, isAble: boolean) => {
  return (
    <>
      {isLoggedIn === false ? (
        <Button variant="reserve" onClick={() => openLoginModal()}>
          {action} 예약하기
        </Button>
      ) : isAble === true ? (
        <Link href={`/rent/${productId}`}>{action} 예약하기</Link>
      ) : (
        <Button variant="reserve" onClick={() => handleUnableToast(`${action}`)}>
          {action} 예약하기
        </Button>
      )}
    </>
  );
};*/
}

interface CTAProps {
  productId: number;
  isRentable: boolean | undefined;
  isDemoable: boolean | undefined;
  isLiked: boolean | undefined | null;
  queryKey: (string | string[])[];
  // 비로그인 시 null로 받아와짐
}

export default function CTA({ productId, isRentable, isDemoable, isLiked, queryKey }: CTAProps) {
  // 로그인 관련
  const { isLoggedIn } = useLoginStore();
  // 하트 관련
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  const { openLoginModal } = useModalStore();

  // 대여 또는 시연 불가능할 경우 토스트 메시지
  const handleUnableToast = (action: string) => {
    toast({
      description: `${action} 불가능한 상품입니다.`,
    });
  };

  // 좋아요 Mutation
  const likeMutation = useLikeProductMutation(productId, queryKey);

  const toggleLikeProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 로그인 체크
    if (!isLoggedIn) {
      openLoginModal();
      console.log('로그인', isLoggedIn);
      return;
    }
    // 1) 하트 애니메이션 실행
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    // 2) 서버에 좋아요 or 취소 요청 (Optimistic Update)
    likeMutation?.mutate(!isLiked);
  };

  return (
    <nav className="bg-grey1000 absolute bottom-0 w-full flex justify-between items-center pt-3 pb-[50px] px-[20px] border-t-[1px] border-grey750 font-pretendard">
      <button onClick={(e) => toggleLikeProduct(e)} className="text-red">
        <Heart
          strokeWidth={1.5}
          className={`like-animation ${isLiked || isAnimating ? 'unscale fill-red' : 'scale'} `}
        />
      </button>

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
      <LoginModal/>
    </nav>
  );
}
