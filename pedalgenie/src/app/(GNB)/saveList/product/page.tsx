'use client';

import dataset from '@/data/dataset.json';
import LikeProductItem from '../_components/like-product';
import { useQuery } from '@tanstack/react-query';
import { fetchLikedProductList } from '@/lib/api/like';
import Loading from '@/components/loading';
import { Product } from '@/types/product-type';
import ProductItem from '../../home/_components/product';

export default function SaveListProductPage() {

    const queryKey = ['likeProducts'];

    const { data: likeProducts, isLoading, isError } = useQuery({
      queryKey, // 캐싱 키
      queryFn: async () => {
        const response = await fetchLikedProductList();
        return response;
      },
      retry: true, // 실패 시 재시도 여부 설정
    });
    const filteredProducts = likeProducts?.filter((product: Product) => product.isLiked);

    return (
      <>
        <main className="w-full grid grid-cols-2 gap-[2px]">
          {filteredProducts?.map((likeProductItem : Product, index: number) => (
            <ProductItem key={index} product={likeProductItem} queryKey={queryKey}/>
          ))}
        </main>
        {isLoading && <Loading />}
      </>
    );
}