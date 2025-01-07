
import dataset from '@/data/dataset.json';
import ShopCard from './shop-card';

type Shop = {
    image: string;
    shop: string;
    info: string;
    like: boolean;
}

export default function SearchedShop() {
    const { tmpShop } = dataset;
    

    return (
        <div className="w-full h-auto flex flex-col">
            <header className="px-4 py-3 w-full flex justify-start items-center gap-1 text-title1">
                <p className="text-grey150">매장</p>
                <p className="text-grey650">3</p>
            </header>
            <section className="px-4 w-full flex gap-3 overflow-x-auto scrollbar-hide">
                {tmpShop.map((shop: Shop, index: number) => (
                    <ShopCard key={index} shop={shop} />
                ))}
            </section>
        
        </div>
    );
}