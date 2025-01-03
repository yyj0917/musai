import Image from 'next/image';
import RightArrow from '@public/svg/home/right-arrow.svg';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

type LikeProductItem = {
    likeProduct: LikeProduct;
}

export default function LikeProductItem({ likeProduct } : LikeProductItem) {
  return (
    <div className="pb-5 w-full flex flex-col">
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={`${likeProduct?.image}`}
          alt={`${likeProduct?.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
          className="object-cover"
        />
        <span className="absolute bottom-4 right-[14px] text-red ">
          <Heart 
            strokeWidth={1.5}
            className={`${
                likeProduct?.like ? 'fill-red' : ''
            }`}/>
        </span>
      </div>
      <div className="px-4 py-3 w-full">
        <div className="w-full flex flex-col gap-1">
          <p className="text-body1 text-grey250 flex items-center gap-3">
            <span>{likeProduct?.shop}</span>
            <RightArrow />
          </p>
          <p className="text-ellipsis text-grey450 text-body1 line-clamp-1">{likeProduct?.name}</p>
          <p className="text-body1 flex item-center gap-1">
            <span className="text-grey550 flex">
              <span>일</span>
              <span>ㅣ</span>
            </span>
            <span className="text-grey250">{likeProduct?.price}</span>
          </p>
          <div className="flex gap-1">
            {likeProduct?.chip.map((chip: string, index: number) => (
              <Button key={index} variant="chip">
                {chip}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
