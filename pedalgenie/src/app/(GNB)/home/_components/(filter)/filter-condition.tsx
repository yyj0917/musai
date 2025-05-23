import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import Check from '@public/svg/filter-check.svg';
import { useFilterStore } from '@/lib/zustand/useFilterStore';

import '../../../../globals.css';
import useDelay from '@/hooks/use-delay';

type FilterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FilterCondition({ isOpen, onClose }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shouldRender, setShouldRender] = useState(true); // 렌더링 여부

  const { isActiveCondition, setIsActiveCondition, toggleUsageCondition, resetUsageConditions } = useFilterStore();

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
    const conditionsFromURL = searchParams.get('usageConditions');

    // 이용 조건 활성 상태 설정
    if (conditionsFromURL) {
      setIsActiveCondition(conditionsFromURL.split(','));
    } else {
      setIsActiveCondition([]);
    }
  }, [searchParams]);


  // ==================== 이용 조건 ====================
  const conditionOptions = ['시연 가능', '대여 가능', '구매 가능'];

  const handleToggleCondition = (condition: string) => {
    const updatedConditions = isActiveCondition.includes(condition)
      ? isActiveCondition.filter((c) => c !== condition)
      : [...isActiveCondition, condition];

    setIsActiveCondition(updatedConditions);
  };
  const handleResetCondition = () => {
    resetUsageConditions();
    setIsActiveCondition([]);
    updateQueryParam('usageConditions', null);
  };
  // 확인 시 필터 적용
  const handleClose = () => {
    onClose();
    updateQueryParam('usageConditions', isActiveCondition);
    toggleUsageCondition(isActiveCondition);
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
        className="bg-grey850 px-4 pt-5 pb-6 rounded-t-2xl rounded-b-none w-full min-w-[360px] max-w-[415px] lg:max-w-[375px] transition-transform duration-300 transform translate-y-0"
        onClick={(e) => e.stopPropagation()} // 모달 안쪽 클릭 시 닫히지 않도록
        style={{ animation: `${isOpen ? 'slideUp' : 'slideDown'} 0.3s ease-in-out` }}>
        {/* ================ 필터 타입: 이용조건 (condition) ================ */}
        <div className="w-full flex flex-col items-start gap-6">
          <h2 className="text-title1 !text-white">이용범위</h2>
          <div className="w-full flex flex-col items-start gap-4">
            {conditionOptions.map((cond) => {
              const isActive = isActiveCondition.includes(cond);
              return (
                <button key={cond} onClick={() => handleToggleCondition(cond)} className="flex items-center gap-1">
                  <span
                    className={clsx({
                      'text-red': isActive,
                      'text-grey650': !isActive,
                    })}>
                    <Check />
                  </span>
                  <span className="text-grey150 text-body2">{cond}</span>
                </button>
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
      </div>
    </div>
  ) : null;
}
