'use client';
import dataset from '@/data/dataset.json';
import Image from 'next/image';
import SaveHeart from '@public/svg/home/shop/shop-heart.svg';
import RightArrow from '@public/svg/home/right-arrow.svg';
import { ArticleProductList } from '@/types/product-type';
import { useRouter } from 'next/navigation';
import FloatingButton from '@/components/floating-button';
import { useScrollToggle } from '@/hooks/use-scroll';
import NotFoundAll from '@/components/not-found-all';
import Link from 'next/link';

type ArticleProductProps = {
  articleProducts: ArticleProductList;
}

export default function ArticleProducts({ articleProducts }: ArticleProductProps) {
  const router = useRouter();

  useScrollToggle({ containerId: 'articleSection' });

  return (
    <>
      <section className="pt-3 pb-10 w-full flex flex-col">
        <h3 className="px-4 py-4 text-grey150 text-title1">아티클에 나온 제품</h3>
        {articleProducts.length === 0 ? (
          <div className='h-[200px] flex justify-center items-center'>
            <NotFoundAll alertText='해당 아티클 제품이 존재하지 않습니다' />
          </div>
        ) : (
          <div className="flex flex-col gap-[10px]">
            {articleProducts.map((articleProduct, index) => (
              <Link href={`/product/${articleProduct.id}`} key={index} className="px-4 flex justify-between items-center">
                <div className="flex gap-3">
                  <div className="relative w-[68px] h-[68px]" style={{ aspectRatio: '1/1' }}>
                    <Image src={articleProduct.imageUrl} alt={articleProduct.name} layout="fill" className="rounded-[2px]" />
                  </div>
                  <span className="flex flex-col items-start gap-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/home/shop/description/${articleProduct.shopId}`)
                      }}
                      className="flex items-center gap-3 text-grey250 text-body1 ">
                      <span>{articleProduct.shopName}</span>
                      <RightArrow />
                    </button>
                    <p className="text-grey450 text-body2 overflow-hidden line-clamp-1">{articleProduct.name}</p>
                    <p className="text-grey250 text-body1">{articleProduct.rentPricePerDay}</p>
                  </span>
                </div>
                <span className="text-red">
                  <SaveHeart />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
      <FloatingButton scrollContainer={'articleSection'}/>
    </>
  );
}
