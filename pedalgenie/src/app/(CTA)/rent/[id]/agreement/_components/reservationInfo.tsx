import AlertCircle from '@public/svg/rent/alert-circle.svg';
import DateDevider from '@public/svg/rent/agreement/dateDevider.svg'

export default function ReservationInfo() {
  return (
    <>
      <p className="text-title2 pb-3">예약 정보</p>
      <section className="flex-col w-full bg-darkRed text-grey150 rounded-[2px] p-4 mb-3">
        {/* 상품 이름 */}
        <p className="text-label1 pb-3">고퍼우드 일렉기타</p>
        <div className="flex gap-3">
          <p className="text-body2 text-grey450 pb-1">대여기간</p>
          <span className='flex gap-2 items-center pb-1'>
            <p className="text-body1">2024. 9. 17 - 9. 26</p>
            <DateDevider/>
            <p className="text-body1">10일</p>
          </span>
        </div>
        <div className="flex gap-3 pb-3">
          <p className="text-body2 text-grey450">픽업일정</p>
          <span className='flex gap-2 items-center'>
            <p className="text-body1">2024. 9. 17</p>
            <DateDevider/>
            <p className="text-body1">오전 11:00</p>
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
