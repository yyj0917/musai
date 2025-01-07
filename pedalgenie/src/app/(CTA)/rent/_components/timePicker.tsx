const TimeButton = () => {
    return (
        <div className="text-sm rounded-3xl">9:00</div>
    )
}
{/*border-[1.5px] border-grey750  */}

export default function TimePicker({  }) {
    return (
        <section className="flex-col">
            <p className="text-sm text-white pb-[10px]">오전</p>
            <TimeButton/>
            <p className="text-sm text-white pb-[10px]">오후</p>
        </section>
    );
}
