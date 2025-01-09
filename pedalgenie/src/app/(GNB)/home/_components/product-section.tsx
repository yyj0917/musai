'use client';

import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductItem from './product';
import FilterSpan from './(filter)/filter-span';
import { useFilterStore } from '@/lib/zustand/useFilterStore';
import { useScrollStore } from '@/lib/zustand/useScrollStore';


export default function ProductSection({ effector }: EffectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '전체'; // URL에서 바로 카테고리 가져오기

  const isHeaderVisible = useScrollStore((state) => state.isHeaderVisible);
//   const setHeaderVisible = useScrollStore((state) => state.setHeaderVisible);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const {
    setIsActiveCondition,
    // setIsCategoryActiveName,
    setIsActiveDetail,
    // setNameFilter,
    resetUsageConditions,
    resetDetailFilters,
  } = useFilterStore();

//   const observerRef = useRef<HTMLDivElement>(null);
//   const observerInstance = useRef<IntersectionObserver | null>(null);
//   const lastScrollTop = useRef<number | undefined>(0);


  // 의존성 관리 useCallback
//   const updateQueryParam = useCallback((key: string, value: string | string[] | null) => {
//     const newParams = new URLSearchParams(searchParams.toString());
  
//     if (!value || (Array.isArray(value) && value.length === 0)) {
//       newParams.delete(key);
//     } else {
//       const valueString = Array.isArray(value) ? value.join(',') : value;
//       newParams.set(key, valueString);
//     }
//     router.replace(`?${newParams.toString()}`);
//   }, [searchParams, router]);
 // Intersection Observer
//  const createObserver = () => {
//     const observerTarget = observerRef.current;
//     const mainElement = document.getElementById('main');

//     if (!observerTarget || !mainElement) return;

//     observerInstance.current = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           console.log('intersecting');
//           setHeaderVisible(false); // 아래 div가 화면에 닿으면 헤더 숨김
//           observerInstance.current?.unobserve(observerTarget); // 관찰 중단
//         }
//       },
//       {
//         root: mainElement,
//         rootMargin: `0px 0px -98% 0px`, // 헤더 아래 2px
//         threshold: 0.1,
//       }
//     );

//     observerInstance.current.observe(observerTarget);
//   };
//  useEffect(() => {
//     const observerTarget = observerRef.current;
//     const mainElement = document.getElementById('main');

//     console.log(mainElement)
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//             console.log('intersecting');
//             setHeaderVisible(false); // 아래 div가 화면에 닿으면 헤더 숨김
//         } else {
//             setHeaderVisible(true); // 화면에서 벗어나면 헤더 표시
//         }
//         console.log(isHeaderVisible);
//       },
//       {
//         root: mainElement,
//         rootMargin: `0px 0px -98% 0px`, // 헤더 아래 2px
//         threshold: 0.1, // 조금만 교차되어도 감지
//     }
//     );

//     if (observerTarget) {
//         console.log('observing');
//         observer.observe(observerTarget);
//     }

//     return () => {
//       if (observerTarget) {
//         observer.unobserve(observerTarget);
//       }
//     };
//   }, [setHeaderVisible]);
//   // Scroll Direction Detection
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY || document.documentElement.scrollTop;

//       if (scrollTop > lastScrollTop.current) {
//         // 스크롤 다운
//         setHeaderVisible(false);
//       } else {
//         // 스크롤 업
//         setHeaderVisible(true);
//       }

//       lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop; // scrollTop이 음수로 가지 않도록
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [setHeaderVisible]);
// 스크롤 방향 감지
// useEffect(() => {
//     const mainElement = document.getElementById('main');
//     // let hasScrolledDown = false;
//     // let hasScrolledUp = false;
//     // const handleScroll = () => {
//     //     let scrollLength = mainElement?.scrollTop;     // 현재 스크롤 위치
//     //     let mainCHeight = mainElement?.clientHeight;  // 보여지는 div 높이
//     //     let mainSHeight = mainElement?.scrollHeight;  // 콘텐츠 전체 높이
    
//     //     // 아래로 스크롤했을 때
//     //     if (scrollLength && mainCHeight && mainSHeight && scrollLength + mainCHeight >= mainSHeight && !hasScrolledDown) {
            
//     //         console.log('up');
//     //         setHeaderVisible(true);
//     //         hasScrolledUp = false; // 위로 스크롤 완료 상태
//     //         hasScrolledDown = true; // 아래로 스크롤 완료 상태 초기화
//     //     }
//     //     // 위로 스크롤했을 때
//     //     if (scrollLength && mainCHeight && scrollLength < mainCHeight && !hasScrolledUp) {
//     //         // setHeaderVisible(false);
//     //         console.log('down');

//     //         hasScrolledDown = false; // 아래로 스크롤 완료 상태
//     //         hasScrolledUp = true; // 위로 스크롤 완료 상태 초기화
//     //     }
//     //     }
//     const handleScroll = () => {
//         const currentScrollTop = mainElement?.scrollTop; // 컨테이너의 스크롤 위치 가져오기

//         // delta 값보다 더 스크롤되었는지를 확인
//         // if (Math.abs(lastScrollTop.current - st) <= delta) return;
//         // 스크롤 업 -> 헤더 표시
//         console.log(currentScrollTop, lastScrollTop.current);
//         if (currentScrollTop && lastScrollTop.current && currentScrollTop < lastScrollTop.current) {
//             setHeaderVisible(true);
//             return () => {
//                 mainElement?.removeEventListener('scroll', handleScroll);
//             };
//           }
//         if (currentScrollTop) {
//             lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop; // 음수 방지
//         }

//         };

//         mainElement?.addEventListener('scroll', handleScroll, { passive: true });

    
//   }, [isHeaderVisible]);

  // 초기 Observer 생성
//   useEffect(() => {
//     createObserver();

//     return () => {
//       observerInstance.current?.disconnect(); // 컴포넌트 언마운트 시 Observer 해제
//     };
//   }, [isHeaderVisible]);
  
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
    <section className="mt-11">
      <div id="product-section" className="w-full flex flex-col">
          <nav className='px-4 w-full flex justify-between items-center'>
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
    </section>
  );
}
