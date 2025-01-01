import Image from 'next/image';
import SaveHeart from '@public/svg/home/save-heart.svg';
import RightArrow from '@public/svg/home/right-arrow.svg';
import { Button } from '@/components/ui/button';


export default function ProductItem({ product } : any) {
    return (
        <div className="w-full flex flex-col">
            <div className="relative w-full aspect-square overflow-hidden">
                <Image
                    src={`${product?.image}`}
                    alt={`${product?.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
                    className="object-cover"
                />
                <span className='absolute bottom-0 right-0 text-red '>
                  <SaveHeart/>
              </span>
            </div>
            <div className="px-4 py-3 w-full">
                <div className='w-full flex flex-col gap-1'>
                    <p className='text-body1 text-grey250 flex items-center gap-3'>
                        <span>{product?.shop}</span>
                        <RightArrow/>
                    </p>
                    <p className='text-ellipsis text-grey450 text-body1 line-clamp-1'>
                        {product?.name}
                    </p>
                    <p className='text-body1 flex item-center gap-1'>
                        <span className='text-grey550 flex'>
                            <span>일</span>
                            <span>ㅣ</span>
                        </span>
                        <span className='text-grey250'>32000원</span>
                    </p>
                    <div className='flex gap-1'>
                        {product?.chip.map((chip : any, index : any) => (
                                <Button key={index} variant='chip'>{chip}</Button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
