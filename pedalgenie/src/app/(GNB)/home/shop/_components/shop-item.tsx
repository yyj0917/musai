'use client';

import { useLikeProductMutation } from '@/hooks/useLikeProductMutation';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { Product } from '@/types/product-type';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type ShopItemProps = {
  shopProductItem: Product;
};

export default function ShopItem({ shopProductItem } : ShopItemProps) {

  const [isAnimating, setIsAnimating] = useState(false);


  const [ isUILike, setIsUILike] = useState<boolean>(false);

  const { isLoggedIn } = useLoginStore();
  const { openLoginModal } = useModalStore();


  const likeMutation = useLikeProductMutation(shopProductItem.id);

  const toggleLikeProduct = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // await handleLikeProduct(productId, isLoggedIn, openLoginModal);
    
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
    likeMutation?.mutate(!shopProductItem.isLiked);
  }
  return (
    <div className="min-w-[140px] h-[195px] flex flex-col gap-3">
      <div className='relative'>
        <Image src={shopProductItem.imageUrl} alt="shop logo" width={140} height={140} className='max-w-[140px] max-h-[140px]' />
        <button
          onClick={(e) => toggleLikeProduct(e)}
          className="absolute bottom-[9px] right-[10px] text-red ">
          <Heart 
            strokeWidth={1.5}
            className={`like-animation ${shopProductItem?.isLiked || isAnimating ? 'unscale fill-red' : 'scale'} `} />
        </button>
      </div>
      <span className="w-full flex flex-col">
        <p className="text-ellipsis text-body2 text-grey450 line-clamp-1">{shopProductItem.name}</p>
        <p className="text-ellipsis text-body1 text-grey150">{shopProductItem.rentPricePerDay}원</p>
      </span>
    </div>
  );
}
