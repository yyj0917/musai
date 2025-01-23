'use client';

import Image from 'next/image';
import RightArrow from '@public/svg/home/right-arrow.svg';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useState } from 'react';
import './../../../globals.css';
import { Product } from '@/types/product-type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLikeProductMutation } from '@/hooks/useLikeProductMutation';

type ProductItem = {
    product: Product;
    // 무한 스크롤의 queryKey(예: ['products', category, ...])
    queryKey?: (string | string[])[];
}

export default function ProductItem({ product, queryKey } : ProductItem) {
  const router = useRouter();
  const { isLoggedIn } = useLoginStore();
  const { openLoginModal } = useModalStore();
  const [isAnimating, setIsAnimating] = useState(false);



  // 좋아요 Mutation
  // - product.isLiked를 보고 "true→취소 / false→등록" 구분
  const likeMutation = useLikeProductMutation(product.id, queryKey);

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

    // 2) 서버에 좋아요 or 취소 요청 (Optimistic Update)
    likeMutation?.mutate(!product.isLiked);
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
          onClick={(e) => toggleLikeProduct(e)}
          className="absolute bottom-4 right-4 text-red ">
          <Heart 
            strokeWidth={1.5}
            className={`like-animation ${product?.isLiked || isAnimating ? 'unscale fill-red' : 'scale'} `} />
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
