import { fetchShopList } from '@/lib/api/shop';
import ShopDetail from './_components/shop-detail';
import ShopSection from './_components/shop-section';

export default async function Shop() {

  return (
    <div
      id="shopList"
      className="py-5 w-full h-[calc(100dvh-88.5px-87px)] flex flex-col gap-6 overflow-y-auto scrollbar-hide">
      <ShopSection />
    </div>
  );
}
