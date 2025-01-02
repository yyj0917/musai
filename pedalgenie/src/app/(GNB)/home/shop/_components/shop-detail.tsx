import Image from 'next/image';
import SaveHeart from '@public/svg/home/shop/shop-heart.svg';
import RightArrow from '@public/svg/home/shop/shop-rightarrow.svg';
import Link from 'next/link';
import ShopItem from './shop-item';

export default function ShopDetail() {
  const shopItems = [
    { id: 1, name: 'Item 1', image: '/img/storeimg-item1.jpg', description: '상품 설명 1' },
    { id: 2, name: 'Item 2', image: '/img/storeimg-item2.jpg', description: '상품 설명 2' },
    { id: 3, name: 'Item 3', image: '/img/storeimg-item3.jpg', description: '상품 설명 3' },
    { id: 4, name: 'Item 4', image: '/img/storeimg-item4.jpg', description: '상품 설명 4' },
    { id: 5, name: 'Item 5', image: '/img/storeimg-item5.jpg', description: '상품 설명 5' },
  ];
  return (
    <div className="pl-4 w-full h-auto flex flex-col gap-3">
      {/* Store Header */}
      <header className="pr-4 pb-3 w-full flex justify-between items-center">
        <Link href={'/home/shop/description'} className="flex gap-[14px]">
          <Image src="/img/shop-tmp.jpg" alt="shop logo" width={40} height={40} />
          <span className="flex justify-between items-center gap-3 text-grey150 text-label1">
            <p>서울뮤즈</p>
            <RightArrow />
          </span>
        </Link>
        <span className="text-red">
          <SaveHeart />
        </span>
      </header>
      {/* Store Item List */}
      <section className="w-full flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide">
        {shopItems.map((item) => (
          <ShopItem key={item.id} />
        ))}
      </section>
    </div>
  );
}
