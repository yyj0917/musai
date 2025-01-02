"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation"

import { useEffect, useState } from "react";

import FilterModal from "./filter-modal";

import DownArrow from '@public/svg/home/down-arrow.svg';
import Initiate from '@public/svg/home/initiate.svg';

export default function FilterSpan() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [showResetButton, setShowResetButton] = useState(false); // 새로고침 버튼 상태 관리

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterType, setFilterType] = useState<'name' | 'condition' | 'detail'>('name');

    const category = searchParams.get("category") || "전체"; // 현재 카테고리 가져오기


    const handleOpenModal = (type: 'name' | 'condition' | 'detail') => {
        setFilterType(type);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const nameFilter = searchParams.get("nameFilter") || "최신순"; // URL에서 바로 카테고리 가져오기
    const usageConditions =
        searchParams.get("usageConditions")?.split(",").filter((cond) => cond) || ["이용범위"]; // 쿼리 파라미터 -> 배열 변환
    const detailFilters =
        searchParams.get("detailFilters")?.split(",").filter((detail) => detail) || ["세부조건"]; // 쿼리 파라미터 -> 배열 변환

    // filter-span에서는 각 필터에 해당하는 text와 interaction이 들어갈 수 있게끔만 하면 됨.
    // 바꾸는 건 filter-modal에서 하는 로직.

    // 필터 하나라도 적용시 초기화 버튼 표시
    useEffect(() => {
        // 필터가 하나라도 선택되어 있으면 새로고침 버튼 표시
        if ((usageConditions.length > 0 && usageConditions[0] != "이용범위")
          || (detailFilters.length > 0 && detailFilters[0] != "세부조건")) {
            setShowResetButton(true);
        } else {
            setShowResetButton(false);
        }
      }, [usageConditions, detailFilters]);

    // 모든 필터 초기화
    const handleResetAllFilters = () => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete("nameFilter");
        newParams.delete("usageConditions");
        newParams.delete("detailFilters");
        router.replace(`?${newParams.toString()}`); // URL 갱신
        setShowResetButton(false); // 새로고침 버튼 숨김
    };
    console.log(showResetButton)



    const detailLabel = () => {
        // 선택된 세부 종류 배열
        if (detailFilters.length === 0) {
          // 디폴트 문구
          return "세부조건"
        } else if (detailFilters.length === 1) {
          // 단일 항목
          return detailFilters[0]
        } else {
          // 2개 이상
          return `${detailFilters[0]} 외 ${detailFilters.length - 1}`
        }
      }

    const usageLabel = () => {
        if (usageConditions.length === 0) {
          return "이용범위"
        } else if (usageConditions.length === 1) {
          return usageConditions[0]
        } else {
          return `${usageConditions[0]} 외 ${usageConditions.length - 1}`
        }
      }
      
      

    return (
        <>
            <span className="pl-4 py-3 w-full flex gap-2">
                {/* Reset Button */}
                {showResetButton && (
                    <button
                        className="w-[30px] h-[30px] flex justify-center items-center border-grey750 bg-grey750 text-grey150 rounded-full"
                        onClick={handleResetAllFilters}
                    >
                        <Initiate/>
                    </button>
                )}
                <Button 
                    variant="filter" 
                    className="gap-[2px] border-red bg-darkRed"
                    onClick={() => handleOpenModal('name')}
                    >
                    <div className="flex items-center gap-[2px]" >
                        <span>{nameFilter}</span>
                        <DownArrow/>
                    </div>
                </Button>
                {category !== "전체" && (
                    <Button 
                        variant="filter" 
                        className={`gap-[2px]
                        ${detailFilters.length >= 1 && detailFilters[0] != "세부조건" ? "border-red bg-darkRed" : ""}`}
                        onClick={() => handleOpenModal('detail')}
                        >
                        <div className="flex items-center gap-[2px]">
                            <span>{detailLabel()}</span>
                            <DownArrow/>
                        </div>
                    </Button>
                )}
                <Button 
                    variant="filter" 
                    className={`gap-[2px]
                    ${usageConditions.length >= 1 && usageConditions[0] != "이용범위" ? "border-red bg-darkRed" : ""}`}
                    onClick={() => handleOpenModal('condition')}
                    >
                    <div className="flex items-center gap-[2px]">
                        <span>{usageLabel()}</span>
                        <DownArrow/>
                    </div>
                </Button>
            </span>
            {/* Type에 따른 FilterModal */}
            <FilterModal isOpen={isModalOpen} onClose={handleCloseModal} filterType={filterType} />
        </>
    )
}