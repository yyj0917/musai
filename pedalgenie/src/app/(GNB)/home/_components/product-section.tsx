"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductItem from "./product";
import FilterSpan from "./filter-span";

export default function ProductSection({product} : any) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const initialCategory = searchParams.get("category") || "전체"; // URL에서 바로 카테고리 가져오기

    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
    
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


    // selectedCategory 변경 시 URL 업데이트
    useEffect(() => {
        updateQueryParam("category", selectedCategory);
    }, [selectedCategory]); 

    // 초기 로드 시 URL category, nameFilter 쿼리파라미터 초기값 설정
    useEffect(() => {
        const categoryFromURL = searchParams.get("category") || "전체";
        const nameFromURL = searchParams.get("nameFilter") || "최신순";
        setSelectedCategory(categoryFromURL);
    
        // URL에 기본값 설정
        const newParams = new URLSearchParams(searchParams.toString());
        let hasUpdated = false;

        if (!searchParams.has("category")) {
            newParams.set("category", categoryFromURL);
            hasUpdated = true;
        }

        if (!searchParams.has("nameFilter")) {
            newParams.set("nameFilter", nameFromURL);
            hasUpdated = true;
        }

        // URL을 한 번만 업데이트
        if (hasUpdated) {
            router.replace(`?${newParams.toString()}`);
        }
    }, []); 
    

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
                <FilterSpan/>
                
                <main className="w-full grid grid-cols-2 gap-[2px]">
                    {product.map((product: any, index: number) => (
                        <ProductItem key={index} product={product}/>
                        // <section key={index} className="w-full flex gap-[2px]">
                        //     <ProductItem/>
                        // </section>
                    ))}
                    
                </main>
            </div>
        </section>
    )
}