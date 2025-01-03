'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState, useMemo } from 'react';
import DownArrow from '@public/svg/home/down-arrow.svg';
import Initiate from '@public/svg/home/initiate.svg';
import FilterName from './filter-name';
import FilterCondition from './filter-condition';
import FilterDetail from './filter-detail';

export default function FilterSpan() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showResetButton, setShowResetButton] = useState(false); // 새로고침 버튼 상태 관리

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'name' | 'condition' | 'detail'>('name');

  const category = searchParams.get('category') || '전체'; // 현재 카테고리 가져오기

  const handleOpenModal = (type: 'name' | 'condition' | 'detail') => {
    setFilterType(type);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const nameFilter = searchParams.get('nameFilter') || '최신순'; // URL에서 바로 카테고리 가져오기
  
  // 매번 새로운 배열 객체로 생성되기 때문에 React는 의존성 배열이 변했다고 판단 -> useMemo로 값이 변하는 게 아니면 객체 유지.
  const usageConditions = useMemo(() => {
    return (
      searchParams
        .get('usageConditions')
        ?.split(',')
        .filter((cond) => cond) || ['이용범위']
    );
  }, [searchParams]);
  
  const detailFilters = useMemo(() => {
    return (
      searchParams
        .get('detailFilters')
        ?.split(',')
        .filter((detail) => detail) || ['세부조건']
    );
  }, [searchParams]);

  // 필터 하나라도 적용시 초기화 버튼 표시
  useEffect(() => {
    // 필터가 하나라도 선택되어 있으면 새로고침 버튼 표시
    if (
      (usageConditions.length > 0 && usageConditions[0] != '이용범위') ||
      (detailFilters.length > 0 && detailFilters[0] != '세부조건')
    ) {
      setShowResetButton(true);
    } else {
      setShowResetButton(false);
    }
  }, [usageConditions, detailFilters]);

  // 모든 필터 초기화
  const handleResetAllFilters = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('nameFilter');
    newParams.delete('usageConditions');
    newParams.delete('detailFilters');
    router.replace(`?${newParams.toString()}`); // URL 갱신
    setShowResetButton(false); // 새로고침 버튼 숨김
  };

  const detailLabel = () => {
    // 선택된 세부 종류 배열
    if (detailFilters.length === 0) {
      // 디폴트 문구
      return '세부조건';
    } else if (detailFilters.length === 1) {
      // 단일 항목
      return detailFilters[0];
    } else {
      // 2개 이상
      return `${detailFilters[0]} 외 ${detailFilters.length - 1}`;
    }
  };

  const usageLabel = () => {
    if (usageConditions.length === 0) {
      return '이용범위';
    } else if (usageConditions.length === 1) {
      return usageConditions[0];
    } else {
      return `${usageConditions[0]} 외 ${usageConditions.length - 1}`;
    }
  };

  return (
    <>
      <span className="pl-4 py-3 w-full flex gap-2">
        {/* Reset Button */}
        {showResetButton && (
          <button
            className="w-[30px] h-[30px] flex justify-center items-center border-grey750 bg-grey750 text-grey150 rounded-full"
            onClick={handleResetAllFilters}>
            <Initiate />
          </button>
        )}
        <Button variant="filter" className="gap-[2px] border-red bg-darkRed" onClick={() => handleOpenModal('name')}>
          <div className="flex items-center gap-[2px]">
            <span>{nameFilter}</span>
            <DownArrow />
          </div>
        </Button>
        {category !== '전체' && (
          <Button
            variant="filter"
            className={`gap-[2px]
                        ${detailFilters.length >= 1 && detailFilters[0] != '세부조건' ? 'border-red bg-darkRed' : ''}`}
            onClick={() => handleOpenModal('detail')}>
            <div className="flex items-center gap-[2px]">
              <span>{detailLabel()}</span>
              <DownArrow />
            </div>
          </Button>
        )}
        <Button
          variant="filter"
          className={`gap-[2px]
                    ${usageConditions.length >= 1 && usageConditions[0] != '이용범위' ? 'border-red bg-darkRed' : ''}`}
          onClick={() => handleOpenModal('condition')}>
          <div className="flex items-center gap-[2px]">
            <span>{usageLabel()}</span>
            <DownArrow />
          </div>
        </Button>
      </span>
        {/* Type에 따른 FilterModal */}
        {filterType === 'name' && (
            <FilterName isOpen={isModalOpen} onClose={handleCloseModal}/>)}
        
        {filterType === 'condition' && (
            <FilterCondition isOpen={isModalOpen} onClose={handleCloseModal}/>)}
        
        {filterType === 'detail' && (
            <FilterDetail isOpen={isModalOpen} onClose={handleCloseModal}/>)}

        {/* <FilterModal isOpen={isModalOpen} onClose={handleCloseModal} filterType={filterType} /> */}
    </>
  );
}
