import dataset from '@/data/dataset.json';
import ProductItem from '../../_components/product';
import { Product, ProductList } from '@/types/product-type';

type SearchedProductProps = {
  searchedProducts: ProductList;
}

export default function SearchedProduct({ searchedProducts }: SearchedProductProps) {

  return (
    <div className="w-full h-auto flex flex-col">
      <header className="px-4 pt-5 pb-4 w-full flex justify-start items-center gap-1 text-title1">
        <p className="text-grey150">제품</p>
        <p className="text-grey650">{searchedProducts.length}</p>
      </header>
      <main className="pt-2 w-full grid grid-cols-2 gap-[2px]">
        {searchedProducts.map((searchedProduct: Product, index: number) => (
          // 나중에 데이터 들어오면 바꿔야 할 것. 
          <ProductItem key={index} product={searchedProduct} />
        ))}
      </main>
    </div>
  );
}