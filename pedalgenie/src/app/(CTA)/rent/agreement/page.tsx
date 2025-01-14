import TopBar from './../_components/topBar';
import ReservationInfo from './_components/reservationInfo';
import NoticeSection from './_components/noticeSection';
import AgreementSection from './_components/agreementSection';
import PriceSummary from '../_components/paymentSummary';

export default function Agreement() {
  return (
    <div className="w-full flex flex-col text-grey250 font-pretendard">
      <TopBar />
      <div className='p-4 border-b-0.5 border-grey850'>
        <ReservationInfo />
        <PriceSummary />
      </div>
      <div className='p-4'>
        <NoticeSection />
        <AgreementSection/>
      </div>
    </div>
  );
}
