"use client";

import LeftArrow from '@public/svg/home/shop/shop-leftarrow.svg';
import SearchIcon from '@public/svg/search.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchedProduct from './_components/searched-product';
import SearchedShop from './_components/searched-shop';

export default function Search() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [ tmpState, setTmpState ] = useState(true);

    const handleSearch = () => {
        if (searchQuery) {
            router.push(`/search?query=${searchQuery}`);
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(); // 엔터 키를 누르면 handleSearch 호출
        }
    };

    return (
        <div className="w-full h-full">
            <div className='px-4 py-[18px] w-full h-15 flex items-center'>
                <button onClick={() => router.back()} className='w-6 h-6 flex justify-center items-center text-grey150'>
                    <LeftArrow/>
                </button>
                <div className='px-[14px] py-1 w-full flex justify-between items-center rounded-[20px] bg-grey850'>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가
                        className="max-w-64 w-full flex justify-start bg-inherit 
                             text-white text-body2 placeholder:text-grey650 focus:outline-none focus:ring-0 focus:border-white focus:placeholder-transparent  line-clamp-1"
                        />
                    <button onClick={handleSearch} className='text-grey150'>
                        <SearchIcon/>
                    </button>
                </div>
            </div>
            {tmpState && (
                <div className='w-full h-[calc(100dvh-60px-87px)] flex flex-col overflow-y-auto scrollbar-hide'>
                    <SearchedShop/>
                    <SearchedProduct/>
                </div>
            )}
        </div>
    )
}