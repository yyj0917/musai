import Calendar from "./_components/calendar";
import PeriodDisplayer from "./_components/periodDisplayer";
import TimePicker from "./_components/timePicker";
import TopBar from "./_components/topBar";

export default function Rent() {
  return (
    <div className="w-full flex flex-col text-grey250 font-pretendard">
      <TopBar />
      <section className="p-4">
        <div className="text-white font-medium text-lg pb-6">대여 시작일과 종료일을 선택해주세요</div>
        <Calendar />
        <TimePicker />
      </section>
    </div>
  );
}