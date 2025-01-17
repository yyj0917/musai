'use client';

import { ShopProduct } from '@/types/product-type';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type ShopItemProps = {
  shopProductItem: ShopProduct;
};

export default function ShopItem({ shopProductItem } : ShopItemProps) {

  const [isAnimating, setIsAnimating] = useState(false);


  const [ isUILike, setIsUILike] = useState<boolean>(false);


  const toggleLikeProduct = async (productId: number) => {
    // await handleLikeProduct(productId, isLoggedIn, openLoginModal);
    
    // 애니메이션 클래스 추가 - 하트 애니메이션
    setIsAnimating(true);
    setIsUILike(!isUILike);

    // 애니메이션이 끝난 후 클래스 제거
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // 애니메이션 지속 시간과 동일
  }
  return (
    <div className="min-w-[140px] h-[195px] flex flex-col gap-3">
      <div className='relative'>
        <Image src={shopProductItem.thumbnailImage} alt="shop logo" width={140} height={140} className='max-w-[140px] max-h-[140px]' />
        <button
          onClick={() => toggleLikeProduct(shopProductItem?.id)}
          className="absolute bottom-[9px] right-[10px] text-red ">
          <Heart 
            strokeWidth={1.5}
            className={`like-animation ${shopProductItem?.isLiked || isAnimating ? 'scale fill-red' : ''} ${
              isUILike ? 'fill-red' : ''
            }`} />
        </button>
      </div>
      <span className="w-full flex flex-col">
        <p className="text-ellipsis text-body2 text-grey450 line-clamp-1">{shopProductItem.name}</p>
        <p className="text-ellipsis text-body1 text-grey150">{shopProductItem.rentPricePerDay}원</p>
      </span>
    </div>
  );
}
