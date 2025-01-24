'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchLikedShopList } from '@/lib/api/like';
import { LikeShop } from '@/types/shop-type';
import Loading from '@/components/loading';
import LikeShopItem from '../_components/like-shop';
import useDelay from '@/hooks/use-delay';
import { useScrollToggle } from '@/hooks/use-scroll';

export default function SaveListShopPage() {
  const {
    data: likeShops,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['likeShops'], // 캐싱 키
    queryFn: fetchLikedShopList,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
  const isDelay = useDelay(500);

  useScrollToggle({ containerId: 'likeSection' });

  return (
    <>
      <main className="w-full flex flex-col">
        {likeShops?.map((likeShopItem: LikeShop, index: number) => (
          <LikeShopItem key={index} likeShop={likeShopItem} />
        ))}
      </main>
      {(isLoading || !isDelay) && <Loading />}
    </>
  );
}
