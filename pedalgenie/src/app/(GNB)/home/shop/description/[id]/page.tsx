'use client';

import Clock from '@public/svg/home/shop/shop-clock.svg';
import Phone from '@public/svg/home/shop/shop-phone.svg';
import Location from '@public/svg/home/shop/shop-location.svg';
import ShopProductSection from '../_components/shop-product-section';
import { Heart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button';
import { fetchShopDetail } from '@/lib/api/shop';
import { useQuery } from '@tanstack/react-query';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useState } from 'react';
import Loading from '@/components/loading';
import { useLikeShopMutation } from '@/hooks/useLikeShopMutation';





export default function ShopDescriptionPage({ params }: { params: { id: number } }) {
    const { id } = params;
    const { toast } = useToast();
    const { isLoggedIn } = useLoginStore();
    const { openLoginModal } = useModalStore();
    const [isAnimating, setIsAnimating] = useState(false);

    // React Query를 사용하여 데이터 가져오기
    const { data: shopDetail, isLoading, isError } = useQuery({
        queryKey: ['shopDetail', id], // 캐싱 키
        queryFn: () => fetchShopDetail(id), // fetchShopDetail 함수 호출
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 상태 유지
    });

    const handleCopyToast = (text: string | undefined) => {
        // undefined 예외처리
        if (!text) return;

        navigator.clipboard.writeText(text);
        toast({
        description: '복사가 완료되었습니다.',
        });
    }
    // 좋아요 Mutation
    // - product.isLiked를 보고 "true→취소 / false→등록" 구분
    const likeMutation = useLikeShopMutation(id, ['shopDetail']);

    const toggleLikeShop = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
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
        likeMutation?.mutate(!shopDetail?.isLiked);
    }

    return (
        <div className="w-full h-[calc(100dvh-50px)] flex flex-col overflow-y-auto scrollbar-hide">
            {/* Shop Banner */}
            <div 
                className="px-4 py-7 w-full min-h-[220px] bg-dimmed-image bg-cover bg-center flex justify-between items-start"
                style={{ 
                    background: `linear-gradient(0deg, rgba(26, 26, 26, 0.80) 0%, rgba(26, 26, 26, 0.80) 100%), url(${shopDetail?.shopImageUrl}) center / cover no-repeat`,
                    }}>
                <div className="max-w-[250px] flex flex-col gap-1">
                    <h1 className="text-grey150 text-head0">{shopDetail?.shopname}</h1>
                    <p className="text-grey250 text-body1">{shopDetail?.description}</p>
                </div>
                <button
                    onClick={(e) => toggleLikeShop(e)}
                    className="text-red ">
                    <Heart 
                        strokeWidth={1.5}
                        className={`like-animation ${shopDetail?.isLiked || isAnimating ? 'unscale fill-red' : 'scale'} `} />
                </button>
            </div>
            {/* Shop Operation */}
            <footer className="px-4 py-5 w-full flex flex-col justify-start items-center gap-2 text-body2 text-grey150">
                {/* Operating Hours */}
                <div className={`w-full flex justify-start 
                    ${shopDetail?.shopHours && shopDetail?.shopHours.length > 1 ? 'items-start' : 'items-center'} gap-1`}>
                    <span className='text-grey450'><Clock/></span>
                    <div className={`w-full flex flex-col`}>
                        {shopDetail?.shopHours.map((hour, index) => (
                            <span key={index} className='text-body2 text-grey150'>{hour}</span>
                        ))}
                    </div>
                </div>
                {/* Contact Number */}
                <div className="w-full flex justify-start items-center gap-1">
                    <span className='text-grey450'><Phone/></span>
                    <div className="w-full flex gap-2 items-center">
                        <span className='text-body2 text-grey150'>{shopDetail?.contactNumber}</span>
                        <Button
                            variant='copy' 
                            onClick={() => handleCopyToast(shopDetail?.contactNumber)} 
                            className='text-center text-body2 text-red' >복사</Button>
                    </div>
                </div>
                {/* Address */}
                <div className="px-1 w-full flex justify-start items-center gap-1">
                    <span className='text-grey450 mr-1'><Location/></span>
                    <div className="w-full flex gap-2 items-center">
                        <span className='text-body2 text-grey150'>{shopDetail?.address}</span>
                        <Button
                            variant='copy' 
                            onClick={() => handleCopyToast(shopDetail?.address)} 
                            className='text-center text-body2 text-red' >복사</Button>
                    </div>
                </div>
            </footer>

            <div className="w-full border-[0.5px] border-grey750"></div>

            {/* Shop에서 판매하는 모든 상품 진열 section */}
            <ShopProductSection shopProduct={shopDetail?.products} instrumentCount={shopDetail?.instrumentCount} />
            { isLoading || !shopDetail ? <Loading/> : null }
        </div>
    );
}
