import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import clsx from 'clsx';
import Check from '@public/svg/filter-check.svg';
import { useFilterStore } from '@/lib/zustand/useFilterStore';

import '../../../../globals.css';

type FilterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FilterName({ isOpen, onClose }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isBrowser, setIsBrowser] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { isCategoryActiveName, setIsCategoryActiveName, setNameFilter } = useFilterStore();

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
    setIsAnimating(true); // 애니메이션 시작
    setTimeout(() => {
      onClose(); // 애니메이션이 끝난 후 isOpen 상태 변경
      setIsAnimating(false); // 애니메이션 상태 초기화
    }, 300); // 애니메이션 지속 시간과 일치시킴
  };

  // ==================== 정렬 기준 ====================
  const nameFilters = ['최신순', '이름순', '좋아요순'] as const;

  const handleSelectName = (filter: (typeof nameFilters)[number]) => {
    handleClose();
    updateQueryParam('nameFilter', filter); // 쿼리 파라미터 업데이트
    setNameFilter(filter);

    // 필터 변경 시 상품 리스트로 스크롤
    const targetSection = document.getElementById('product-section');
    const mainContainer = document.getElementById('main');
    if (targetSection && mainContainer) {
      const scrollPosition = targetSection.offsetTop;
      mainContainer.scrollTo({ top: scrollPosition-92, behavior: 'smooth' });
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 ${
      isOpen ? 'slideDown' : 'slideUp'
      }`} onClick={handleClose}>
      <div
        className="w-full min-w-[360px] max-w-[415px] lg:max-w-[375px] bg-grey850 px-4 pt-5 pb-6 rounded-t-2xl rounded-b-none transition-transform duration-300 transform translate-y-0"
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
