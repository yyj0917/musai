'use client';

import { useRouter } from 'next/navigation';
import LeftArrow from '@public/svg/home/shop/shop-leftarrow.svg';

export default function TopBar() {
  const router = useRouter(); // Next.js의 useRouter 훅 사용

  const handleGoBack = () => {
    router.push('/home');
  };

  return (
    <div className="flex w-full py-[18px] px-4">
      <button onClick={handleGoBack}>
        <LeftArrow />
      </button>
    </div>
  );
}
