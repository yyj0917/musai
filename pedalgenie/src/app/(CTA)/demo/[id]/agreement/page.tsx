import TopBar from '../_components/topBar';
import DemoReservationInfo from './_components/demoReservationInfo';
import NoticeSection from '@/app/(CTA)/rent/[id]/agreement/_components/noticeSection';
import AgreementSection from '@/app/(CTA)/rent/[id]/agreement/_components/agreementSection';
import PaymentSummary from '@/app/(CTA)/rent/[id]/_components/paymentSummary';

// ProductDetail의 상품명
// 대여 기간, 픽업 일정

export default function Agreement({ params }: { params: { id: number } }) {
  const { id } = params; // 파라미터로 받아온 ProductId 값

  return (
    <div className="w-full flex flex-col text-grey250 font-pretendard ">
      <TopBar />
      <div className="w-full h-[calc(100vh-50px)] overflow-y-auto scroll-smooth scrollbar-hide ">
        <div className="p-4 border-b-0.5 border-grey850">
          <DemoReservationInfo productId={id} />
          <span className="flex justify-between w-full text-red text-title1 pt-3 pb-1">
            <p>
            금액
            </p>
            <p>
            무료
            </p>
          </span>
        </div>
        <div className="p-4">
          <NoticeSection />
          <AgreementSection id={id} />
        </div>
      </div>
    </div>
  );
}
