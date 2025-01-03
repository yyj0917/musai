'use client';

import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductItem from './product';
import FilterSpan from './(filter)/filter-span';
import { useFilterStore } from '@/lib/zustand/useFilterStore';


export default function ProductSection({ effector }: EffectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '전체'; // URL에서 바로 카테고리 가져오기

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const {
    setIsActiveCondition,
    setIsCategoryActiveName,
    setIsActiveDetail,
    setNameFilter,
    resetUsageConditions,
    resetDetailFilters,
  } = useFilterStore();

  // 의존성 관리 useCallback
  const updateQueryParam = useCallback((key: string, value: string | string[] | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
  
    if (!value || (Array.isArray(value) && value.length === 0)) {
      newParams.delete(key);
    } else {
      const valueString = Array.isArray(value) ? value.join(',') : value;
      newParams.set(key, valueString);
    }
    router.replace(`?${newParams.toString()}`);
  }, [searchParams, router]);
  
  // 카테고리 변경
  useEffect(() => {
    const currentCategory = searchParams.get('category') || '전체';

    if (currentCategory !== selectedCategory) {
        const newParams = new URLSearchParams();

        // 카테고리와 기본 필터 초기화
        newParams.set('category', selectedCategory);
        newParams.set('nameFilter', '최신순');
        newParams.delete('usageCondition');
        newParams.delete('detailFilter');
        resetUsageConditions();
        resetDetailFilters();
        setIsActiveCondition([]);
        setIsActiveDetail([]);
        // URL 업데이트
        router.replace(`?${newParams.toString()}`);
        }

  }, [selectedCategory, router, searchParams]);

  // 초기 로드 시 URL category, nameFilter 쿼리파라미터 초기값 설정
  useEffect(() => {
    const categoryFromURL = searchParams.get('category') || '전체';
    const nameFromURL = searchParams.get('nameFilter') || '최신순';
    setSelectedCategory(categoryFromURL);

    // URL에 기본값 설정
    const newParams = new URLSearchParams(searchParams.toString());
    let hasUpdated = false;

    if (!searchParams.has('category')) {
      newParams.set('category', categoryFromURL);
      hasUpdated = true;
    }

    if (!searchParams.has('nameFilter')) {
      newParams.set('nameFilter', nameFromURL);
      hasUpdated = true;
    }

    // URL을 한 번만 업데이트
    if (hasUpdated) {
      router.replace(`?${newParams.toString()}`);
    }
  }, [searchParams, router]);

  const category = ['전체', '기타', '베이스', '키보드', '드럼', '관현악'];

  const handleCategoryPick = (targetId: string, item: string) => {
    setSelectedCategory(item);

    const targetSection = document.getElementById(targetId);
    const mainContainer = document.getElementById('main');
    if (targetSection && mainContainer) {
      const scrollPosition = targetSection.offsetTop;
      mainContainer.scrollTo({ top: scrollPosition - 100, behavior: 'smooth' });
    }
  };
  return (
    <section className="mt-11">
      <div id="product-section" className="w-full flex flex-col">
        <nav className="px-4 w-full flex justify-between items-center">
          {category.map((item, index) => (
            <Button
              key={index}
              variant="primary"
              className={`${selectedCategory === item ? 'bg-red text-grey150 !text-body1' : ''}`}
              onClick={() => handleCategoryPick('product-section', item)}>
              {item}
            </Button>
          ))}
        </nav>

        {/* filter span */}
        <FilterSpan />

        <main className="w-full grid grid-cols-2 gap-[2px]">
          {effector.map((effectorItem : Effector, index: number) => (
            <ProductItem key={index} effector={effectorItem} />
          ))}
        </main>
      </div>
    </section>
  );
}
