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
    <nav className="bg-grey1000 absolute bottom-0 w-full flex justify-between items-center pt-3 pb-[50px] px-[20px] border-t-[1px] border-grey750 font-pretendard">
      <CTAHeart/>
      <div className="flex justify-center items-center gap-[26px] text-label1 text-grey250">
        <Link href={'/rent'}>대여 예약하기</Link>
        <CTAvector/>
        <Link href={''}>시연 예약하기</Link>
      </div>
    </nav>
  );
}
