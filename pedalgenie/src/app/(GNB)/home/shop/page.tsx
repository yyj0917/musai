import { fetchShopList } from '@/lib/api/shop';
import ShopDetail from './_components/shop-detail';
import ShopSection from './_components/shop-section';

export default async function Shop() {

  // 로딩 어떻게 넣을지 고민 -> 컴포넌트 하나 더 파서 Suspense로 할지,,,

  // 매장 목록 조회 - shop[]

  return (
    <div id='shopList' className="py-5 w-full h-[calc(100dvh-88.5px-87px)] flex flex-col gap-6 overflow-y-auto scrollbar-hide">
      <ShopSection/>
    </div>
  );
}
