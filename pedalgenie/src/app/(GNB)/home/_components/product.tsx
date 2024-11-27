import Image from 'next/image';
import SaveHeart from '@public/svg/home/save-heart.svg';
import RightArrow from '@public/svg/home/right-arrow.svg';
import { Button } from '@/components/ui/button';


export default function ProductItem({ product } : any) {
    return (
        <div className="w-full flex flex-col">
            <div className="relative w-full aspect-square overflow-hidden">
                <Image
                    src={'/img/깁슨.jpg'}
                    alt={'깁슨'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
                    className="object-cover"
                />
                <span className='absolute bottom-0 right-0 text-grey750 '>
                  <SaveHeart/>
              </span>
            </div>
            <div className="px-4 py-3 w-full">
                <div className='w-full flex flex-col gap-1'>
                    <p className='text-body1 text-grey250 flex items-center gap-3'>
                        <span>서울낙원악기</span>
                        <RightArrow/>
                    </p>
                    <p className='text-ellipsis text-grey450 text-body1 line-clamp-1'>
                        깁슨 레스폴_Gibson Les Pa
                    </p>
                    <p className='text-body1 flex item-center gap-1'>
                        <span className='text-grey550 flex'>
                            <span>일</span>
                            <span>ㅣ</span>
                        </span>
                        <span className='text-grey250'>32000원</span>
                    </p>
                    <div className='flex gap-1'>
                        <Button variant='chip'>시연</Button>
                        <Button variant='chip'>구매</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
