import { Button } from '@/components/ui/button';
import SaveHeart from '@public/svg/home/save-heart.svg';
import Image from 'next/image';
import RightArrow from '@public/svg/home/right-arrow.svg';

type ProductItemProps = {
  product: Product;
};

export default function Preview({ product }: ProductItemProps) {
  // if (!item) {
  //     // Skeleton Code
  //     return (
  //       <ItemSkeleton/>
  //     );
  //   }

  return (
    <div className="relative min-w-[138px] h-[252px] flex flex-col gap-3">
      <div className="relative w-full min-h-[138px] bg-grey750 rounded-sm">
        <Image
          src={`${product?.image}`}
          alt={`${product?.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
          className="object-fit"
        />
        <span className="absolute text-red ">
          <SaveHeart />
        </span>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-1">
          <p className="text-body1 text-grey250 flex items-center gap-3">
            <span>{product?.shop}</span>
            <RightArrow />
          </p>
          <p className="text-ellipsis text-grey450 text-body1 line-clamp-1">{product?.name}</p>
          <p className="text-body1 flex item-center gap-1">
            <span className="text-grey250">{product?.price}원</span>
          </p>
          <div className="flex gap-1">
            {product?.chip.map((chip, index) => (
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
