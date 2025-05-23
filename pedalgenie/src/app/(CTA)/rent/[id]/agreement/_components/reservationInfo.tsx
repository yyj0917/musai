'use client';

import AlertCircle from '@public/svg/rent/alert-circle.svg';
import DateDevider from '@public/svg/rent/agreement/dateDevider.svg';
import { useSearchParams } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { ProductDetail } from '@/types/product-detail-type';

type ReservationInfoProps = {
  productId: number;
};

export default function ReservationInfo({ productId }: ReservationInfoProps) {
  const searchParams = useSearchParams();
  const startDateParam = searchParams.get('StartDate'); // 2025-09-17
  const endDateParam = searchParams.get('EndDate');
  const pickUpTimeParam = searchParams.get('pickUpTime'); // 14:30
  const rentDurationParam = searchParams.get('rentDuration'); // '4'

  // 대여 기간 기본값 설정
  let rentDuration = 0;
  // 대여 기간 불러오기
  if (rentDurationParam) {
    rentDuration = parseInt(rentDurationParam, 10);
  }

  // 날짜 변환 처리
  const startDate = startDateParam ? parseISO(startDateParam) : null;
  const endDate = endDateParam ? parseISO(endDateParam) : null;

  const formattedStartDate = startDate ? format(startDate, 'yyyy. M. d') : '날짜 없음';
  const formattedEndDate = endDate ? format(endDate, 'M. d') : '날짜 없음';

  // pickUpTime을 오전/오후 형식으로 변환
  const convertTimeFormat = (time: string | null) => {
    if (!time) return '시간 없음';
    const [hour, minute] = time.split(':').map(Number);
    const period = hour < 12 ? '오전' : '오후';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // 12시간제 변환 (0시는 12시로)
    return `${period} ${formattedHour}:${minute.toString().padStart(2, '0')}`;
  };

  const formattedPickUpTime = convertTimeFormat(pickUpTimeParam);

  // ProductDetail에서 productName 추출
  const {
    data: productDetail,
    isLoading,
    isError,
  } = useQuery<ProductDetail>({
    queryKey: ['productDetail', productId], // 캐싱 키
  });
  const productName = productDetail?.name || '상품명 없음'; // 데이터가 없을 때 기본값 처리

  return (
    <>
      <p className="text-title2 pb-3">예약 정보</p>
      <section className="flex-col w-full bg-darkRed text-grey150 rounded-[2px] p-4 mb-3">
        {/* 상품 이름 */}
        <p className="text-label1 pb-3">{productName}</p>
        <div className="flex gap-3">
          <p className="text-body2 text-grey450 pb-1">대여기간</p>
          <span className="flex gap-2 items-center pb-1">
            <p className="text-body1">
              {formattedStartDate} - {formattedEndDate}
            </p>
            <DateDevider />
            <p className="text-body1">{rentDuration}일</p>
          </span>
        </div>
        <div className="flex gap-3 pb-3">
          <p className="text-body2 text-grey450">픽업일정</p>
          <span className="flex gap-2 items-center">
            <p className="text-body1">{formattedStartDate}</p>
            <DateDevider />
            <p className="text-body1">{formattedPickUpTime}</p>
          </span>
        </div>
        <p className="flex text-caption1 gap-1 text-red">
          <AlertCircle />
          반납은 매장 마감 시간 1시간 전까지 해주세요
        </p>
      </section>
    </>
  );
}
