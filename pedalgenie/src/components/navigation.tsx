'use client';

import Home from '@public/svg/home.svg';
import Calendar from '@public/svg/calendar.svg';
import Heart from '@public/svg/heart.svg';
import Profile from '@public/svg/profile.svg';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type NavItem = {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  route: string;
};

const navItems: NavItem[] = [
  { id: 0, icon: Home, text: '홈', route: '/home' },
  { id: 1, icon: Calendar, text: '예약현황', route: '/reserve' },
  { id: 2, icon: Heart, text: '좋아요', route: '/saveList/product' },
  { id: 3, icon: Profile, text: '마이페이지', route: '/mypage' },
];

export default function Navigation() {
    const pathname = usePathname(); // 현재 경로 가져오기
    // 초기 상태 계산
    const initialIndex = navItems.findIndex((item) => 
        pathname === item.route || pathname.startsWith(item.route)
    );
    const [activeIndex, setActiveIndex] = useState<number>(initialIndex);

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.route === pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [pathname]);
  return (
    <nav className="absolute bottom-0 w-full flex justify-center items-center pt-3 pb-6 px-[18px] border-t-[1px] border-grey750 bg-grey1000">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.route}
            className={`h-[50px] flex flex-1 flex-col items-center gap-1 ${
              activeIndex === item.id ? 'text-white' : 'text-grey250 opacity-[0.5]'
            }`}>
            <Icon />
            <p className="w-15 text-caption1">{item.text}</p>
          </Link>
        );
      })}
    </nav>
  );
}
