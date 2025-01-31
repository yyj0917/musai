'use client';

import { fetchShopList } from '@/lib/api/shop';
import { useQuery } from '@tanstack/react-query';
import ShopDetail from './shop-detail';
import { Shop } from '@/types/shop-type';
import useDelay from '@/hooks/use-delay';
import Loading from '@/components/loading';
import FloatingButton from '@/components/floating-button';
import { useScrollToggle } from '@/hooks/use-scroll';
import NotFoundAll from '@/components/not-found-all';

export default function ShopSection() {
  const { data: shopList, isLoading } = useQuery({
    queryKey: ['shopList'],
    queryFn: fetchShopList,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: true,
  });
  // 로딩 상태를 0.5초 이상 유지하기 위한 hook
  const isDelay = useDelay(500);

  useScrollToggle({ containerId: 'shopList' });

  if (!shopList && isDelay) return <NotFoundAll alertText='매장이 존재하지 않습니다'/>;

  // 🔹 상품이 있는 shop을 먼저 오도록 정렬
  const sortedShopList = [...(shopList || [])].sort((a: Shop, b: Shop) => {
    const hasProductsA = a.products?.length > 0 ? 1 : 0;
    const hasProductsB = b.products?.length > 0 ? 1 : 0;
    return hasProductsB - hasProductsA; // 상품이 있는 shop이 앞에 오도록 정렬
  });

  return (
    <>
      {sortedShopList?.map((shop: Shop) => <ShopDetail key={shop.shopId} shopOne={shop} />)}
      {!isDelay || (isLoading && <Loading />)}
      <FloatingButton scrollContainer={'shopList'} />
    </>
  );
}
