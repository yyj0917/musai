'use client';

import Floating from '@public/svg/floating.svg';
import './../app/globals.css'
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useEffect, useState } from 'react';

type FloatingButtonProps = {
    scrollContainer: string;
};
export default function FloatingButton({ scrollContainer } : FloatingButtonProps) {
    const { isFloatingButton, setFloatingButton } = useModalStore();
    const [shouldRender, setShouldRender] = useState(true); // 렌더링 여부

    const scrollToTop = () => {
        const scrollTopElement = document.getElementById(scrollContainer);
        if (scrollTopElement) {
            // 이거 상댓값으로 수정 필요함
            scrollTopElement.scrollTo({top: 0, behavior: 'smooth'});
        }
    };
    // Floating Button을 사용하는 각 컴포넌트에서 Floating Button state를
    // 독립적으로 관리하기 위한 초기화 로직
    useEffect(() => {
        // 컴포넌트가 마운트될 때 상태 초기화
        setFloatingButton(false);
    }, [setFloatingButton]);

    useEffect(() => {
        if (!isFloatingButton) {
          // fade-out 완료 후 렌더링 중지
          const timeout = setTimeout(() => setShouldRender(false), 300); // fade-out 시간
          return () => clearTimeout(timeout);
        } else {
          setShouldRender(true); // fade-in 즉시 렌더링
        }
      }, [isFloatingButton]);

    return shouldRender ? (
        <div className='absolute bottom-5 w-full flex justify-end pr-5'>
            <button
                type="button"
                className={`sticky bottom-10 z-50 w-11 h-11 bg-darkRed text-red rounded-full shadow-md flex items-center justify-center
                    ${isFloatingButton ? 'fade-in-up' : 'fade-out-down'}
                `}
                onClick={scrollToTop}
            >
                <Floating/>
            </button>
        </div>
    ): null;
}