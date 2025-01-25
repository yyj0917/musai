import { LikeShop } from '@/types/shop-type';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product-type';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useState } from 'react';
import { useLikeShopMutation } from '@/hooks/useLikeShopMutation';

type LikeShopItem = {
  likeShop: LikeShop;
};

export default function LikeShopItem({ likeShop }: LikeShopItem) {
  const { isLoggedIn } = useLoginStore();
  const { openLoginModal } = useModalStore();
  const [isAnimating, setIsAnimating] = useState(false);

  // 좋아요 Mutation
  // - product.isLiked를 보고 "true→취소 / false→등록" 구분
  const likeMutation = useLikeShopMutation(likeShop.shopId, ['shopList']);

  const toggleLikeShop = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 로그인 체크
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    // 1) 하트 애니메이션 실행
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // 0.5초 애니메이션

    // 2) 서버에 좋아요 or 취소 요청 (Optimistic Update)
    likeMutation?.mutate(!likeShop.isLiked);
  };
  return (
    <Link
      href={`/home/shop/description/${likeShop?.shopId}`}
      className="px-4 py-5 w-full h-auto flex justify-between items-center">
      <div className="flex items-center gap-[14px]">
        <Image src={likeShop?.thumbNailUrl} alt="shopImg" width={40} height={40} className="rounded-full" />
        <p className="text-label1 text-white">{likeShop?.shopName}</p>
      </div>
      {/* 좋아요 취소하는 로직 추가 해야 함 */}
      <button onClick={(e) => toggleLikeShop(e)} className="text-red ">
        <Heart
          strokeWidth={1.5}
          className={`like-animation ${likeShop?.isLiked || isAnimating ? 'unscale fill-red' : ''} `}
        />
      </button>
    </Link>
  );
}
