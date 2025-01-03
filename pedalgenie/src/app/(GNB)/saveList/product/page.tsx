import dataset from '@/data/dataset.json';
import LikeProductItem from '../_components/like-product';

export default function SaveListProductPage() {

    // product를 불러오는데 좋아요가 된 product만 불러옴

    const { likeProduct } = dataset;

    return (
        <main className="w-full grid grid-cols-2 gap-[2px]">
          {likeProduct.map((likeProductItem : LikeProduct, index: number) => (
            <LikeProductItem key={index} likeProduct={likeProductItem} />
          ))}
        </main>
    );
}