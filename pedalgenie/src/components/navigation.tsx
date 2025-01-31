'use client';

import Home from '@public/svg/GNB/home.svg';
import HomeClick from '@public/svg/GNB/home-click.svg';
import Reserve from '@public/svg/GNB/reserve.svg';
import ReserveClick from '@public/svg/GNB/reserve-click.svg';
import Heart from '@public/svg/GNB/heart.svg';
import Profile from '@public/svg/GNB/profile.svg';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import LoginModal from './modal/login-modal';

type NavItem = {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  clickedIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  route: string;
  // 로그인 필요한 페이지
  requiresAuth?: boolean;
};

const navItems: NavItem[] = [
  { id: 0, icon: Home, clickedIcon: HomeClick, text: '홈', route: '/home' },
  { id: 1, icon: Reserve, clickedIcon: ReserveClick, text: '내 예약', route: '/reservation/demo', requiresAuth: true },
  { id: 2, icon: Heart, text: '좋아요', route: '/saveList/product', requiresAuth: true },
  { id: 3, icon: Profile, text: '마이페이지', route: '/mypage' },
];

export default function Navigation() {
  const pathname = usePathname(); // 현재 경로 가져오기
  const { isLoggedIn } = useLoginStore(); // 로그인 상태 가져오기
  const { isLoginOpen, openLoginModal } = useModalStore(); // 로그인 모달 상태 가져오기
  // 초기 상태 계산
  const initialIndex = navItems.findIndex((item) => pathname === item.route || pathname.startsWith(item.route));
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.route === pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [pathname]);

  // GNB 없는 곳에서는 null 반환
  if (
    pathname.startsWith('/home/article') ||
    pathname.startsWith('/home/shop/description') ||
    pathname.startsWith('/mypage/reservation')
  )
    return null;

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, requiresAuth?: boolean) => {
    if (requiresAuth && !isLoggedIn) {
      e.preventDefault(); // Prevent navigation
      openLoginModal(); // Open login modal
    }
  };
  return (
    <nav className="absolute bottom-0 w-full flex justify-center items-center pt-3 pb-6 px-[10px] border-t-[1px] border-grey850 bg-grey1000">
      {navItems.map((item) => {
        const Icon = item.icon;
        
        if (item.clickedIcon) {
          const ClickedIcon = item.clickedIcon;
          return (
            <Link
              key={item.id}
              href={item.route}
              onClick={(e) => handleNavigation(e, item.requiresAuth)}
              className={`max-h-[50px] flex flex-1 flex-col justify-center items-center gap-1 ${
                activeIndex === item.id ? 'text-red' : 'text-grey650 '
              }`}>
              {activeIndex === item.id ? <ClickedIcon /> : <Icon />}
              <p className="w-15 text-caption1 text-center">{item.text}</p>
            </Link>
          );
        }

        return (
          <Link
            key={item.id}
            href={item.route}
            onClick={(e) => handleNavigation(e, item.requiresAuth)}
            className={`max-h-[50px] flex flex-1 flex-col justify-center items-center gap-1 ${
              activeIndex === item.id ? 'text-red' : 'text-grey650 '
            }`}>
            {activeIndex === item.id ? <Icon className='fill-red'/> : <Icon/>}
            <p className="w-15 text-caption1 text-center">{item.text}</p>
          </Link>
        );
      })}
      {isLoginOpen && <LoginModal />}
    </nav>
  );
}
