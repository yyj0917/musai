import Image from 'next/image';
import RightArrow from '@public/svg/home/shop/shop-rightarrow.svg';
import Link from 'next/link';
import ShopItem from './shop-item';
import { Heart } from 'lucide-react';
import { Shop } from '@/types/shop-type';
import { ShopProduct } from '@/types/product-type';

type ShopProps = {
  shopOne: Shop;
}

export default function ShopDetail({ shopOne } : ShopProps) {
  return (
    <div className="pl-4 w-full h-auto flex flex-col">
      {/* Store Header */}
      <header className="pr-4 pb-3 w-full flex justify-between items-center">
        <Link href={`/home/shop/description/${shopOne.shopId}`} className="flex gap-[14px]">
          <Image src="/img/shop-tmp.jpg" alt="shop logo" width={40} height={40} />
          <span className="flex justify-between items-center gap-3 text-grey150 text-label1">
            <p>{shopOne.shopname}</p>
            <RightArrow />
          </span>
        </Link>
        <span className="text-red">
          <Heart strokeWidth={1.5}/>
        </span>
      </header>
      {/* Store Item List */}
      <section className="w-full flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide">
        {shopOne.products.map((shopProductItem : ShopProduct, idx) => (
          <ShopItem key={idx} shopProductItem={shopProductItem}/>
        ))}
      </section>
    </div>
  );
}
