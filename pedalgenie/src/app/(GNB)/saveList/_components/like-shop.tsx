import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type LikeShopItem = {
    likeShop: LikeShop;
}

export default function LikeShop({ likeShop } : LikeShopItem) {
    return (
        <Link
            href=""
            className="px-4 py-5 w-full h-auto flex justify-between items-center">
            <div className="flex items-center gap-[14px]">
                <Image
                    src={likeShop?.image}
                    alt="shopImg"
                    width={40}
                    height={40}/>
                <p className="text-label1 text-white">
                    {likeShop?.shop}
                </p>
            </div>
            <Heart 
                strokeWidth={1.5}
                size={24}
                className={`${
                    likeShop?.like ? 'fill-red' : ''
                }`}/>
        </Link>
    );
}