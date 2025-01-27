'use client';

import LoginModal from '@/components/modal/login-modal';
import { useToast } from '@/hooks/use-toast';
import { useLikeProductMutation } from '@/hooks/useLikeProductMutation';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import {Heart} from 'lucide-react';
import { useState } from 'react';

type ProductHeartProps = {
  productId: number;
  isLiked: boolean | undefined | null;
  queryKey: (string | string[])[];
};

export default function ProductHeart({ productId, isLiked, queryKey }: ProductHeartProps) {
  // 로그인 관련
  const { isLoggedIn } = useLoginStore();
  // 하트 관련
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  const { openLoginModal } = useModalStore();

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
    <div>
      <button onClick={(e) => toggleLikeProduct(e)} className="text-red">
        <Heart
          strokeWidth={1.5}
          className={`like-animation ${isLiked || isAnimating ? 'unscale fill-red' : 'scale'} `}
        />
      </button>
      <LoginModal/>
    </div>
  );
}
