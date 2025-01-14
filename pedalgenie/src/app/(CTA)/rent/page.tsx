import Calendar from "./_components/calendar";
import TimePicker from "./_components/timePicker";
import TopBar from "./_components/topBar";
import PriceSummary from './_components/priceSummary'
import AlertCircle from '@public/svg/rent/alert-circle.svg';

export default function Rent() {
  return (
    <div className="w-full flex flex-col text-grey250 font-pretendard">
      <TopBar />
      <section className="p-4">
        <div className="text-title2 pb-3">대여 기간</div>
        <Calendar />
        <p className="flex w-full pt-5 text-body2 text-red gap-1.5 pb-">
        <AlertCircle />대여 기간은 최소 3일 이상부터 가능합니다</p>
        <PriceSummary/>
      </section>
      <section className="p-4 border-t-0.5 border-grey850">
        <TimePicker />
      </section>
    </div>
  );
}