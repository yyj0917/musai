import Image from 'next/image';
import RightArrow from '@public/svg/home/shop/shop-rightarrow.svg';
import Link from 'next/link';
import ShopItem from './shop-item';
import { Heart } from 'lucide-react';
import { Shop } from '@/types/shop-type';
import { Product } from '@/types/product-type';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useState } from 'react';
import { useLikeShopMutation } from '@/hooks/useLikeShopMutation';

type ShopProps = {
  shopOne: Shop;
};

export default function ShopDetail({ shopOne }: ShopProps) {
  const { isLoggedIn } = useLoginStore();
  const { openLoginModal } = useModalStore();
  const [isAnimating, setIsAnimating] = useState(false);

  // 좋아요 Mutation
  // - product.isLiked를 보고 "true→취소 / false→등록" 구분
  const likeMutation = useLikeShopMutation(shopOne.shopId, ['shopList']);

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
    likeMutation?.mutate(!shopOne.isLiked);
  };
  if (!shopOne) {
    return null;
  }

  return (
    <div className="pl-4 w-full h-auto flex flex-col">
      {/* Store Header */}
      <header className="pr-4 pb-3 w-full flex justify-between items-center">
        <Link href={`/home/shop/description/${shopOne.shopId}`} className="flex gap-[14px]">
          <Image
            src={`${shopOne.shopImageUrl}`}
            alt="shop logo"
            width={40}
            height={40}
            className="min-w-10 min-h-10 object-fill rounded-full"
          />
          <span className="flex justify-between items-center gap-3 text-grey150 text-label1">
            <p>{shopOne.shopname}</p>
            <RightArrow />
          </span>
        </Link>
        <button onClick={(e) => toggleLikeShop(e)} className="text-red ">
          <Heart
            strokeWidth={1.5}
            className={`like-animation ${shopOne?.isLiked || isAnimating ? 'unscale fill-red' : 'scale'} `}
          />
        </button>
      </header>
      {/* Store Item List */}
      <section className="w-full flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide">
        {shopOne.products.map((shopProductItem: Product, idx) => (
          <ShopItem key={idx} shopProductItem={shopProductItem} />
        ))}
      </section>
    </div>
  );
}
