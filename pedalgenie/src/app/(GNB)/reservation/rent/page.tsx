'use client';

import CancelModal from '@/components/modal/cancel-modal';
import RentCard from '../_components/rent-card';
import { useQuery } from '@tanstack/react-query';
import { fetchRentProductList } from '@/lib/api/(product)/rent-product';
import { RentProduct } from '@/types/product-type';
import Loading from '@/components/loading';
import NotFoundAll from '@/components/not-found-all';

// 픽업예정, 사용중 상태의 대여 상품만 필터링하는 함수
const filterRentProducts = (products: RentProduct[]) => {
  return products.filter((product) => product.rentStatus === '픽업예정' || product.rentStatus === '사용중');
};

export default function Rent() {
  // 시연 상품 목록 query caching
  const {
    data: rentProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['rentProducts'], // 캐싱 키
    queryFn: async () => {
      const response = await fetchRentProductList();
      return response;
    },
    retry: true, // 실패 시 재시도 여부 설정
  });

  // 데이터가 존재하고 로딩중이 아닐 경우 대여 상품 필터링
  const filteredRentProducts = rentProducts ? filterRentProducts(rentProducts) : [];

  if (rentProducts?.length === 0) {
    return (
      <div className="w-full h-[calc(100dvh-87px-85px)] my-auto flex justify-center items-center">
        <NotFoundAll alertText="대여 내역이 존재하지 않습니다" />
      </div>
    );
  }
  return (
    <>
      <div className="w-full h-[100dvh-98.5px] flex flex-col overflow-y-auto scrollbar-hide">
        {filteredRentProducts?.map((rentProduct: RentProduct, index) => (
          <RentCard key={index} rentProduct={rentProduct} />
        ))}
      </div>
      <CancelModal />
      {isLoading && <Loading />}
    </>
  );
}
