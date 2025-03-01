'use client';

import { useEffect } from 'react';
import { useScrollStore } from '@/lib/zustand/useScrollStore';
import './../../../globals.css';
import { usePathname } from 'next/navigation';

export default function Gradient() {
  const { isGradientVisible, setGradientVisible } = useScrollStore();
  const pathname = usePathname();
  // 제일 상단에서만 그라데이션 보이게 하기
  useEffect(() => {
    const mainElement = document.getElementById('main');
    if (!mainElement) return;

    const handleScroll = () => {
      const scrollY = mainElement.scrollTop;

      if (scrollY === 0) {
        setGradientVisible(true); // 스크롤이 맨 위에 있을 때 보이게 설정
      } else {
        setGradientVisible(false); // 스크롤이 내려가면 숨기기
      }
    };

    mainElement.addEventListener('scroll', handleScroll);

    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, [setGradientVisible]);

  // 현재 경로 확인

  // /home 경로가 아닌 경우 그라데이션을 렌더링하지 않음
  if (pathname !== '/home') {
    return null;
  }

  // 그라데이션 fade-out 효과 줘야 함.
  if (!isGradientVisible) return null;

  return (
    <div
      className={`pointer-events-none z-5 after:opacity-100 absolute w-[684px] h-[684px] right-[-292px] top-[-291px] rounded-full transition-opacity duration-500 ease-in-out
          ${isGradientVisible ? 'fade-in' : 'fade-out'}`}
      style={{
        background:
          'radial-gradient(46.63% 46.63% at 50% 50%, rgba(139, 37, 44, 0.20) 2.48%, rgba(206, 55, 138, 0.01) 74.11%, rgba(241, 64, 76, 0.00) 100%)',
      }}></div>
  );
}
