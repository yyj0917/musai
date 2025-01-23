'use client';

import { fetchProductDetail } from '@/lib/api/(product)/product-detail';
import { useQuery } from '@tanstack/react-query';
import TopBar from './_components/topBar';
import ProductImg from './_components/productImg';
import ShopNameBar from './_components/shopNameBar';
import ProductActionMenus from './_components/ProductActionMenus';
import ProductFeeCard from './_components/productFeeInfo';
import ProductInfo from './_components/productInfo';
import ShopInfo from './_components/shopInfo';
import InfoSwitcher from './_components/infoSwitcher';
// 하트 버튼 컴포넌트로 따로 뺴기
import Heart from '@public/svg/product/heart.svg';

export default function Product({ params }: { params: { id: number } }) {
  const { id } = params; // 파라미터로 받아온 ProductId 값

  const { data: productDetail, isLoading, isError } = useQuery({
    queryKey: ['productDetail', id], // 캐싱 키
    queryFn: () => fetchProductDetail(id), // fetchShopDetail 함수 호출
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 상태 유지
  });

  return (
    <div className="w-full flex flex-col text-grey250 font-pretendard">
      <TopBar />
      <div className="w-full h-[calc(100vh-48px-87px)] overflow-y-auto scroll-smooth scrollbar-hide pb-10">
        <ProductImg productImg={productDetail?.productImage} />
        <ShopNameBar shopName={productDetail?.shopName} shopId={productDetail?.shopId} />
        <div className="px-4 pb-0 py-[14px]">
          <ProductActionMenus
            isRentable={productDetail?.isRentable}
            isPurchasable={productDetail?.isPurchasable}
            isDemoable={productDetail?.isDemoable}
          />
          <section className="flex space-x-[9px]">
            <div className="flex w-full font-semibold text-lg pb-5 max-w-[310px] break-words">
              {productDetail?.name}
            </div>
            <Heart />
          </section>
          <ProductFeeCard price={productDetail?.price} rentPricePerDay={productDetail?.rentPricePerDay} />
          <InfoSwitcher />
        </div>
        <ProductInfo descriptionImg={productDetail?.descriptionUrl} />
        <ShopInfo
          shopName={productDetail?.shopName}
          shopHours={productDetail?.shopHours}
          contactNumber={productDetail?.contactNumber}
          address={productDetail?.address}
        />
      </div>
    </div>
  );
}
