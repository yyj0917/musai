export default function RentFeeSummary() {
  return (
    <>
      <h2 className="text-title2 pb-3">결제 금액</h2>

      {/* 결제 금액 요약 섹션 */}
      <section className="flex flex-col bg-grey850 p-4 rounded-sm space-y-1">
        
        {/* 1일 대여료 */}
        <div className="flex justify-between">
          <p className="text-grey550 text-body2">1일 대여료</p>
          <p className="text-label1">30,000원</p>
        </div>
        
        {/* 대여 일수 */}
        <div className="flex justify-between border-b border-grey750 pb-3">
          <p className="text-grey550 text-body2">x 대여 일수</p>
          <p className="text-label1">10일</p>
        </div>
        
        {/* 합계 금액 */}
        <div className="flex justify-between pt-2 text-red text-title1">
          <p>합계</p>
          <p>300,000원</p>
        </div>
        
      </section>
    </>
  );
}
