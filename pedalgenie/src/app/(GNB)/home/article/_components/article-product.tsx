import { ArticleProduct } from '@/types/product-type';
import Link from 'next/link';
import Image from 'next/image';
import RightArrow from '@public/svg/home/right-arrow.svg';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useLikeProductMutation } from '@/hooks/useLikeProductMutation';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useState } from 'react';

type ArticleProductItemProps = {
    articleProduct: ArticleProduct;
    };
export default function ArticleProductItem({ articleProduct }: ArticleProductItemProps) {
    
    const router = useRouter();
    const { isLoggedIn } = useLoginStore();
    const { openLoginModal } = useModalStore();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isUILike, setIsUILike] = useState(false);

    const likeMutation = useLikeProductMutation(articleProduct.id, ['articleDetail']);

    const toggleLikeProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsUILike(!isUILike);
        // 로그인 체크
        if (!isLoggedIn) {
          openLoginModal();
          return;
        }
        // 1) 하트 애니메이션 실행
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 500); // 0.5초 애니메이션
    
        // 2) 서버에 좋아요 or 취소 요청 (Optimistic Update)
        likeMutation?.mutate(!articleProduct.isLiked);
      };

    return (
        <Link href={`/product/${articleProduct.id}`} className="px-4 flex justify-between items-center">
                <div className="flex gap-3">
                  <div className="relative w-[68px] h-[68px]" style={{ aspectRatio: '1/1' }}>
                    <Image 
                        src={articleProduct.imageUrl} 
                        alt={articleProduct.name} 
                        layout="fill" 
                        className="rounded-[2px]" />
                  </div>
                  <span className="flex flex-col items-start gap-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/home/shop/description/${articleProduct.shopId}`);
                      }}
                      className="flex items-center gap-3 text-grey250 text-body1 ">
                      <span>{articleProduct.shopName}</span>
                      <RightArrow />
                    </button>
                    <p className="text-grey450 text-body2 overflow-hidden line-clamp-1">{articleProduct.name}</p>
                    <p className="text-grey250 text-body1">{new Intl.NumberFormat('ko-KR').format(articleProduct.rentPricePerDay)}원</p>
                  </span>
                </div>
                <button onClick={(e) => toggleLikeProduct(e)} className="text-red ">
                    <Heart
                    strokeWidth={1.5}
                    className={`like-animation ${articleProduct?.isLiked || isAnimating || isUILike ? 'unscale fill-red' : ''} `}
                    />
                </button>
              </Link>
    );
}