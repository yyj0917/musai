'use client';

import { ArticleProductList } from '@/types/product-type';
import FloatingButton from '@/components/floating-button';
import { useScrollToggle } from '@/hooks/use-scroll';
import NotFoundAll from '@/components/not-found-all';
import ArticleProductItem from './article-product';

type ArticleProductProps = {
  articleProducts: ArticleProductList;
}

export default function ArticleProductSection({ articleProducts }: ArticleProductProps) {

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
              <ArticleProductItem key={index} articleProduct={articleProduct}/>
            ))}
          </div>
        )}
      </section>
      <FloatingButton scrollContainer={'articleSection'}/>
    </>
  );
}
