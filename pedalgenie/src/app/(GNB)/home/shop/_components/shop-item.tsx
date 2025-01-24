'use client';

import { useLikeProductMutation } from '@/hooks/useLikeProductMutation';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { Product } from '@/types/product-type';
import { ShopList } from '@/types/shop-type';
import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type ShopItemProps = {
  shopProductItem: Product;
};

export default function ShopItem({ shopProductItem } : ShopItemProps) {

  const [isAnimating, setIsAnimating] = useState(false);


  const { isLoggedIn } = useLoginStore();
  const { openLoginModal } = useModalStore();
  const queryClient = useQueryClient();

  const queryKey = ['shopList'];
  
  const likeMutation = useLikeProductMutation(shopProductItem.id, queryKey);

  const toggleLikeProduct = async (e : React.MouseEvent<HTMLButtonElement>) => {
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

    // 2) 낙관적 업데이트: 캐시 데이터 수정
    queryClient.setQueryData(['shopList'], (oldData: ShopList | undefined) => {
      if (!oldData) return oldData;

      // shopList 데이터 복사
      const updatedData = [...oldData];

      // 특정 shop 및 product 찾아 수정
      const shopIndex = updatedData.findIndex(shop => shop.shopId === shopProductItem.shopId);
      if (shopIndex !== -1) {

        const productIndex = updatedData[shopIndex].products.findIndex(
          product => product.id === shopProductItem.id
        );
        if (productIndex !== -1) {
          updatedData[shopIndex].products[productIndex].isLiked = !shopProductItem.isLiked;
        }
      }

    return updatedData;
  });
    // 2) 서버에 좋아요 or 취소 요청 (Optimistic Update)
    likeMutation?.mutate(!shopProductItem.isLiked);
  };
  return (
    <Link href={`/product/${shopProductItem.id}`}  className="min-w-[140px] h-[195px] flex flex-col gap-3">
      <div className='relative'>
        <Image src={shopProductItem.imageUrl} alt="shop logo" width={140} height={140} className='w-[140px] h-[140px]' />
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
    </Link>
  );
}
