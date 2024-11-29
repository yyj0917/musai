{/* 버튼 클릭 시 UI 변경하기 */}

export default function InfoSwitcher({  }) {
    return (
        <section className="flex w-full border-b-[1px] border-grey850 space-x-4">
            <div className="border-b-2 border-grey250 font-semibold text-grey250 text-sm py-1 px-0.5">
                제품 정보
            </div>
            <div className="font-semibold text-grey750 text-sm py-1 px-0.5">
                매장 정보
            </div>
        </section>
    );
}
