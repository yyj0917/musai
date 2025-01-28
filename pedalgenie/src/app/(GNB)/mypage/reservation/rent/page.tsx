'use client';

import CancelModal from '@/components/modal/cancel-modal';
import RentCard from '../../_components/rent-card';
import { useQuery } from '@tanstack/react-query';
import { fetchRentProductList } from '@/lib/api/(product)/rent-product';
import { RentProduct } from '@/types/product-type';
import Loading from '@/components/loading';
import NotFoundAll from '@/components/not-found-all';

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

  if (rentProducts?.length === 0) {
    return (
        <div className='my-auto w-full h-[calc(100dvh-98.5px)] flex justify-center items-center'>
            <NotFoundAll alertText='예약 내역이 존재하지 않습니다' />
        </div>
    );
  }
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
