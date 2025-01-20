
import dataset from '@/data/dataset.json';
import ShopCard from './shop-card';
import { SearchShop } from '@/types/search-type';

type SearchedShopProps = {
    searchedShops : SearchShop[];
}

export default function SearchedShop({ searchedShops } : SearchedShopProps) {    

    return (
        <div className="w-full h-auto flex flex-col">
            <header className="px-4 py-3 w-full flex justify-start items-center gap-1 text-title1">
                <p className="text-grey150">매장</p>
                <p className="text-grey650">{searchedShops.length}</p>
            </header>
            <section className="px-4 w-full flex gap-3 overflow-x-auto scrollbar-hide">
                {searchedShops.map((shop: SearchShop, index: number) => (
                    <ShopCard key={index} shop={shop} />
                ))}
            </section>
        
        </div>
    );
}