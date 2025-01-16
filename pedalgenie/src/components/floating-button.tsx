'use client';

import Floating from '@public/svg/floating.svg';
import './../app/globals.css'

type FloatingButtonProps = {
    targetSection: string;
    mainContainer: string;
};
export default function FloatingButton({ targetSection, mainContainer } : FloatingButtonProps) {

    const scrollToTop = () => {
        const goTopElement = document.getElementById(targetSection);
        const scrollTopElement = document.getElementById(mainContainer);
        if (scrollTopElement && goTopElement) {
            const scrollPosition = goTopElement.offsetTop;
            scrollTopElement.scrollTo({top: scrollPosition-100, behavior: 'smooth'});
        }
    };
    return (
        <div className='sticky bottom-10 w-full flex justify-end pr-5'>

            <button
                type="button"
                className="fade-in-up sticky bottom-10 z-50 w-11 h-11 bg-darkRed text-red rounded-full shadow-md flex items-center justify-center"
                onClick={scrollToTop}
            >
                <Floating/>
            </button>
        </div>
    );
}