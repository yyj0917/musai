'use client';

import Clock from '@public/svg/home/shop/shop-clock.svg';
import Phone from '@public/svg/home/shop/shop-phone.svg';
import Location from '@public/svg/home/shop/shop-location.svg';
import ShopProductSection from './_components/shop-product-section';
import { Heart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button';
import { fetchShopDetail } from '@/lib/api/shop';


const shopInfo = [
  {
    icon: <Clock />,
    text: "평일 9:00 ~ 19:00 (월~일) \n공휴일 정상영업",
    isMultiline: true, // 여러 줄 텍스트 여부
  },
  {
    icon: <Phone />,
    text: "02-1234-5678",
    isMultiline: false,
  },
  {
    icon: <Location />,
    text: "서울 종로구 삼일대로 428 낙원상가 2층 87호",
    isMultiline: false,
  },
];


export default async function ShopDescription() {
  const { toast } = useToast();

  const shopDetail = await fetchShopDetail(1);

  const handleCopyToast = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: '복사가 완료되었습니다.',
    });
  }
  return (
    <div className="w-full h-[calc(100dvh-50px)] flex flex-col overflow-y-auto scrollbar-hide">
      {/* Shop Banner */}
      <div className="px-4 py-7 w-full min-h-[220px] bg-grey750 flex justify-between items-start">
        <div className="max-w-[250px] flex flex-col gap-1">
          <h1 className="text-grey150 text-head0">서울뮤즈</h1>
          <p className="text-grey250 text-body1">악기점 한줄 소개입니다. 한줄소개는 너비 250px을 넘기지 않습니다.</p>
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
              className={`w-full ${info.isMultiline ? "flex flex-col" : "flex gap-2 items-center"}`}
            >
              {info.text && info.isMultiline ? (
                <span className="whitespace-pre-line">{info.text}</span>
              ) : (
                <span>{info.text}</span>
              )}
              {index > 0 && 
                <Button
                  variant='copy' 
                  onClick={() => handleCopyToast(info.text)} 
                  className='text-body2 text-red' >복사</Button>
                }
            </div>
            
        </div>
      ))}
      </footer>

      <div className="w-full border-[0.5px] border-grey750"></div>

      {/* Shop에서 판매하는 모든 상품 진열 section */}
      <ShopProductSection />
    </div>
  );
}
