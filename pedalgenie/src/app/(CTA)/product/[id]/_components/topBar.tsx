'use client'

import { useRouter } from 'next/navigation';
import LeftArrow from '@public/svg/product/left-arrow.svg';

export default function TopBar() {
  const router = useRouter(); // Next.js의 useRouter 훅 사용

  const handleGoBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <div className="flex w-full py-[18px] px-4">
      <button onClick={handleGoBack}>
        <LeftArrow />
      </button>
    </div>
  );
}
