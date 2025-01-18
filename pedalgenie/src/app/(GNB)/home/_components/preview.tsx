'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import RightArrow from '@public/svg/home/right-arrow.svg';
import { Heart} from 'lucide-react';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { handleLikeProduct } from '@/lib/utils/like-util';
import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product-type';

type ProductItemProps = {
  genreProductItem: Product;
};

export default function PreviewItem({ genreProductItem }: ProductItemProps) {
  // if (!item) {
  //     // Skeleton Code
  //     return (
  //       <ItemSkeleton/>
  //     );
  //   }
  const { isLoggedIn } = useAuthStore();
  const { openLoginModal } = useModalStore();
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
    <div className="relative min-w-[138px] h-[252px] flex flex-col gap-3">
      <div className="relative w-full min-h-[138px] bg-grey750 rounded-sm">
        <Image
          src={`${genreProductItem?.imageUrl}`}
          alt={`${genreProductItem?.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
          className="object-fit"
        />
        <button
          onClick={() => toggleLikeProduct(genreProductItem?.id)}
          className="absolute bottom-2 right-2 text-red ">
          <Heart 
            strokeWidth={1.5}
            className={`like-animation ${isAnimating ? 'scale fill-red' : ''} ${
              isUILike ? 'fill-red' : ''
            }`} />
        </button>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-1">
          {/* 매장 상세 페이지 이동 - 해당 shopId */}
          <Link href={`/home/shop/description/${genreProductItem?.shopId}`} className="text-body1 text-grey250 flex items-center gap-3">
            <span>{genreProductItem?.shopName}</span>
            <RightArrow />
          </Link>
          <p className="text-ellipsis text-grey450 text-body1 line-clamp-1">{genreProductItem?.name}</p>
          <p className="text-body1 flex item-center gap-1">
            <span className="text-grey250">{genreProductItem?.rentPricePerDay}원</span>
          </p>
          <div className="flex gap-1">
            {genreProductItem?.isDemoable && (
              <Button variant="chip">시연</Button>
            )}
            {genreProductItem?.isRentable && (
              <Button variant="chip">대여</Button>
            )}
            {genreProductItem?.isPurchasable && (
              <Button variant="chip">구매</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
