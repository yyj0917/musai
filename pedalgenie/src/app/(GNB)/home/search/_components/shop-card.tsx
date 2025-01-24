import { useLikeShopMutation } from '@/hooks/useLikeShopMutation';
import { SearchItem, SearchShop } from '@/types/search-type';
import { Heart } from 'lucide-react';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { set } from 'lodash';
type ShopCardProps = {
  shop: SearchShop;
};

export default function ShopCard({ shop }: ShopCardProps) {
  const { isLoggedIn } = useLoginStore();
  const { openLoginModal } = useModalStore();
  const [isAnimating, setIsAnimating] = useState(false);
  // 좋아요 로직 넣어야 함.
  const likeMutation = useLikeShopMutation(shop.shopId, ['searchResults']);
  const [isUILike, setIsUILike] = useState(shop.isLiked);
  const toggleLikeSearchedShop = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

    setIsUILike(!isUILike);

    // 2) 서버에 좋아요 or 취소 요청 (Optimistic Update)
    likeMutation?.mutate(!shop.isLiked);
  };

  return (
    <Link href={`/home/shop/description/${shop.shopId}`}>
      <article className="px-3 py-4 min-w-[316px] w-full flex justify-between items-center gap-3 border-[1px] border-grey650 rounded-[8px]">
        <div className="w-full flex justify-start items-center gap-3">
          <Image src={shop.imageUrl} alt="shop" width={44} height={44} className="object-fill rounded-[4px]" />
          <div className="flex flex-col justify-center items-start gap-[2px]">
            <p className="text-label1 text-grey150">{shop.shopname}</p>
            <p className="text-caption1 text-grey450 line-clamp-1">{shop.description}</p>
          </div>
        </div>
        <button onClick={(e) => toggleLikeSearchedShop(e)} className="text-red ">
          <Heart
            strokeWidth={1.5}
            className={`like-animation ${isAnimating || isUILike ? 'unscale fill-red' : 'scale'} `}
          />
        </button>
      </article>
    </Link>
  );
}
