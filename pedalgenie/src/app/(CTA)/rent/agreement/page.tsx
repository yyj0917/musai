import TopBar from '../[id]/_components/topBar';
import ReservationInfo from './_components/reservationInfo';
import NoticeSection from './_components/noticeSection';
import AgreementSection from './_components/agreementSection';
import PaymentSummary from '../[id]/_components/paymentSummary';

// ProductDetail의 상품명
// 대여 기간, 픽업 일정

export default function Agreement() {
  return (
    <div className="w-full flex flex-col text-grey250 font-pretendard ">
      <TopBar />
      <div className="w-full h-[calc(100vh-50px)] overflow-y-auto scroll-smooth scrollbar-hide ">
        <div className="p-4 border-b-0.5 border-grey850">
          <ReservationInfo />
          <PaymentSummary />
        </div>
        <div className="p-4">
          <NoticeSection />
          <AgreementSection />
        </div>
      </div>
    </div>
  );
}
