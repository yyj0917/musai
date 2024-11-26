import { Button } from '@/components/ui/button';
import Search from '@public/svg/search.svg';
import Link from 'next/link';
import Article from './_components/article';
import Item from './_components/item';
import { Suspense } from 'react';
import ProductSection from './_components/product-section';


export default function Home() {
  const link = [
    { name: '제품', href: '/home' },
    { name: '매장', href: '/home/store' },
  ]
  return (
    <div className="w-full flex flex-col">
      {/* Scroll시 고정되어 있는 header */}
      <header className="w-full flex flex-col">
        <div className='w-full flex justify-between items-center px-4 pt-2'>
          <span className="text-ivory text-logo font-outfit">MUSAI</span>
          <Search className="text-grey250" />
        </div>
        <div className='mt-3 pl-4 flex gap-4 text-head1 border-b-[0.5px] border-grey750'>
          {link.map((link) => (
            <Button
              key={link.href}
              variant="link"
              asChild
              href={link.href}>
              <Link href={link.href}>
                {link.name}
              </Link>
            </Button>
        ))}
        </div>
      </header>
      <main className='w-full h-[calc(100vh-88.5px-87px)] overflow-y-auto scroll-smooth scrollbar-hide'>
        {/* article이 들어갈 section */}
        <section className='mt-5 pl-4'>
          <p className='text-title1 text-grey250'>오늘의 밴드 이야기</p>
          <div className='mt-3 w-full h-[300px] flex gap-[10px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide'>
            <Suspense fallback={<Article />}>
                <Article/>
                <Article/>
            </Suspense>
          </div>
        </section>
        {/* 시연가능한 제품(기준미정) section */}
        <section className='mt-11 pl-4'>
          <div className='pr-4 w-full flex justify-between items-center'>
            <p className='text-title1 text-grey250'>시연해볼 수 있는 [ 실리카겔 ]</p>
            <Button variant='ghost' asChild>
              <Link href='/home'>더보기</Link>
            </Button>
          </div>
          <div className='mt-3 w-full h-[300px] flex gap-[10px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide'>
            <Suspense fallback={<Item/>}>
                <Item/>
                <Item/>
                <Item/>
            </Suspense>
          </div>
        </section>
        {/* 전체 제품들 카테고리, 앵커링할 section */}
        <section className='mt-11'>
          <ProductSection/>
        </section>
      </main>
    </div>
  );
}
