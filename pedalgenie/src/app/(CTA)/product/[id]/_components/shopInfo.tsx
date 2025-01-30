import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useLoginStore } from '@/lib/zustand/useAuthStore';
import { useModalStore } from '@/lib/zustand/useModalStore';
import { useLikeShopMutation } from '@/hooks/useLikeShopMutation';
import Image from 'next/image';
import Time from '@public/svg/product/time.svg';
import Call from '@public/svg/product/call.svg';
import Location from '@public/svg/product/location.svg';
import LoginModal from '@/components/modal/login-modal';
import Link from 'next/link';

interface ShopHour {
  shopHoursId: number;
  dayType: string;
  openTime: string;
  closeTime: string;
  breakStartTime?: string | null;
  breakEndTime?: string | null;
}

interface ShopInfoProps {
  shopName?: string;
  shopHours?: ShopHour[];
  contactNumber?: string;
  address?: string;
  shopId?: number;
  isShopLiked?: boolean | undefined | null;
  shopImage?: string;
}

// 시간을 HH:MM 형식으로 포맷하는 함수
const formatTimeString = (time: string) => {
  return time.split(':').slice(0, 2).join(':');
};

// 휴식 시간을 포맷하는 함수 (null 고려)
const formatBreakTime = (breakStartTime?: string | null, breakEndTime?: string | null) => {
  if (breakStartTime && breakEndTime) {
    return `\n(휴식: ${formatTimeString(breakStartTime)} ~ ${formatTimeString(breakEndTime)})`;
  }
  return '';
};
// 매장 운영 시간 포맷 함수 (ShopHour 객체 전체를 받아서 처리)
const formatTime = (hour: ShopHour) => {
  const formattedOpenTime = formatTimeString(hour.openTime);
  const formattedCloseTime = formatTimeString(hour.closeTime);
  const breakTime = formatBreakTime(hour.breakStartTime, hour.breakEndTime);

  // dayType 구분하여 (평일/주말/휴일) 포맷
  let formattedDayType = '';
  if (hour.dayType === 'WEEKDAY') {
    formattedDayType = '평일';
  } else if (hour.dayType === 'WEEKEND') {
    formattedDayType = '주말';
  } else if (hour.dayType === 'HOLIDAY') {
    formattedDayType = '휴일';
  }

  return `${formattedDayType} ${formattedOpenTime} ~ ${formattedCloseTime} ${breakTime}`;
};

// [매장 운영 시간, 번호, 주소]를 위한 [이미지, 텍스트] 렌더링 컴포넌트
const ShopDetailInfo = (Img: React.ComponentType<React.SVGProps<SVGSVGElement>>, text?: string) =>
  text ? (
    <div className="flex items-start gap-2">
      <Img className="w-5 h-5" />
      <p className="text-sm text-grey250 break-words">{text}</p> {/* break-words로 텍스트가 여러 줄로 나뉘게 함 */}
    </div>
  ) : null; // text가 없을 경우 렌더링 생략

export default function ShopInfo({ shopName, shopHours, contactNumber, address, shopId, isShopLiked, shopImage }: ShopInfoProps) {
  const { toast } = useToast();
  const { isLoggedIn } = useLoginStore(); // 로그인 상태 가져오기
  const [isAnimating, setIsAnimating] = useState(false);
  const { openLoginModal } = useModalStore();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const likeMutation = useLikeShopMutation(Number(shopId), ['productDetail']);
  // 임시로 Productid

  const toggleLikeShop = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 로그인 체크
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    // shopId가 유효하지 않다면 처리하지 않음
    if (!shopId || !likeMutation) return;

    // 1) 하트 애니메이션 실행
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    // 2) 서버에 좋아요 or 취소 요청 (Optimistic Update)
    likeMutation?.mutate(!isShopLiked);
  };

  const handleCopyToast = (text: string | undefined) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({
      description: '복사가 완료되었습니다.',
    });
  };

  return (
    <>
      {/* 상점 정보 요약 섹션 */}
      <Link href={`/home/shop/description/${shopId}`}>
        <div className="flex w-full items-center p-5 border-0.5 border-grey850">
        <div className="w-full flex items-center">
            {shopImage ? (
              <Image
              src={shopImage}
              alt="상점 이미지"
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10"
              priority={true}
            />
            ) : (
              <div className="bg-grey450 w-10 h-10 rounded-full" />
            )}
            <p className="font-semibold text-white pl-3">{shopName}</p>
          </div>
          <button onClick={(e) => toggleLikeShop(e)} className="text-red">
            <Heart
              strokeWidth={1.5}
              className={`like-animation ${isShopLiked || isAnimating ? 'unscale fill-red' : ''} `}
            />
          </button>
        </div>
      </Link>

      {/* 상점 상세 정보 섹션 */}
      <section className="flex flex-col gap-1 py-5 px-4 pb-10">
      {/* 매장 운영 시간 */}
      {shopHours && shopHours.length > 0 ? (
        shopHours.map((hour, index) => (
          <div key={hour.shopHoursId} className="flex w-full">
            {/* 첫 번째 항목일 때만 이미지 렌더링 */}
            {index === 0 ? ShopDetailInfo(Time, formatTime(hour)) : (
              <div className="flex items-start gap-2">
                <span className='w-5 h-w' />
                <p className="text-sm text-grey250 break-words">{formatTime(hour)}</p> {/* 텍스트만 렌더링 */}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-sm text-grey250">운영 시간이 없습니다.</p>
      )}

      {/* 매장 번호 */}
      <span className="flex gap-2 pb-1 pt-1">
        {ShopDetailInfo(Call, contactNumber)}
        {contactNumber && !contactNumber.includes('마이페이지') && (
          <Button
            variant="copy"
            onClick={() => handleCopyToast(contactNumber)}
            className="text-center text-body2 text-sm text-red"
          >
            복사
          </Button>
        )}
      </span>

        {/* 매장 주소 */}
        <span className="flex gap-2">
          {ShopDetailInfo(Location, address)}
          <Button
            variant="copy"
            onClick={() => handleCopyToast(address)}
            className="text-center text-body2 text-sm text-red">
            복사
          </Button>
        </span>
        <LoginModal />
      </section>
    </>
  );
}
