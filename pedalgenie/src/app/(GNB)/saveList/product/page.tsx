'use client';

import dataset from '@/data/dataset.json';
import LikeProductItem from '../_components/like-product';
import { useQuery } from '@tanstack/react-query';
import { fetchLikedProductList } from '@/lib/api/(product)/like-product';
import Loading from '@/components/loading';
import { Product } from '@/types/product-type';

export default function SaveListProductPage() {



    const { data: likeProducts, isLoading, isError } = useQuery({
      queryKey: ["likeProducts"], // 캐싱 키
      queryFn: async () => {
        const response = await fetchLikedProductList();
        return response;
      },
      retry: true, // 실패 시 재시도 여부 설정
    });


    return (
      <>
        <main className="w-full grid grid-cols-2 gap-[2px]">
          {likeProducts?.map((likeProductItem : Product, index: number) => (
            <LikeProductItem key={index} likeProduct={likeProductItem} />
          ))}
        </main>
        {isLoading && <Loading />}
      </>
    );
}