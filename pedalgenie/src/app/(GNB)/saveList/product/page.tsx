'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchLikedProductList } from '@/lib/api/like';
import Loading from '@/components/loading';
import { Product } from '@/types/product-type';
import ProductItem from '../../home/_components/product';
import useDelay from '@/hooks/use-delay';
import { useScrollToggle } from '@/hooks/use-scroll';
import FloatingButton from '@/components/floating-button';
import NotFoundAll from '@/components/not-found-all';

export default function SaveListProductPage() {
  const queryKey = ['likeProducts'];

  const {
    data: likeProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey, // 캐싱 키
    queryFn: fetchLikedProductList,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
  const filteredProducts = likeProducts?.filter((product: Product) => product.isLiked);

  const isDelay = useDelay(500);

  useScrollToggle({ containerId: 'likeSection' });

  if (likeProducts?.length === 0) {
    return (
      <div className="w-full h-[calc(100dvh-87px-85px)] my-auto flex justify-center items-center">
        <NotFoundAll alertText="좋아요를 누른 상품이 존재하지 않습니다" />
      </div>
    );
  }
  return (
    <>
      <main className="w-full grid grid-cols-2 gap-[2px]">
        {filteredProducts?.map((likeProductItem: Product, index: number) => (
          <ProductItem key={index} product={likeProductItem} queryKey={queryKey} />
        ))}
      </main>
      {(isLoading || !isDelay) && <Loading />}
    </>
  );
}
