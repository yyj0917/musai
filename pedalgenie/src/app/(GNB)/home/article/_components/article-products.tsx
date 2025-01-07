import dataset from '@/data/dataset.json';
import Image from 'next/image';
import SaveHeart from '@public/svg/home/shop/shop-heart.svg';
import RightArrow from '@public/svg/home/right-arrow.svg';

export default function ArticleProducts() {
  const { product } = dataset;

  const handleRouteShop = () => {
    // Shop 페이지로 이동
  };
  return (
    <section className="pt-3 pb-10 w-full flex flex-col">
      <h3 className="px-4 py-4 text-grey150 text-body1">아티클에 나온 제품</h3>
      <div className="flex flex-col gap-[10px]">
        {product.map((product, index) => (
          <div key={index} className="px-4 flex justify-between items-center">
            <div className="flex gap-3">
              <Image src={product.image} alt={product.name} width={68} height={68} className="rounded-[2px]" />
              <span className="flex flex-col items-start gap-1">
                <p className="flex items-center gap-3 text-grey250 text-body1 ">
                  <span>{product.shop}</span>
                  <span onClick={handleRouteShop}>
                    <RightArrow />
                  </span>
                </p>
                <p className="text-grey450 text- overflow-hidden line-clamp-1">{product.name}</p>
                <p className="text-grey250 text-body1">{product.price}</p>
              </span>
            </div>
            <span className="text-red">
              <SaveHeart />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
