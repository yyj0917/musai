'use client';

import NotFoundAll from '@/components/not-found-all';
import ProductItem from '../../../_components/product';
import { Product, ProductList } from '@/types/product-type';

type ShopProductSectionProps = {
  shopProduct?: ProductList;
  instrumentCount?: number;
};

export default function ShopProductSection({ shopProduct, instrumentCount }: ShopProductSectionProps) {
  if (!shopProduct || shopProduct?.length <= 0) {
    return (
      <NotFoundAll alertText='매장 상품이 존재하지 않습니다'/>
    );
  }
  return (
    <section
      className="
            w-full h-auto flex flex-col justify-center items-center
            text-head1 text-grey450">
      <div className="px-4 pt-4 pb-1 w-full flex gap-1">
        <span className="text-title1 text-grey150">전체</span>
        <span className="text-title1 text-grey550">{instrumentCount}</span>
      </div>
      <main className="pt-2 w-full grid grid-cols-2 gap-[2px]">
        {shopProduct?.map((shopProductItem: Product, index: number) => (
          <ProductItem
            key={index}
            product={shopProductItem}
            queryKey={['shopDetail', String(shopProductItem.shopId)]}
          />
        ))}
      </main>
    </section>
  );
}
