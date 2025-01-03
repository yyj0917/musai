'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Search from '@public/svg/search.svg';
import MainLogo from '@public/svg/main-logo.svg';
import LeftArrow from '@public/svg/home/shop/shop-leftarrow.svg';

export default function Header() {
  const link = [
    { name: '제품', href: '/home' },
    { name: '매장', href: '/home/shop' },
  ];
  const router = useRouter();
  const pathname = usePathname();

  const isStoreDetailPage = pathname.startsWith('/home/shop/description');
  const isArticleDetailPage = pathname.startsWith('/home/article');
  const isSaveListPage = pathname.startsWith('/saveList');

  return (
    <header className="w-full flex flex-col">
      {isStoreDetailPage || isArticleDetailPage ? (
        <div className="px-4 py-[18px] w-full flex justify-start">
          <button onClick={() => router.back()} className="text-grey150">
            <LeftArrow />
          </button>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between items-center px-4 py-3 text-grey250">
            <Link href={'/'}>
              <MainLogo />
            </Link>
            {!isSaveListPage && (
              <Search />
            )}
          </div>
          <div className="pl-4 flex gap-4 text-head1 border-b-[0.5px] border-grey750">
            {link.map((link) => (
              <Button key={link.href} variant="link" asChild href={link.href}>
                <Link href={link.href}>{link.name}</Link>
              </Button>
            ))}
          </div>
        </>
      )}
    </header>
  );
}
