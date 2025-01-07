import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import Check from '@public/svg/home/check.svg';
import { useFilterStore } from '@/lib/zustand/useFilterStore';

import '../../../../globals.css';
import dataset from '@/data/dataset.json';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterType: 'name' | 'condition' | 'detail'; // 필터 타입 지정
}

export default function FilterModal({ isOpen, onClose, filterType }: FilterModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isBrowser, setIsBrowser] = useState(false);


  const {
    isActiveCondition,
    isCategoryActiveName,
    isActiveDetail,
    setIsActiveCondition,
    setIsCategoryActiveName,
    setIsActiveDetail,
    setNameFilter,
    toggleUsageCondition,
    resetUsageConditions,
    toggleDetailFilter,
    resetDetailFilters,
  } = useFilterStore();

  // === URL 쿼리 파라미터 추가/삭제 함수 ===
  const updateQueryParam = (key: string, value: string | string[] | null) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (!value || (Array.isArray(value) && value.length === 0)) {
      // 값이 없으면 쿼리 파라미터 삭제
      newParams.delete(key);
    } else {
      // 값이 있으면 쿼리 파라미터 추가
      const valueString = Array.isArray(value) ? value.join(',') : value;
      newParams.set(key, valueString);
    }

    // URL 업데이트
    router.replace(`?${newParams.toString()}`);
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // 활성화된 필터 상태를 URL 쿼리 파라미터에서 가져와 적용
  useEffect(() => {
    const nameFromURL = searchParams.get('nameFilter');
    const conditionsFromURL = searchParams.get('usageConditions');

    // 정렬 기준 활성 상태 설정
    if (nameFromURL) {
      setIsCategoryActiveName(nameFromURL);
    } else {
      setIsCategoryActiveName(null);
    }

    // 이용 조건 활성 상태 설정
    if (conditionsFromURL) {
      setIsActiveCondition(conditionsFromURL.split(','));
    } else {
      setIsActiveCondition([]);
    }
  }, [searchParams]);

  if (!isOpen || !isBrowser) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  // ==================== 정렬 기준 ====================
  const nameFilters = ['최신순', '이름순', '좋아요순'] as const;

  const handleSelectName = (filter: (typeof nameFilters)[number]) => {
    setNameFilter(filter);
    updateQueryParam('nameFilter', filter); // 쿼리 파라미터 업데이트
    handleClose();
    // 필요하면 여기서 API 호출
    // fetchFilteredData({ nameFilter: filter, ... })
  };

  // ==================== 이용 조건 ====================
  const conditionOptions = ['시연가능', '대여가능', '구매가능'];

  const handleToggleCondition = (condition: string) => {
    toggleUsageCondition(condition);
    const updatedConditions = isActiveCondition.includes(condition)
      ? isActiveCondition.filter((c) => c !== condition)
      : [...isActiveCondition, condition];

    setIsActiveCondition(updatedConditions);
    updateQueryParam('usageConditions', updatedConditions);
  };
  const handleResetCondition = () => {
    resetUsageConditions();
    setIsActiveCondition([]);
    updateQueryParam('usageConditions', null);
  };

  // ==================== 세부 종류 ====================
  // Subcategories 가져오기
  const selectedCategory = searchParams.get('category');
  const category = dataset.categories.find((cat) => cat.title === selectedCategory);
  const subCategories = category?.subcategories || [];

  const handleToggleDetail = (details: string) => {
    toggleDetailFilter(details);
    const updatedDetails = isActiveDetail.includes(details)
      ? isActiveDetail.filter((c) => c !== details)
      : [...isActiveDetail, details];

    setIsActiveDetail(updatedDetails);
    updateQueryParam('detailFilters', updatedDetails);
  };
  const handleResetDetail = () => {
    resetDetailFilters();
    setIsActiveDetail([]);
    updateQueryParam('detailFilters', null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50" onClick={handleClose}>
      <div
        className="bg-grey850 px-4 pt-5 pb-6 rounded-t-2xl rounded-b-none w-[375px] transition-transform duration-300 transform translate-y-0"
        onClick={(e) => e.stopPropagation()} // 모달 안쪽 클릭 시 닫히지 않도록
        style={{ animation: `${isOpen ? 'slideUp' : 'slideDown'} 0.3s ease-in-out` }}>
        {/* ================ 필터 타입: 정렬기준 (name) ================ */}
        {filterType === 'name' && (
          <div className="w-full flex flex-col items-start gap-6">
            <h2 className="!text-title1 text-white">정렬</h2>
            <div className="w-full flex flex-col items-start gap-4">
              {nameFilters.map((filter) => {
                const isActive = isCategoryActiveName === filter;
                return (
                  <div key={filter} className="flex items-center gap-2">
                    <button
                      className={clsx({
                        'text-red': isActive,
                        'text-grey650': !isActive,
                      })}
                      onClick={() => handleSelectName(filter)}>
                      <Check />
                    </button>
                    <span className="text-grey150 text-body2">{filter}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {filterType === 'condition' && (
          <div className="w-full flex flex-col items-start gap-6">
            <h2 className="text-title1 !text-white">이용범위</h2>
            <div className="w-full flex flex-col items-start gap-4">
              {conditionOptions.map((cond) => {
                const isActive = isActiveCondition.includes(cond);
                return (
                  <div key={cond} className="flex items-center gap-2">
                    <button
                      className={clsx({
                        'text-red': isActive,
                        'text-grey650': !isActive,
                      })}
                      onClick={() => handleToggleCondition(cond)}>
                      <Check />
                    </button>
                    <span className="text-grey150 text-body2">{cond}</span>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex gap-2">
              <Button variant={'custom'} className="flex-1 bg-grey750" onClick={() => handleResetCondition()}>
                초기화
              </Button>
              <Button variant={'custom'} className="w-[70%] bg-red" onClick={handleClose}>
                확인
              </Button>
            </div>
          </div>
        )}
        {filterType === 'detail' && (
          <div className="w-full flex flex-col items-start gap-6">
            <h2 className="text-title1 !text-white">카테고리</h2>
            <div className="w-full flex flex-wrap items-start gap-2">
              {subCategories?.map((detail) => {
                const isActive = isActiveDetail.includes(detail);
                return (
                  <div key={detail} className="flex items-center">
                    <Button
                      variant={'filter'}
                      className={clsx('py-2 text-body2', {
                        'bg-darkRed border-red': isActive,
                        '': !isActive,
                      })}
                      onClick={() => handleToggleDetail(detail)}>
                      {detail}
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex gap-2">
              <Button variant={'custom'} className="flex-1 bg-grey750" onClick={() => handleResetDetail()}>
                초기화
              </Button>
              <Button variant={'custom'} className="w-[70%] bg-red" onClick={handleClose}>
                확인
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
