'use client';

import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductItem from './product';
import FilterSpan from './(filter)/filter-span';
import { useFilterStore } from '@/lib/zustand/useFilterStore';
import { useScrollStore } from '@/lib/zustand/useScrollStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import LoginModal from '@/components/login-modal';
import { useScrollDirection } from '@/hooks/scroll';
import { before, set, throttle } from 'lodash';


export default function ProductSection({ effector }: EffectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '전체'; // URL에서 바로 카테고리 가져오기

  const { isLoginOpen } = useModalStore();

  const isHeaderVisible = useScrollStore((state) => state.isHeaderVisible);
  const setHeaderVisible = useScrollStore((state) => state.setHeaderVisible);
  const isCategoryFixed = useScrollStore((state) => state.isCategoryFixed);
  const setCategoryFixed = useScrollStore((state) => state.setCategoryFixed);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const {
    setIsActiveCondition,
    // setIsCategoryActiveName,
    setIsActiveDetail,
    // setNameFilter,
    resetUsageConditions,
    resetDetailFilters,
  } = useFilterStore();
  const beforeScrollY = useRef(0);
  const SCROLL_DELTA = 5; // 무시할 최소 스크롤 값


  // 수정해야 할 것  -> 헤더랑 카테고리 fixed될 때 애니메이션 적용 + throllte, useCallback써서 이벤트 리스터 최적화
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("#product-nav");
      const main = document.querySelector("#main");

      if (!nav || !main) return;

      // nav와 main의 상단 간 거리 계산
      const navTop = nav.getBoundingClientRect().top;
      const mainTop = main.getBoundingClientRect().top;
      const currentScrollTop = main.scrollTop;

      if (Math.abs(currentScrollTop - beforeScrollY.current) < SCROLL_DELTA) {
        // 작은 변동 무시
        return;
      }
  
      if (navTop <= mainTop) {
        setHeaderVisible(false); // nav 고정
        // 0.5초 후에 카테고리 고정 실행
        // setTimeout(() => {
        //   setCategoryFixed(true);
        // }, 300); // 0.5초 (500ms) 후 실행
      } 
      if (beforeScrollY.current > currentScrollTop) {
        setHeaderVisible(true); // 헤더 보이기
        // setCategoryFixed(false); // 카테고리 고정 해제

      }
      beforeScrollY.current = currentScrollTop;

    };

    const mainElement = document.querySelector("#main");
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [setHeaderVisible]);
  
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
      mainContainer.scrollTo({ top: scrollPosition-100, behavior: 'smooth' });
    }
  };
  return (
    <section className={`${
      isHeaderVisible ? 'mt-11' : 'mt-8'
    }`}>
      <div  className="w-full flex flex-col">
        <div id='scroll-event' className={`
          bg-grey1000
          ${isHeaderVisible ? 'sticky top-0 z-40' : 'pt-3 w-full absolute top-0 z-40'}
          transition-transform duration-300
        `}>
          <nav id="product-nav" className={`px-4 w-full flex justify-between items-center`}>
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
            <FilterSpan className='py-5' />
        </div>
        {/* <div className={`
            ${
                isHeaderVisible ? '' : 'fixed top-0'
            } z-40 transition-all duration-300`}>

            {/* filter span */}
        {/* </div> */} 

        <main className="w-full grid grid-cols-2 gap-[2px]">
          {effector.map((effectorItem : Effector, index: number) => (
            <ProductItem key={index} effector={effectorItem} />
          ))}
        </main>
      </div>
      {/* 로그인 유저가 아닐 시 로그인 모달 */}
      {isLoginOpen && <LoginModal />}
    </section>
  );
}
