import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ShopCardProps = {
    shop: {
        image: string;
        shop: string;
        info: string;
        like: boolean;
    };
};

export default function ShopCard({ shop } : ShopCardProps) {
  return (
    <Link href="/shop">
        <article className="px-3 py-4 min-w-[316px] w-full flex justify-between items-center gap-3 border-[1px] border-grey650 rounded-[8px]">
        <div className="w-full flex justify-start items-center gap-3">
            <Image src={shop.image} alt="shop" width={44} height={44} className="object-fill rounded-[4px]" />
            <div className="flex flex-col justify-center items-start gap-[2px]">
                <p className="text-label1 text-grey150">{shop.shop}</p>
                <p className="text-caption1 text-grey450">{shop.info}</p>
            </div>
        </div>
        <Heart 
            strokeWidth={1.5} 
            className={`${
                shop.like ? "fill-red" : ""
            } text-red`} />
        </article>
    </Link>
  );

}