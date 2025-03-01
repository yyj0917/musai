import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { useFilterStore } from '@/lib/zustand/useFilterStore';

import '../../../../globals.css';
import dataset from '@/data/dataset.json';
import useDelay from '@/hooks/use-delay';

type FilterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FilterDetail({ isOpen, onClose }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shouldRender, setShouldRender] = useState(true); // 렌더링 여부

  const { isActiveDetail, setIsActiveDetail, toggleDetailFilter, resetDetailFilters } = useFilterStore();

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

  // ==================== 세부 종류 ====================
  // Subcategories 가져오기
  const selectedCategory = searchParams.get('category');
  const category = dataset.categories.find((cat) => cat.title === selectedCategory);
  const subCategories = category?.subcategories || [];

  const handleToggleDetail = (details: string) => {
    const updatedDetails = isActiveDetail.includes(details)
      ? isActiveDetail.filter((c) => c !== details)
      : [...isActiveDetail, details];

    setIsActiveDetail(updatedDetails);
  };
  const handleResetDetail = () => {
    resetDetailFilters();
    setIsActiveDetail([]);
    updateQueryParam('detailFilters', null);
  };
  // 확인 시 필터변경
  const handleClose = () => {
    onClose();
    updateQueryParam('detailFilters', isActiveDetail);
    toggleDetailFilter(isActiveDetail);
    // 필터 변경 시 상품 리스트로 스크롤
    const targetSection = document.getElementById('product-section');
    const mainContainer = document.getElementById('main');
    if (targetSection && mainContainer) {
      const scrollPosition = targetSection.offsetTop;
      mainContainer.scrollTo({ top: scrollPosition-92, behavior: 'smooth' });
    }
  };

  // 필터 스르륵 내리는 모션용 useEffect
  useEffect(() => {
    if (!isOpen) {
      // fade-out 완료 후 렌더링 중지
      const timeout = setTimeout(() => setShouldRender(false), 300); // fade-out 시간
      return () => clearTimeout(timeout);
    } else {
      setShouldRender(true); // fade-in 즉시 렌더링
    }
  }, [isOpen]);
  const isDelay = useDelay(300);

  return isDelay && shouldRender ? (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50" onClick={handleClose}>
      <div
        className="bg-grey850 px-4 pt-5 pb-6 rounded-t-2xl rounded-b-none min-w-[360px] max-w-[415px] lg:max-w-[375px] transition-transform duration-300 transform translate-y-0"
        onClick={(e) => e.stopPropagation()} // 모달 안쪽 클릭 시 닫히지 않도록
        style={{ animation: `${isOpen ? 'slideUp' : 'slideDown'} 0.3s ease-in-out` }}>
        {/* ================ 필터 타입: 세부종류 (detail) ================ */}
        <div className="w-full flex flex-col items-start gap-6">
          <h2 className="text-title1 !text-white">카테고리</h2>
          <div className="w-full flex flex-wrap items-start gap-x-2 gap-y-[10px]">
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
    ) : null;
}
