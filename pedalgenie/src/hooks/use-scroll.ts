import { useEffect, useCallback, useRef } from 'react';
import { throttle } from 'lodash';
import { useModalStore } from '@/lib/zustand/useModalStore';

const SCROLL_DELTA = 50; // 스크롤 변화량 기준

interface UseScrollToggleOptions {
  containerId: string; // 스크롤 이벤트를 감지할 컨테이너 ID
  throttleTime?: number; // 스로틀링 간격 (기본값: 200ms)
}

// Floating Button 토글 훅
export function useScrollToggle({ containerId, throttleTime = 200 }: UseScrollToggleOptions) {
  const { setFloatingButton } = useModalStore();
  const scrollYRef = useRef(0); // 이전 스크롤 위치 저장

  const handleScroll = useCallback(
    throttle(() => {
      const container = document.querySelector(`#${containerId}`);
      if (!container) return;

      const currentScrollTop = container.scrollTop;

      // 스크롤 내릴 때 상태 변경
      if (currentScrollTop > scrollYRef.current + SCROLL_DELTA) {
        setFloatingButton(true);
      }
      // 스크롤 올릴 때 상태 변경
      if (currentScrollTop < scrollYRef.current - SCROLL_DELTA) {
        setFloatingButton(false);
      }

      scrollYRef.current = currentScrollTop; // 현재 스크롤 위치 업데이트
    }, throttleTime),
    [containerId, throttleTime]
  );

  useEffect(() => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [containerId, handleScroll]);
}
