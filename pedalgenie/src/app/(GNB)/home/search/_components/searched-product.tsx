import { Suspense } from 'react';
import FilterSpan from '../../_components/(filter)/filter-span';
import dataset from '@/data/dataset.json';
import ProductItem from '../../_components/product';


export default function SearchedProduct() {
  const { effector } = dataset;

  return (
    <div className="w-full h-auto flex flex-col">
      <header className="px-4 pt-5 pb-4 w-full flex justify-start items-center gap-1 text-title1">
        <p className="text-grey150">제품</p>
        <p className="text-grey650">568</p>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <FilterSpan />
      </Suspense>
      <main className="pt-2 w-full grid grid-cols-2 gap-[2px]">
        {effector.map((effector: Effector, index: number) => (
          <ProductItem key={index} effector={effector} />
        ))}
      </main>
    </div>
  );
}