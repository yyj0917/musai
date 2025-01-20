'use client';

import Clock from '@public/svg/home/shop/shop-clock.svg';
import Phone from '@public/svg/home/shop/shop-phone.svg';
import Location from '@public/svg/home/shop/shop-location.svg';
import ShopProductSection from '../_components/shop-product-section';
import { Heart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button';
import { fetchShopDetail } from '@/lib/api/shop';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'basic-loading';
import Loading from '@/components/loading';





export default function ShopDescriptionPage({ params }: { params: { id: number } }) {
    const { id } = params;
    const { toast } = useToast();

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
    const shopInfo = [
        {
          icon: <Clock />,
          text: "평일 9:00 ~ 19:00 (월~일) \n공휴일 정상영업",
          isMultiline: true, // 여러 줄 텍스트 여부
        },
        {
          icon: <Phone />,
          text: shopDetail?.contactNumber,
          isMultiline: false,
        },
        {
          icon: <Location />,
          text: shopDetail?.address,
          isMultiline: false,
        },
      ];
    if (isLoading || !shopDetail) {
      return <Loading/>
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
              <span className="text-red">
              <Heart strokeWidth={1.5}/>
              </span>
          </div>
          {/* Shop Operation */}
          <footer className="px-4 py-5 w-full flex flex-col justify-start items-center gap-2 text-body2 text-grey150">
              {/* Operating Hours */}
              {shopInfo.map((info, index) => (
              <div
                  key={index}
                  className={`w-full flex justify-start items-start gap-1 ${
                  index === shopInfo.length - 1 ? "px-1" : ""
                  }`}
              >
                  <span className='text-grey450'>{info.icon}</span>
                  <div
                  className={`w-full ${info.isMultiline ? "flex flex-col" : "flex gap-2 items-start"}`}
                  >
                  {info.text && info.isMultiline ? (
                      <span className="whitespace-pre-line">{info.text}</span>
                  ) : (
                      <span>{info.text}</span>
                  )}
                  {index > 0 && 
                      <Button
                      variant='copy' 
                      onClick={() => handleCopyToast(info?.text)} 
                      className='text-body2 text-red' >복사</Button>
                      }
                  </div>
                  
              </div>
          ))}
          </footer>

          <div className="w-full border-[0.5px] border-grey750"></div>

          {/* Shop에서 판매하는 모든 상품 진열 section */}
          <ShopProductSection shopProduct={shopDetail.products} instrumentCount={shopDetail.instrumentCount} />
        </div>
    );
}
