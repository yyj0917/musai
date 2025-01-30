'use client';
import { fetchDemoProductList } from '@/lib/api/(product)/demo-product';
import DemoCard from '../_components/demo-card';
import CancelModal from '@/components/modal/cancel-modal';
import { DemoProduct } from '@/types/product-type';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import NotFoundAll from '@/components/not-found-all';

// 시연예정 상태의 대여 상품만 필터링하는 함수
const filterDemoProducts = (products: DemoProduct[]) => {
  return products.filter((product) => product.demoStatus === '시연예정');
};

export default function Demo() {
  // 시연 상품 목록 query caching
  const {
    data: demoProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['demoProducts'], // 캐싱 키
    queryFn: async () => {
      const response = await fetchDemoProductList();
      return response;
    },
    retry: true, // 실패 시 재시도 여부 설정
  });

  // 데이터가 존재하고 로딩중이 아닐 경우 시연 상품 필터링
  const filteredDemoProducts = demoProducts ? filterDemoProducts(demoProducts) : [];


  if (demoProducts?.length === 0) {
    return (
      <div className="w-full h-[calc(100dvh-87px-85px)] my-auto flex justify-center items-center">
        <NotFoundAll alertText="시연 내역이 존재하지 않습니다" />
      </div>
    );
  }
  return (
    <>
      <div className="w-full h-[100dvh-98.5px] flex flex-col overflow-y-auto scrollbar-hide">
        {filteredDemoProducts?.map((demoProduct: DemoProduct, index) => (
          <DemoCard key={index} demoProduct={demoProduct} />
        ))}
      </div>
      {/* Statue에 따라 취소하기 버튼을 띄워주는 Modal */}
      <CancelModal />
      {isLoading && <Loading />}
    </>
  );
}
