import { useModalStore } from '@/lib/zustand/useModalStore';
import CloseX from '@public/svg/close-x.svg';
import KakaoLogin from '@public/svg/kakao-login.svg';
import Link from 'next/link';

export default function LoginModal() {
  const { isLoginOpen, closeLoginModal } = useModalStore();

  if (!isLoginOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeLoginModal}>
      <div
        className="relative px-5 pt-[50px] pb-6 bg-grey850 text-center w-[90%] max-w-[320px] max-h-[276px] rounded-md shadow-lg"
        onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-5 right-5 text-grey450" onClick={closeLoginModal}>
          <CloseX />
        </button>
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="p-0 flex flex-col justify-center items-center gap-[10px]">
            <h2 className="text-title1 text-grey150 flex flex-col">
              <span>더 깊이있는 경험을 위해서는</span>
              <span>계정이 필요해요</span>
            </h2>
            <p className="text-body2 text-grey450 flex flex-col">
              <span>로그인하고 시연과 대여를 예약해보세요</span>
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <Link
              href={'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=4f97631922bbf2a7c3eda830dd68f0bf&redirect_uri=http://localhost:8080/auth/kakao/callback'}
              >
              <KakaoLogin />
            </Link>
            <button onClick={() => alert('로그인')} className="w-full h-11 text-white text-body1">
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
