'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import RightArrow from '@public/svg/home/right-arrow.svg';
import { Heart } from 'lucide-react';
import { useAuthStore, useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { handleLikeProduct } from '@/lib/utils/like-util';
import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product-type';
import { useRouter } from 'next/navigation';
import { likeProduct } from '@/lib/api/like';
import { useLikeProductMutation } from '@/hooks/useLikeProductMutation';

type ProductItemProps = {
  genreProductItem: Product;
};

export default function PreviewItem({ genreProductItem }: ProductItemProps) {
  const router = useRouter();

  const { isLoggedIn } = useLoginStore();
  const { openLoginModal } = useModalStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const [isUILike, setIsUILike] = useState<boolean>(false);

  const likeMutation = useLikeProductMutation(genreProductItem.id, ['genreProduct']);

  const toggleLikeProduct = async (e: React.MouseEvent<HTMLButtonElement>, productId: number) => {
    e.preventDefault();

    // 로그인 체크
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    // 애니메이션 클래스 추가 - 하트 애니메이션
    setIsAnimating(true);
    setIsUILike(!isUILike);

    // 애니메이션이 끝난 후 클래스 제거
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // 애니메이션 지속 시간과 동일
    likeMutation?.mutate(!genreProductItem.isLiked);
  };
  const price = genreProductItem?.rentPricePerDay || 0; // 가격 가져오기
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);

  return (
    <Link
      href={`/product/${genreProductItem?.id}`}
      className="relative min-w-[138px] max-h-[252px] flex flex-col gap-3">
      <div className="relative w-full min-h-[138px] bg-grey750 rounded-sm">
        {genreProductItem?.imageUrl ? (
          <Image
            src={`${genreProductItem?.imageUrl}`}
            alt={`${genreProductItem?.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-fit"
          />
        ) : (
          <div className="w-full h-full bg-grey750" /> // 기본 배경 표시
        )}
        <button
          onClick={(e) => toggleLikeProduct(e, genreProductItem?.id)}
          className="absolute bottom-2 right-2 text-red ">
          <Heart
            strokeWidth={1.5}
            className={`like-animation ${genreProductItem.isLiked || isAnimating ? 'unscale fill-red' : ''} ${isUILike ? 'fill-red' : ''}`}
          />
        </button>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-1">
          {/* Shop Name  && 해당 상점으로 이동 + product Link routing prevent*/}
          <button
            className="text-body1 text-grey250 flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/home/shop/description/${genreProductItem?.shopId}`);
            }}>
            <p className="w-auto max-w-[122px] truncate">{genreProductItem?.shopName}</p>
            <RightArrow />
          </button>
          {/* Product Name */}
          <p className="text-ellipsis text-grey450 text-body1 line-clamp-1">{genreProductItem?.name}</p>
          {/* Rental Price */}
          <p className="text-body1 flex item-center gap-1">
            <span className="text-grey250">{formattedPrice}원</span>
          </p>
          <div className="flex gap-1">
            {genreProductItem?.isDemoable && <Button variant="chip">시연</Button>}
            {genreProductItem?.isRentable && <Button variant="chip">대여</Button>}
            {genreProductItem?.isPurchasable && <Button variant="chip">구매</Button>}
          </div>
        </div>
      </div>
    </Link>
  );
}
