// "use client"

import CTAHeart from '@public/svg/CTA-heart.svg';
import CTAvector from '@public/svg/CTA-vector.svg';
import Link from 'next/link';

export default function CTA() {
  // const pathname = usePathname(); // 현재 경로 가져오기
  // const [activeIndex, setActiveIndex] = useState<number>(0);

  // useEffect(() => {
  //     const currentIndex = navItems.findIndex(item => item.route === pathname);
  //     if (currentIndex !== -1) {
  //         setActiveIndex(currentIndex);
  //     }
  // }, [pathname]);
  return (
    <nav className="absolute bottom-0 w-full flex justify-between items-center pt-3 pb-6 px-[18px] border-t-[1px] border-grey750">
      <CTAHeart/>
      <div className="h-[50px] flex justify-center items-center gap-[26px] text-label1 text-white">
        <Link href={''}>대여하기</Link>
        <CTAvector/>
        <Link href={''}>시연하기</Link>
      </div>
    </nav>
  );
}
