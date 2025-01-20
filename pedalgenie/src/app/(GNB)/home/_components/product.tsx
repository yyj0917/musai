'use client';

import Image from 'next/image';
import RightArrow from '@public/svg/home/right-arrow.svg';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { handleLikeProduct } from '@/lib/utils/like-util';
import { useState } from 'react';
import './../../../globals.css';
import { Product } from '@/types/product-type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ProductItem = {
    product: Product;
}

export default function ProductItem({ product } : ProductItem) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { openLoginModal } = useModalStore();
  const [isAnimating, setIsAnimating] = useState(false);


  const [ isUILike, setIsUILike] = useState<boolean>(false);


  const toggleLikeProduct = async (e : React.MouseEvent<HTMLButtonElement>, productId: number) => {
    e.preventDefault();
    // await handleLikeProduct(productId, isLoggedIn, openLoginModal);
    
    // 애니메이션 클래스 추가 - 하트 애니메이션
    setIsAnimating(true);
    setIsUILike(!isUILike);

    // 애니메이션이 끝난 후 클래스 제거
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // 애니메이션 지속 시간과 동일
  }
  if (!product) {
    return null;
  }


  return (
    <Link href={`/product/${product.id}`} className="fadeIn pb-5 w-full flex flex-col">
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={`${product?.imageUrl}`}
          alt={`${product?.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
          className="object-cover"
        />
        <button
          onClick={(e) => toggleLikeProduct(e, product?.id)}
          className="absolute bottom-4 right-4 text-red ">
          <Heart 
            strokeWidth={1.5}
            className={`like-animation ${product?.isLiked || isAnimating ? 'scale fill-red' : ''} ${
              isUILike ? 'fill-red' : ''
            }`} />
        </button>
      </div>
      <div className="px-4 py-3 w-full">
        <div className="w-full flex flex-col gap-1">
          {/* Shop Name  && 해당 상점으로 이동 + product Link routing prevent*/}
          <button
            className="text-body1 text-grey250 flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/home/shop/description/${product?.shopId}`)}}
            >
            <p className='w-auto max-w-[122px] truncate'>{product?.shopName}</p>
            <RightArrow />
          </button>
          {/* Product Name */}
          <p className="text-ellipsis text-grey450 text-body2 line-clamp-1">{product?.name}</p>
          {/* Rental Price */}
          <p className="text-body1 flex item-center gap-1">
            <span className="text-grey550 flex mb-1">
              <span>일</span>
              <span>ㅣ</span>
            </span>
            <span className="text-grey250">{product?.rentPricePerDay} 원</span>
          </p>
          {/* 시연, 대여, 구매 여부 chip */}
          <div className="flex gap-1">
            {product?.isDemoable && (
              <Button variant="chip">시연</Button>
            )}
            {product?.isRentable && (
              <Button variant="chip">대여</Button>
            )}
            {product?.isPurchasable && (
              <Button variant="chip">구매</Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
