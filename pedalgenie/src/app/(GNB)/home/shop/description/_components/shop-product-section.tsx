'use client';

import { useState } from 'react';
import ProductItem from '../../../_components/product';
import dataset from '@/data/dataset.json';
import { Product, ProductList } from '@/types/product-type';

// 여기 수정해야 함 Product image data name 통일해야 해서.

type ShopProductSectionProps = {
  shopProduct: ProductList;
  instrumentCount: number;
};

export default function ShopProductSection({ shopProduct, instrumentCount} : ShopProductSectionProps) {
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
        {shopProduct.map((shopProductItem: Product, index: number) => (
          <ProductItem key={index} product={shopProductItem} />
        ))}
      </main>
    </section>
  );
}
