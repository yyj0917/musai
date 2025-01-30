'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchLikedShopList } from '@/lib/api/like';
import { LikeShop } from '@/types/shop-type';
import Loading from '@/components/loading';
import LikeShopItem from '../_components/like-shop';
import useDelay from '@/hooks/use-delay';
import { useScrollToggle } from '@/hooks/use-scroll';
import NotFoundAll from '@/components/not-found-all';

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

  if (likeShops?.length === 0) {
    return (
      <div className="w-full h-[calc(100dvh-87px-85px)] my-auto flex justify-center items-center">
        <NotFoundAll alertText="좋아요를 누른 매장이 존재하지 않습니다" />
      </div>
    );
  }
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
