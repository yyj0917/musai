import Calendar from "./_components/calendar";
import TimePicker from "./_components/timePicker";
import TopBar from "./_components/topBar";
import AlertCircle from '@public/svg/rent/alert-circle.svg';

export default function Rent() {
  return (
    <div className="w-full h-full flex flex-col bg-grey1000 text-grey250 font-pretendard">
      <TopBar />
      <div className="w-full h-[calc(100vh-50px)] overflow-y-auto scroll-smooth scrollbar-hide ">
      <div className="p-4">
        <div className="text-title2 pb-3">시연 날짜</div>
        <Calendar />
      </div>
      <section className="w-full p-4 border-t-0.5 border-grey850">
        <TimePicker />
      </section> 
      </div>
    </div>
  );
}
