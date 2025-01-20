'use client';

import { Button } from '@/components/ui/button';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductItem from './product';
import FilterSpan from './(filter)/filter-span';
import { useFilterStore } from '@/lib/zustand/useFilterStore';
import { useScrollStore } from '@/lib/zustand/useScrollStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import LoginModal from '@/components/modal/login-modal';
import { useScrollDirection } from '@/hooks/scroll';
import { before, set, throttle } from 'lodash';
import FloatingButton from '@/components/floating-button';
import { Product, ProductList } from '@/types/product-type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FetchProductListParams, fetchProductList } from '@/lib/api/(product)/product';
import { mapCategoryToParam, mapFilterToSortBy, mapUsageConditions } from '@/lib/utils/utils';
import Loading from '@/components/loading';
import useDelay from '@/hooks/use-delay';

type ProductProps = {
  product: ProductList
}
interface FetchProductListResponse {
  items: ProductList; // 반환되는 제품 리스트
  currentPage: number | unknown; // 현재 페이지
  totalPages: number; // 전체 페이지 수
}

export default function ProductSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDelay = useDelay(1000);
  const initialCategory = searchParams.get('category') || '전체'; // URL에서 바로 카테고리 가져오기

  const { isLoginOpen, setFloatingButton } = useModalStore();

  const isHeaderVisible = useScrollStore((state) => state.isHeaderVisible);
  const setHeaderVisible = useScrollStore((state) => state.setHeaderVisible);


  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const {
    setNameFilter,
    setIsActiveCondition,
    setIsActiveDetail,
    resetUsageConditions,
    resetDetailFilters,

    // 전역 필터 상태 변경에 따른 product api호출 로직을 위해 호출
    nameFilter,
    usageConditions,
    detailFilters,
  } = useFilterStore();
  const beforeScrollY = useRef(0);
  const SCROLL_DELTA = 5; // 무시할 최소 스크롤 값

  // 1) 'product-section'을 관찰할 IntersectionObserver
  // ------------------------------------------
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  // 1) "4번째 줄" 근처에 놓을 div를 ref로 잡는다 -> 특정 위치에 도달하면 쿼리 함수 호출
  // ----------------------------------------------------
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // "main" 스크롤 영역 안에서 교차를 감지하는 Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 등장하면 isSectionVisible = true
        if (entries[0].isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      {
        root: document.querySelector('#main'), // 관찰할 스크롤 컨테이너
        threshold: 0.1, // 섹션이 10% 정도 보이면 등장했다고 판단
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  


  // useInfiniteQuery로 데이터 페칭
  const {
    data: product,                // data.pages: 각 페이지 데이터의 배열
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<FetchProductListResponse>({
    queryKey: [
      'products',
      selectedCategory,
      nameFilter,
      usageConditions,
      detailFilters,
    ], // Query Key
    queryFn: async ({ pageParam = 0 }): Promise<FetchProductListResponse> => {
      // 전역 값(카테고리,필터) → API 파라미터로 매핑
      const mappedCategory = mapCategoryToParam(selectedCategory);
      const mappedSortBy = mapFilterToSortBy(nameFilter);
      const mappedUsage = mapUsageConditions(usageConditions);
      const params: FetchProductListParams = {
        category: mappedCategory,
        sortBy: mappedSortBy, 
        page: pageParam,
        size: 10, 
        // usageCondition → isRentable, isPurchasable, isDemoable
        isRentable: mappedUsage.isRentable,
        isPurchasable: mappedUsage.isPurchasable,
        isDemoable: mappedUsage.isDemoable,
        // detailFilters → subCategoryIds
        subCategoryNames: detailFilters.length > 0 ? detailFilters.join(',') : undefined,
      };
      const result = await fetchProductList(params);

      // 페이지 관련 메타데이터 추가
      return {
        items: result, // 실제 데이터
        currentPage: pageParam, // 현재 페이지 번호
        totalPages: 10, // 총 페이지 수 (API에서 제공하는 값 사용 가능)
      };    },
    // 모든 필터가 바뀔 때마다 새롭게 fetching
    // (React Query가 queryKey 변화 감지 후 캐시 무효화 → 재요청)
    // any 수정
    getNextPageParam: (lastPage : any) => {
      // 다음 페이지의 조건
      if (!lastPage || lastPage.items.length < 10) {
        return undefined; // 더 이상 페이지가 없을 경우
      }
      return lastPage.currentPage + 1; // 다음 페이지 번호
    },
    initialPageParam: 0, // 초기 페이지 번호

    }
  );
  useEffect(() => {
    refetch();
  }, [selectedCategory, nameFilter, usageConditions, detailFilters]);
  // 2) IntersectionObserver 세팅
  // ----------------------------------------------------
  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    if (!sentinelEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // sentinel이 보이고, 다음 페이지가 있고, 아직 페칭 중이 아닐 때
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: document.getElementById('main'), // 스크롤 컨테이너
        threshold: 0.1, // 10%만 보여도 '보임'으로 판단
      }
    );

    observer.observe(sentinelEl);

    // cleanup
    return () => {
      observer.unobserve(sentinelEl);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);



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
        setFloatingButton(false);

      } else {
        setFloatingButton(true);

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
        setNameFilter('최신순');
        resetUsageConditions();
        resetDetailFilters();
        setIsActiveCondition([]);
        setIsActiveDetail([]);
        // URL 업데이트
        router.replace(`?${newParams.toString()}`);
        }

  }, [selectedCategory]);

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

    // const targetSection = document.getElementById(targetId);
    // const mainContainer = document.getElementById('main');
    // if (targetSection && mainContainer) {
    //   const scrollPosition = targetSection.offsetTop;
    //   mainContainer.scrollTo({ top: scrollPosition-100, behavior: 'smooth' });
    // }
  };


  return (
    <section
      ref={sectionRef}
      className={`relative ${
      isHeaderVisible ? 'mt-11' : 'mt-8'
    }`}>
      <div id='product-section'  className="w-full flex flex-col">
        <div id='scroll-event' className={`
          bg-grey1000
          ${isHeaderVisible ? 'sticky top-0 z-40' : 'pt-3 w-full  top-0 z-100'}
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

        <main className="w-full grid grid-cols-2 gap-[2px]">
          {product?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.items.map((productItem: Product) => (
                <ProductItem key={productItem.id} product={productItem} />
              ))}
            </React.Fragment>
          ))}
          {/* 마지막 sentinel */}
          {hasNextPage && <div ref={sentinelRef} className="bg-transparent"></div>}
        </main>
      </div>
      {/* 로그인 유저가 아닐 시 로그인 모달 */}
      {isLoginOpen && <LoginModal />}
      {/* 플로팅 버튼 */}
      <FloatingButton targetSection={'product-section'} mainContainer={'main'} />
      {/* 로딩 중 */}
      {isLoading || !isDelay && <Loading/>}
    </section>
  );
}
