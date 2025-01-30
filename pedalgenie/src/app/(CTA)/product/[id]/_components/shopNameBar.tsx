'use client';

import RightArrow from '@public/svg/product/right-arrow-sm-white.svg';
import { useRouter } from 'next/navigation';

interface ShopNameBarProps {
  shopName?: string;
  shopId?: number;
}

export default function ShopNameBar({ shopName, shopId }: ShopNameBarProps) {
  const router = useRouter();

  const handleShopClick = () => {
    router.push(`/home/shop/description/${shopId}`);
  };

  return (
    <button className="flex w-full justify-between py-3.5 px-4 border-b-[1px] border-grey850 cursor-pointer" onClick={handleShopClick}>
      <div className="text-grey450 text-sm">{shopName}</div> {/* 가게 이름 */}
      <div className="flex items-center px-2" >
        <RightArrow />
      </div>
    </button>
  );
}
