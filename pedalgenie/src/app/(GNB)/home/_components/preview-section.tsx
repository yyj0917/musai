'use client';

import PreviewItem from './preview';
import { Product } from '@/types/product-type';

import { mockGenreProductList } from '@/mockdata/genre-product.mock';

type GenreProductProps = {
  genre: string;
};
export default function PreviewSection({ genre }: GenreProductProps) {
  // const {
  //   data: genreProducts,
  //   isLoading,
  //   isError
  // } = useQuery<ProductList, Error> (
  //   {
  //     queryKey: ['genreProduct', genre],
  //     queryFn: () => fetchProductGenre(genre),
  //     enabled: true,
  //   }
  // );
  const genreProducts = mockGenreProductList;

  return (
    <section id="preview-section" className="mt-11 max-h-[300px] pl-4 overflow-auto">
      <div className="pr-4 w-full flex justify-between items-center">
        <p className="text-title1 text-grey250">시연해볼 수 있는 [ {genre} ]</p>
      </div>
      <div className="mt-3 pr-4 w-full h-auto flex gap-[10px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide">
        {genreProducts?.map((productItem: Product, index: number) => (
          <PreviewItem key={index} genreProductItem={productItem} />
        ))}
      </div>
    </section>
  );
}
