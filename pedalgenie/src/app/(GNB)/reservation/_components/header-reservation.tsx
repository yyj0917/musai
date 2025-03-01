'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import LeftArrow from '@public/svg/home/shop/shop-leftarrow.svg';
import Link from 'next/link';

export default function ReservationHeader() {
  const link = [
    { name: '시연', href: '/reservation/demo' },
    { name: '대여', href: '/reservation/rent' },
  ];
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로를 가져옴

  // 예약 상세내역인지 확인 (preview/[id] 또는 rent/[id] 경로 포함)
  const isDetailPage = pathname.includes('/reservation/demo/') || pathname.includes('/reservation/rent/');
  return (
    <header className="w-full flex flex-col">
      {/* 예약 상세내역이면 헤더 표시 */}
      {isDetailPage && (
        <div className="px-4 py-[18px] w-full flex justify-start items-center text-grey150">
          <div className="relative w-full flex justify-center text-label1">
            <p>예약 상세내역</p>
            <button onClick={() => router.back()} className="absolute left-0 flex justify-center items-center w-6 h-6">
              <LeftArrow />
            </button>
          </div>
        </div>
      )}

      {/* 예약 상세내역이 아니면 링크 표시 */}
      {!isDetailPage && (
        <div className="pl-4 flex gap-4 text-head1 border-b-[0.5px] border-grey750">
          {link.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="link" href={link.href}>
                {link.name}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
