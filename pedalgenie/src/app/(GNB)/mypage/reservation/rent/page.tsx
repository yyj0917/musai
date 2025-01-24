'use client';

import CancelModal from '@/components/modal/cancel-modal';
import RentCard from '../../_components/rent-card';
import { useQuery } from '@tanstack/react-query';
import { fetchRentProductList } from '@/lib/api/(product)/rent-product';
import { RentProduct } from '@/types/product-type';
import Loading from '@/components/loading';

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
  return (
    <>
      <div className="w-full h-[100dvh-98.5px] flex flex-col overflow-y-auto scrollbar-hide">
        {rentProducts?.map((rentProduct: RentProduct, index) => <RentCard key={index} rentProduct={rentProduct} />)}
      </div>
      <CancelModal />
      {isLoading && <Loading />}
    </>
  );
}
