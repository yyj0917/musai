'use client';
import LeftArrow from '@public/svg/home/shop/shop-leftarrow.svg';
import SearchIcon from '@public/svg/search.svg';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchedProduct from './searched-product';
import SearchedShop from './searched-shop';
import { fetchSearchItem } from '@/lib/api/(product)/product';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import FloatingButton from '@/components/floating-button';
import { useScrollToggle } from '@/hooks/use-scroll';
import NotFoundAll from '@/components/not-found-all';

export default function SearchedSection() {
    const router = useRouter();

  // ✅ 초기 상태는 빈 값으로 설정 (서버에서 접근 방지)
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const searchParams = useSearchParams();

   // 새로고침 시 keyword 파라미터로 데이터 refetch
   useEffect(() => {

    const currentKeyword = searchParams.get('keyword') || '';
    if (currentKeyword) {
      setSearchQuery(currentKeyword);
      setSearching(true);
      refetch();
    }
  }, []);

  const {
    data: searchData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['searchResults', searchQuery],
    queryFn: () => fetchSearchItem(searchQuery),
    staleTime: 0,
    gcTime: 0,
    enabled: !!searchQuery, // searchQuery가 비어 있으면 실행하지 않음
});

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (typeof window !== 'undefined') {
      // 쿼리 파라미터를 업데이트
      setSearching(true);
      const params = new URLSearchParams(searchParams.toString());
      params.set('keyword', searchQuery);
      router.replace(`?${params.toString()}`);
      refetch();
      }
    };
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // 엔터 키를 누르면 handleSearch 호출
    }
  };
 

  useScrollToggle({ containerId: 'searchResult' });

    return (
        <>
            <div className="px-4 py-2 w-full h-15 flex items-center">
                <button onClick={() => router.back()} className="w-6 h-6 flex justify-center items-center text-grey150">
                    <LeftArrow />
                </button>
                <div className="px-[14px] py-1 w-full flex justify-between items-center rounded-[20px] bg-grey850">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchQuery}
                        onChange={(e) => {
                        const newQuery = e.target.value;
                        setSearchQuery(newQuery);
                        // Input이 빈 값일 경우 searchParams 초기화
                        if (!newQuery.trim()) {
                            setSearchQuery('');
                            const params = new URLSearchParams();
                            params.delete('keyword'); // 'keyword' 파라미터 제거
                            router.replace(`?${params.toString()}`);
                            setSearching(false);
                        }
                        }}
                        onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가
                        className="max-w-64 w-full flex justify-start bg-inherit 
                                        text-white text-body2 placeholder:text-grey650 focus:outline-none focus:ring-0 focus:border-white focus:placeholder-transparent line-clamp-1"
                    />
                    <button onClick={handleSearch} className="text-grey150">
                        <SearchIcon />
                    </button>
                </div>
            </div>
            {/* 검색 결과 렌더링 */}
            {searchQuery && searching && (
                <div
                id="searchResult"
                className="w-full h-[calc(100dvh-60px-87px)] flex flex-col overflow-y-auto scrollbar-hide">
                {isError && (
                    <NotFoundAll alertText={'검색 결과가 존재하지 않습니다'}/>
                )}
                {isLoading && <Loading />}
                {!isLoading && !isError && searchData && (
                    <>
                    {searchData.shops.length > 0 && <SearchedShop searchedShops={searchData.shops} />}
                    {searchData.products.length > 0 && <SearchedProduct searchedProducts={searchData.products} />}
                    <FloatingButton scrollContainer={'searchResult'} />
                    </>
                )}
                </div>
            )}
        </>
    );
}