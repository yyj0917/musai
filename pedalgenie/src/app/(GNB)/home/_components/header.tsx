'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';
import Search from '@public/svg/search.svg';
import MainLogo from '@public/svg/main-union.svg';
import LeftArrow from '@public/svg/home/shop/shop-leftarrow.svg';
import { useScrollStore } from '@/lib/zustand/useScrollStore';

export default function Header() {
  const link = [
    { name: '제품', href: '/home' },
    { name: '매장', href: '/home/shop' },
  ];
  const router = useRouter();
  const pathname = usePathname();

  const isHeaderVisible = useScrollStore((state) => state.isHeaderVisible);

  const isStoreDetailPage = pathname.startsWith('/home/shop/description');
  const isArticleDetailPage = pathname.startsWith('/home/article');
  const isSearchedPage = pathname.startsWith('/home/search');
  // ${isHeaderVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}

  // 검색 페이지라면 헤더를 렌더링하지 않음
  if (isSearchedPage) {
    return null;
  }
  return (
    <header
      id="main-header"
      className={`w-full flex flex-col transition-transform duration-300 ease-in-out  
      
        `}>
      {isStoreDetailPage || isArticleDetailPage ? (
        <div className="px-4 py-[18px] w-full flex justify-start">
          <button onClick={() => router.back()} className="text-grey150">
            <LeftArrow />
          </button>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between items-center px-4 py-3 text-grey250">
            {/* Home button */}
            <Link href={'/'}>
              <MainLogo />
            </Link>
            {/* 검색페이지 이동 */}
            <Link href={'/home/search'}>
              <Search />
            </Link>
          </div>
          <div className="pl-4 flex gap-4 text-head1 border-b-[0.5px] border-grey750">
            {link.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="link" href={link.href}>
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>
        </>
      )}
    </header>
  );
}
