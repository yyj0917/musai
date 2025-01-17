import { fetchShopList } from '@/lib/api/shop';
import ShopDetail from './_components/shop-detail';

export default async function Shop() {

  // 매장 목록 조회 - shop[]
  const shopList = await fetchShopList();

  return (
    <div className="py-5 w-full h-[calc(100dvh-88.5px-87px)] flex flex-col gap-6 overflow-y-auto scrollbar-hide">
      {shopList.map((shop) => (
        <ShopDetail key={shop.shopId} shopOne={shop} />
      ))}
    </div>
  );
}
