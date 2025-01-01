"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NameFilter, useFilterStore } from "@/lib/zustand/useFilterStore";
import ProductItem from "./product";
import FilterModal from "./filter-modal";
import FilterSpan from "./filter-span";

export default function ProductSection({product} : any) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const initialCategory = searchParams.get("category") || "전체"; // URL에서 바로 카테고리 가져오기


    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterType, setFilterType] = useState<'name' | 'condition' | 'detail'>('name');


    const handleOpenModal = (type: 'name' | 'condition' | 'detail') => {
        setFilterType(type);
        setIsModalOpen(true);
    };
    const updateQueryParam = (key: string, value: string | string[] | null) => {
        const newParams = new URLSearchParams(searchParams.toString())
    
        if (!value || (Array.isArray(value) && value.length === 0)) {
          // 값이 없으면 쿼리 파라미터 삭제
          newParams.delete(key)
        } else {
          // 값이 있으면 쿼리 파라미터 추가
          const valueString = Array.isArray(value) ? value.join(",") : value
          newParams.set(key, valueString)
        }
    
        // URL 업데이트
        router.replace(`?${newParams.toString()}`)
      }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        // 초기 로드: URL에서 category 쿼리 파라미터를 읽어 selectedCategory 초기화
        const categoryFromURL = searchParams.get("category") || "전체";
        setSelectedCategory(categoryFromURL);
    
        // URL에 기본값 설정 (category가 없을 경우)
        if (!searchParams.has("category")) {
            updateQueryParam("category", categoryFromURL);
        }
    }, []); // 의존성 배열을 빈 배열로 설정 (한 번만 실행)
    
    useEffect(() => {
        // selectedCategory가 변경될 때 URL 업데이트
        updateQueryParam("category", selectedCategory);
    }, [selectedCategory]); // selectedCategory 변경 시 실행

    const category =['전체', '기타', '베이스', '키보드', '드럼', '현악기'];

    const handleCategoryPick = (targetId : any, item : any) => {
        setSelectedCategory(item);
        const targetSection = document.getElementById(targetId);
        const mainContainer = document.getElementById("main");
        if (targetSection && mainContainer) {
            const scrollPosition = targetSection.offsetTop;
            mainContainer.scrollTo({ top: scrollPosition-100, behavior: "smooth" });
        }
        
    };
    return (
        <section className="mt-11">
            <div id='product-section' className="w-full flex flex-col">
                <nav className="px-4 w-full flex justify-between items-center">
                    {category.map((item, index) => (
                        <Button 
                            key={index}
                            variant="primary"
                            className={`${
                                selectedCategory === item ? "bg-red text-grey150 !text-body1" : ""
                            }`}
                            onClick={() => handleCategoryPick("product-section", item)}
                        >{item}</Button>
                    ))}
                </nav>
                {/* filter span */}
                <FilterSpan handleOpenModal={handleOpenModal}/>
                
                <main className="w-full grid grid-cols-2 gap-[2px]">
                    {product.map((product: any, index: number) => (
                        <ProductItem key={index} product={product}/>
                        // <section key={index} className="w-full flex gap-[2px]">
                        //     <ProductItem/>
                        // </section>
                    ))}
                    
                </main>
                <FilterModal isOpen={isModalOpen} onClose={handleCloseModal} filterType={filterType} />
            </div>
        </section>
    )
}