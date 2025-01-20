import { LikeShop } from '@/types/shop-type';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type LikeShopItem = {
    likeShop: LikeShop;
}

export default function LikeShopItem({ likeShop } : LikeShopItem) {
    return (
        <Link
            href={`/home/shop/description/${likeShop?.shopId}`}
            className="px-4 py-5 w-full h-auto flex justify-between items-center">
            <div className="flex items-center gap-[14px]">
                <Image
                    src={likeShop?.thumbnailImageUrl}
                    alt="shopImg"
                    width={40}
                    height={40}/>
                <p className="text-label1 text-white">
                    {likeShop?.shopName}
                </p>
            </div>
            {/* 좋아요 취소하는 로직 추가 해야 함 */}
            <Heart 
                strokeWidth={1.5}
                size={24}
                className={`${
                    likeShop?.isLiked ? 'fill-red' : ''
                }`}/>
        </Link>
    );
}