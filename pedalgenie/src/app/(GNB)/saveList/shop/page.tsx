import LikeShop from '../_components/like-shop';
import dataset from '@/data/dataset.json';

export default function SaveListShopPage() {
    const { likeShop } = dataset;

    return (
        <main className="w-full flex flex-col">
            {likeShop.map((likeShopItem : LikeShop, index: number) => (
            <LikeShop key={index} likeShop={likeShopItem} />
          ))}
        </main>
        );
}
