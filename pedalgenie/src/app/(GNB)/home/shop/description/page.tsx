import SaveHeart from '@public/svg/home/shop/shop-heart.svg';
import Clock from '@public/svg/home/shop/shop-clock.svg';
import Phone from '@public/svg/home/shop/shop-phone.svg';
import Location from '@public/svg/home/shop/shop-location.svg';
import ShopProductSection from './_components/shop-product-section';
// import { Heart } from 'lucide-react';

export default function ShopDescription() {
  return (
    <div className="w-full h-[calc(100vh-50px-87px)] flex flex-col overflow-y-auto scrollbar-hide">
      {/* Shop Banner */}
      <div className="px-4 py-7 w-full min-h-[220px] bg-grey750 flex justify-between items-start">
        <div className="max-w-[250px] flex flex-col gap-1">
          <h1 className="text-grey150 text-head0">서울뮤즈</h1>
          <p className="text-grey250 text-body1">악기점 한줄 소개입니다. 한줄소개는 너비 250px을 넘기지 않습니다.</p>
        </div>
        <span className="text-red">
          <SaveHeart />
          {/* <Heart strokeWidth={1.5}/> */}
        </span>
      </div>
      {/* Shop Operation */}
      <footer className="px-4 py-5 w-full flex flex-col justify-start items-center gap-2 text-body2 text-grey250">
        {/* Operating Hours */}
        <div className="w-full flex justify-start items-start gap-1">
          <span>
            <Clock />
          </span>
          <span className="w-full flex flex-col ">
            <p>평일 9:00 ~ 19:00 (월~일)</p>
            <p>공휴일 정상영업</p>
          </span>
        </div>
        {/* Shop  Contact*/}
        <div className="w-full flex justify-start items-center gap-1">
          <span>
            <Phone />
          </span>
          <span>02-1234-5678</span>
        </div>
        {/* Shop Location */}
        <div className="px-1 w-full flex justify-start items-center gap-2">
          <span>
            <Location />
          </span>
          <span>서울 종로구 삼일대로 428 낙원상가 2층 87호</span>
        </div>
      </footer>

      <div className="w-full border-[0.5px] border-grey750"></div>

      {/* Shop에서 판매하는 모든 상품 진열 section */}
      <ShopProductSection />
    </div>
  );
}
