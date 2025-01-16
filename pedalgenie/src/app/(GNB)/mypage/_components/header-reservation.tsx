'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';
import LeftArrow from '@public/svg/home/shop/shop-leftarrow.svg';

export default function ReservationHeader() {
  const link = [
    { name: '시연', href: '/mypage/reservation/demo' },
    { name: '대여', href: '/mypage/reservation/rent' },
  ];
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로를 가져옴

// 예약 상세내역인지 확인 (preview/[id] 또는 rent/[id] 경로 포함)
    const isDetailPage =
        pathname.includes('/mypage/reservation/demo/') ||
        pathname.includes('/mypage/reservation/rent/');
    return (
        <header className='w-full flex flex-col'>
            <div className="px-4 py-[18px] w-full flex justify-start items-center text-grey150">
                <div className='relative w-full flex justify-center text-label1'>
                    <p>{isDetailPage ? '예약 상세내역' : '예약 내역'}</p>
                    <button onClick={() => router.back()} className="absolute left-0 flex justify-center items-center w-6 h-6">
                        <LeftArrow />
                    </button>
                </div>
            </div>
            {/* 예약 상세내역이 아니면 링크 표시 */}
            {!isDetailPage && (
                <div className="pl-4 flex gap-4 text-head1 border-b-[0.5px] border-grey750">
                {link.map((link) => (
                    <Button key={link.href} variant="link" asChild href={link.href}>
                    <Link href={link.href}>{link.name}</Link>
                    </Button>
                ))}
                </div>
            )}
        </header>
  );
}
