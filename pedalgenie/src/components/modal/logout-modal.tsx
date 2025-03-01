'use client';

import { useModalStore } from '@/lib/zustand/useModalStore';
import CloseX from '@public/svg/close-x.svg';
import { Button } from '../ui/button';
import { logout } from '@/lib/api/auth';
import { useAuthStore, useLoginStore } from '@/lib/zustand/useAuthStore';

export default function LogoutModal() {
  const { isLogoutOpen, closeLogoutModal } = useModalStore();

  const handleLogout = async () => {
    await logout();
    useAuthStore.getState().setAccessToken('');
    useLoginStore.getState().setLoggedOut();
    closeLogoutModal();

    // 로그아웃 후 페이지 새로고침 - 인데 다른 로직있는지 찾아보기.
    window.location.reload();
  };

  if (!isLogoutOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeLogoutModal}>
      <div
        className="relative px-5 pt-[50px] pb-6 bg-grey850 text-center w-[90%] max-w-[320px] max-h-[276px] rounded-md shadow-lg"
        onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-5 right-5 text-grey450" onClick={closeLogoutModal}>
          <CloseX />
        </button>
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="p-0 flex flex-col justify-center items-center gap-[10px]">
            <h2 className="text-title1 text-grey150 text-center">로그아웃 할까요?</h2>
          </div>
          <div className="w-full flex justify-between items-center">
            <Button variant={'secondary'} className="w-full bg-inherit" onClick={closeLogoutModal}>
              아니요
            </Button>
            <Button variant={'secondary'} className="w-full" onClick={handleLogout}>
              네
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
