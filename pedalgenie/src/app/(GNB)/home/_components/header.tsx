'use client'

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Search from '@public/svg/search.svg';
import MainLogo from '@public/svg/main-logo.svg';
import LeftArrow from '@public/svg/home/shop/shop-leftarrow.svg';

export default function Header() {
    const link = [
        { name: '제품', href: '/home' },
        { name: '매장', href: '/home/shop' },
      ]
    const pathname = usePathname();

    const isStoreDetailPage = pathname.startsWith('/home/shop/description');


    return (
        <header className="w-full flex flex-col">
          {isStoreDetailPage ? (
            <div className="px-4 py-[18px] w-full flex justify-start">
              <Link href="/home/shop" className="text-grey150">
                <LeftArrow/>
              </Link>
            </div>
            ) :
            (
              <>
                <div className='w-full flex justify-between items-center px-4 py-3 text-grey250'>
                  <Link href={"/"}>
                    <MainLogo/>
                  </Link>
                  <Search/>
                </div>
                <div className='pl-4 flex gap-4 text-head1 border-b-[0.5px] border-grey750'>
                  {link.map((link) => (
                    <Button
                      key={link.href}
                      variant="link"
                      asChild
                      href={link.href}
                      >
                      <Link href={link.href}>
                        {link.name}
                      </Link>
                    </Button>
                ))}
                </div>
              </>

            )}
      </header>
      );
}