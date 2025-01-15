'use client';

import Floating from '@public/svg/floating.svg';

export default function FloatingButton() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 부드러운 스크롤 효과
        });
    };
    return (
        <button
            type="button"
            className="w-11 h-11 bg-darkRed text-red rounded-full shadow-md flex items-center justify-center"
            onClick={scrollToTop}
        >
            <Floating/>
        </button>
    );
}