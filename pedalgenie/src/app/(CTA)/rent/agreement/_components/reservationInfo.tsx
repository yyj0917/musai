import AlertCircle from '@public/svg/rent/alert-circle.svg';

export default function ReservationInfo() {
  return (
    <>
      <p className="text-title2 pb-3">예약 정보</p>
      <section className="flex-col w-full bg-darkRed text-grey150 rounded-[2px] p-4 mb-3">
        {/* 상품 이름 */}
        <p className="text-label1 pb-3">고퍼우드 일렉기타</p>

        <div className="flex justify-between">
          <p className="text-body2 text-grey450 pb-1">대여기간</p>
          <p className="text-body1">2024년 9월 17일 ~ 9월 26일</p>
        </div>
        <div className="flex justify-between pb-3">
          <p className="text-body2 text-grey450">픽업일정</p>
          <p className="text-body1">2024년 9월 17일</p>
        </div>
        <p className="flex text-caption1 gap-1 text-red">
          <AlertCircle />
          반납은 매장 마감 시간 1시간 전까지 해주세요
        </p>
      </section>
    </>
  );
}
