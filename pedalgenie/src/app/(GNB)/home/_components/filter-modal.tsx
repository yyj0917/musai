// components/FilterModal.tsx

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import Check from '@public/svg/home/check.svg';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterType: 'name' | 'condition' | 'detail'; // 필터 타입 지정
}

export default function FilterModal({ isOpen, onClose, filterType }: FilterModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isOpen || !isBrowser) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50" onClick={handleClose}>
      <div
        className="bg-grey850 px-4 pt-5 pb-[38px] rounded-t-2xl rounded-b-none w-[375px] transition-transform duration-300 transform translate-y-0"
        onClick={(e) => e.stopPropagation()} // 모달 안쪽 클릭 시 닫히지 않도록
        style={{ animation: `${isOpen ? 'slideUp' : ''} 0.3s ease-in-out` }}
      >
        {/* 필터 타입에 따라 다른 모달 내용 렌더링 */}
        {filterType === 'name' && (
          <div className='w-full flex flex-col items-start gap-6'>
            <h2 className="!text-title1 text-white">정렬 기준</h2>
            <div className='w-full flex flex-col items-start gap-4'>
                <Button variant={'ghost'} className='!text-label2 text-grey550'>이름순</Button>
                <Button variant={'ghost'} className='!text-label2 text-grey550'>좋아요순</Button>
                <Button variant={'ghost'} className='!text-label2 text-grey550'>최신순</Button>
            </div>
          </div>
        )}
        {filterType === 'condition' && (
          <div className='w-full flex flex-col items-start gap-6'>
            <h2 className="text-title1 !text-white">이용 조건</h2>
            <span className='w-full flex justify-between items-center text-grey550'>
                <Button variant={'ghost'} className='!text-label2 text-grey550'>시연 가능</Button>
                <Check/>
            </span>
            <span className='w-full flex justify-between items-center text-grey550'>
                <Button variant={'ghost'} className='!text-label2 text-grey550'>대여 가능</Button>
                <Check/>
            </span>
            <span className='w-full flex justify-between items-center text-grey550'>
                <Button variant={'ghost'} className='!text-label2 text-grey550'>구매 가능</Button>
                <Check/>
            </span>
            <div className='w-full flex gap-[10px]'>
                <Button variant={'custom'} className='flex-1 bg-grey750'>초기화</Button>
                <Button variant={'custom'} className='flex-1 bg-black'>확인</Button>
            </div>
          </div>
        )}
        {filterType === 'detail' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">세부 종류</h2>
            <button className="block w-full py-2">일반 기타</button>
            <button className="block w-full py-2">어쿠스틱 기타</button>
            <button className="block w-full py-2">클래식 기타</button>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
