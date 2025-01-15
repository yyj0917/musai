'use client';

import { Suspense } from 'react';
import PreviewItem from './preview';
import { useQuery } from '@tanstack/react-query';
import { ProductList } from '@/types/product-type';
import { fetchProductGenre } from '@/lib/api/(product)/genre-product';

export default function PreviewSection({ product }: ProductProps) {

  // const {
  //   data: genreProducts,
  //   isLoading,
  //   isError
  // } = useQuery<ProductList, Error> (
  //   {
  //     queryKey: ['productGenre', product],
  //     queryFn: () => fetchProductGenre('guitar'),
  //     initialData: product
  //   }
  // )

  return (
    <section id='preview-section' className="mt-11 pl-4 overflow-auto">
      <div className="pr-4 w-full flex justify-between items-center">
        <p className="text-title1 text-grey250">시연해볼 수 있는 [ 실리카겔 ]</p>
      </div>
      <div className="mt-3 w-full h-[300px] flex gap-[10px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide">
        {product.map((productItem: Product, index: number) => (
          <PreviewItem key={index} product={productItem} />
        ))}
        {/* <Suspense fallback={<Preview />}>
        </Suspense> */}
      </div>
    </section>
  );
}
