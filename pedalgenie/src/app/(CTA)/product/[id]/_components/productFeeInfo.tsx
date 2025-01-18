export default function ProductFeeCard({  }) {
    return (
        <section className="flex w-full space-x-[7px] pb-5">
            <div className="flex flex-col w-full bg-grey950 rounded px-4 py-3.5">
                <p className="text-grey550 font-semibold text-sm pb-2">구매</p>
                <p className="text-white font-semibold">
                    1,500,000원
                </p>
                <p className="text-grey550 text-xs">매장에 직접 구매 문의</p>
            </div>
            <div className="flex flex-col w-full bg-grey950 rounded px-4 py-3.5">
                <p className="text-grey550 font-semibold text-sm pb-2">대여</p>
                <p className="text-white font-semibold">
                    30,000원
                </p>
                <p className="text-grey550 text-xs">수수료 별도 10% 부가</p>
            </div>
        </section>
    );
}

// 이거 그냥 합쳐도 될듯