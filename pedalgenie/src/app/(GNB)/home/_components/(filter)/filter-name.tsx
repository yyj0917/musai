import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import clsx from 'clsx';
import Check from '@public/svg/filter-check.svg';
import { useFilterStore } from '@/lib/zustand/useFilterStore';

import '../../../../globals.css';


export default function FilterName({ isOpen, onClose }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isBrowser, setIsBrowser] = useState(false);
  // const [isAnimating, setIsAnimating] = useState(false);

  const {
    isCategoryActiveName,
    setIsCategoryActiveName,
    setNameFilter,
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

    // 정렬 기준 활성 상태 설정
    if (nameFromURL) {
      setIsCategoryActiveName(nameFromURL);
    } else {
      setIsCategoryActiveName(null);
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

  // useEffect(() => {
  //   if (!isOpen) {
  //     // isOpen이 false일 때 닫히는 애니메이션 실행
  //     setIsAnimating(true);

  //     // 애니메이션 지속 시간 후 DOM에서 완전히 제거
  //     const timer = setTimeout(() => {
  //       setIsAnimating(false);
  //     }, 300); // 애니메이션 지속 시간과 일치
  //     return () => clearTimeout(timer);
  //   }
  // }, [isOpen]);

  // if (!isOpen && !isAnimating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50" onClick={handleClose}>
      <div
        className="bg-grey850 px-4 pt-5 pb-6 rounded-t-2xl rounded-b-none min-w-[360px] max-w-[415px] lg:max-w-[375px] transition-transform duration-300 transform translate-y-0"
        onClick={(e) => e.stopPropagation()} // 모달 안쪽 클릭 시 닫히지 않도록
        style={{ animation: `${isOpen ? 'slideUp' : 'slideDown'} 0.3s ease-in-out` }}>
        {/* ================ 필터 타입: 정렬기준 (name) ================ */}
          <div className="w-full flex flex-col items-start gap-6">
            <h2 className="!text-title1 text-white">정렬</h2>
            <div className="w-full flex flex-col items-start gap-4">
              {nameFilters.map((filter) => {
                const isActive = isCategoryActiveName === filter;
                return (
                  <button key={filter} onClick={() => handleSelectName(filter)} className="flex items-center gap-1">
                    <span
                      className={clsx({
                        'text-red': isActive,
                        'text-grey650': !isActive,
                      })}>
                      <Check />
                    </span>
                    <span className="text-grey150 text-body2">{filter}</span>
                  </button>
                );
              })}
            </div>
          </div>
      </div>
    </div>
  );
}
