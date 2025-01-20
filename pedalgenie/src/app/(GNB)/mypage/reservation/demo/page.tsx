'use client'
import { fetchDemoProductList } from "@/lib/api/(product)/demo-product";
import DemoCard from "../../_components/demo-card";
import CancelModal from "@/components/modal/cancel-modal";
import { DemoProduct } from "@/types/product-type";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";


export default function Demo() {

    // 시연 상품 목록 query caching
    const { data: demoProducts, isLoading, isError } = useQuery({
        queryKey: ["demoProducts"], // 캐싱 키
        queryFn: async () => {
          const response = await fetchDemoProductList();
          return response;
        },
        retry: true, // 실패 시 재시도 여부 설정
      });
    

    return (
        <>
            <div className="w-full h-[100dvh-98.5px] flex flex-col overflow-y-auto scrollbar-hide">
                {demoProducts?.map((demoProduct: DemoProduct, index) => (
                    <DemoCard key={index} demoProduct={demoProduct} />
                ))}
            </div>
            {/* Statue에 따라 취소하기 버튼을 띄워주는 Modal */}
            <CancelModal/>
            {isLoading && <Loading/>}
        </>

    )
}