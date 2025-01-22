'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchLikedShopList } from '@/lib/api/like';
import { LikeShop } from '@/types/shop-type';
import Loading from '@/components/loading';
import LikeShopItem from '../_components/like-shop';

export default function SaveListShopPage() {

  const { data: likeShops, isLoading, isError } = useQuery({
    queryKey: ["likeShops"], // 캐싱 키
    queryFn: async () => {
      const response = await fetchLikedShopList();
      return response;
    },
    retry: true, // 실패 시 재시도 여부 설정
  });

  return (
      <>
        <main className="w-full flex flex-col">
          {likeShops?.map((likeShopItem : LikeShop, index: number) => (
          <LikeShopItem key={index} likeShop={likeShopItem} />
        ))}
        </main>
        {isLoading && <Loading />}
      </>
  );
}
