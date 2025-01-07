import Image from 'next/image';

export default function ShopItem() {
  return (
    <div className="min-w-[140px] h-[195px] flex flex-col gap-3">
      <Image src="/img/shopimg-tmp.jpg" alt="shop logo" width={140} height={140} />
      <span className="w-full flex flex-col">
        <p className="text-ellipsis text-body2 text-grey450 line-clamp-1">깁슨 레스폴_Gibson Les Paul Studio</p>
        <p className="text-ellipsis text-body1 text-grey150">3,200,000원</p>
      </span>
    </div>
  );
}
