import Time from '@public/svg/product/time.svg';
import Call from '@public/svg/product/call.svg';
import Location from '@public/svg/product/location.svg';
import Heart from '@public/svg/product/heart.svg';

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

  // dayType 구분하여 (평일/주말) 포맷
  const formattedDayType = hour.dayType === 'WEEKDAY' ? '평일' : '주말';

  return `${formattedDayType} ${formattedOpenTime} ~ ${formattedCloseTime} ${breakTime}`;
};

// [매장 운영 시간, 번호, 주소]를 위한 [이미지, 텍스트] 렌더링 컴포넌트
const ShopDetailInfo = (Img: React.ComponentType<React.SVGProps<SVGSVGElement>>, text?: string) => (
  text ? (
    <div className="flex w-full items-center">
      <Img />
      <p className="text-sm text-grey250 pl-1">{text}</p>
    </div>
  ) : null // text가 없을 경우 렌더링 생략
);

export default function ShopInfo({ shopName, shopHours, contactNumber, address }: ShopInfoProps) {
  return (
    <div>
      {/* 상점 정보 요약 섹션 */}
      <section>
        <div className="flex w-full items-center p-5 border-0.5 border-grey850">
          <div className="w-full flex items-center">
            <div className="bg-grey450 w-10 h-10 rounded-full"> </div> {/* 매장 이미지 */}
            <p className="font-semibold text-white pl-3">{shopName}</p> {/* 매장 이름 */}
          </div>
          <Heart /> {/* 하트 아이콘 */}
        </div>
      </section>

      {/* 상점 상세 정보 섹션 */}
      <section className="w-full flex flex-col gap-2 py-5 px-4">
        {/* 매장 운영 시간 */}
        {shopHours && shopHours.length > 0 ? (
          shopHours.map((hour) => (
            <div key={hour.shopHoursId} className="flex w-full">
              {ShopDetailInfo(Time, formatTime(hour))}
            </div>
          ))
        ) : (
          <p className="text-sm text-grey250">운영 시간이 없습니다.</p>
        )}

        {/* 매장 번호 */}
        {ShopDetailInfo(Call, contactNumber)}

        {/* 매장 주소 */}
        {ShopDetailInfo(Location, address)}
      </section>
    </div>
  );
}
