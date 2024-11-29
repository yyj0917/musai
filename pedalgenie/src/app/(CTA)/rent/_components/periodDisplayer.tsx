export default function PeriodDisplayer({  }) {
    return (
        <section className="flex w-full justify-between space-x-[10px] pb-7">
            <div className="flex flex-col items-center w-full pt-3 bg-grey850 rounded">
                <p className="font-semibold text-sm text-grey550 pb-2">시작일</p>
                <p className="font-semibold text-white pb-3">2024년 9월 17일</p>
            </div>
            <div className="flex flex-col items-center w-full pt-3 bg-grey850 rounded">
                <p className="font-semibold text-sm text-grey550 pb-2">종료일</p>
                <p className="font-semibold text-white pb-3">2024년 9월 26일</p>
            </div>
        </section>
    );
}
