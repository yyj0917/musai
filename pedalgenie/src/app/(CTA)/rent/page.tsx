import Calendar from "./_components/calendar";
import PeriodDisplayer from "./_components/periodDisplayer";
import TimePicker from "./_components/timePicker";
import TopBar from "./_components/topBar";

export default function Rent() {
    return (
        <div className="w-full flex flex-col text-grey250 font-pretendard">
            <TopBar/>
            <section className="p-4">
                <div className="text-white font-medium text-lg pb-6">대여 시작일과 종료일을 선택해주세요</div>
                <Calendar/>
                <PeriodDisplayer/>
                <div className="text-white font-medium text-lg pb-5 border-t-[1px] border-grey850 pt-5">픽업 시간을 선택해주세요</div>
                <TimePicker/>
            </section>
        </div>
    );
}