'use client';

import { fetchProductDetail } from '@/lib/api/(product)/product-detail';
import { useQuery } from '@tanstack/react-query';
import TopBar from './_components/topBar';
import ProductImg from './_components/productImg';
import ShopNameBar from './_components/shopNameBar';
import ProductActionMenus from './_components/ProductActionMenus';
import ProductFeeCard from './_components/productFeeInfo';
import DescriptionImg from './_components/descriptionImg';
import ShopInfo from './_components/shopInfo';
import InfoSwitcher from './_components/infoSwitcher';
import CTA from '@/components/ui/CTA';
import LoginModal from '@/components/modal/login-modal';
import ProductHeart from './_components/ProductHeart';
import Loading from '@/components/loading';

export default function Product({ params }: { params: { id: number } }) {
  const { id } = params; // 파라미터로 받아온 ProductId 값

  const {
    data: productDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['productDetail', id], // 캐싱 키
    queryFn: () => fetchProductDetail(id), // fetchShopDetail 함수 호출
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 상태 유지
  });


  return (
    <>
    <div className="relative w-full h-full bg-grey1000">
      <main className="w-full flex flex-col text-grey250 font-pretendard">
        <TopBar />
        <div className="w-full h-[calc(100vh-50px-87px)] overflow-y-auto scroll-smooth scrollbar-hide">
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
              <ProductHeart isLiked={productDetail?.isLiked} productId={id} queryKey={['productDetail']}/>
            </section>
            <ProductFeeCard price={productDetail?.price} rentPricePerDay={productDetail?.rentPricePerDay} />
            <InfoSwitcher />
          </div>
          <DescriptionImg descriptionImg={productDetail?.descriptionUrl} />
          <ShopInfo
            shopName={productDetail?.shopName}
            shopHours={productDetail?.shopHours}
            contactNumber={productDetail?.contactNumber}
            address={productDetail?.address}
            shopId={productDetail?.shopId}
            isShopLiked={productDetail?.isShopLiked}
            shopImage={productDetail?.shopImage}
          />
        </div>
      </main>
      <CTA
        productId={id}
        isRentable={productDetail?.isRentable}
        isDemoable={productDetail?.isDemoable}
        isLiked={productDetail?.isLiked}
      />
      <LoginModal />
      {isLoading && <Loading />}
    </div>
    </>
  );
}
