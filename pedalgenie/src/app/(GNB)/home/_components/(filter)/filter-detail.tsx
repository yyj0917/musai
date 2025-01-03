import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { useFilterStore } from '@/lib/zustand/useFilterStore';

import '../../../../globals.css';
import dataset from '@/data/dataset.json';


export default function FilterDetail({ isOpen, onClose }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isBrowser, setIsBrowser] = useState(false);


  const {
    isActiveDetail,
    setIsActiveDetail,
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
    const detailFromURL = searchParams.get('detailFilters');

    // 세부 종류 활성 상태 설정
    if (detailFromURL) {
      setIsActiveDetail(detailFromURL.split(','));
    } else {
        setIsActiveDetail([]);
    }
  }, [searchParams]);

  if (!isOpen || !isBrowser) {
    return null;
  }

  const handleClose = () => {
    onClose();
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
        {/* ================ 필터 타입: 세부종류 (detail) ================ */}
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
      </div>
    </div>
  );
}
