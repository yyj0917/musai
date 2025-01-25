export default function NoticeSection() {
  return (
    <section className="w-full">
      <h3 className="pt-2 pb-3 text-title2">유의사항</h3>
      {/* 유의사항 섹션 */}

      <section className="flex flex-col w-full p-4 bg-grey950 text-body2 space-y-3">
        <p>
          대여 예약 신청 이후 악기 준비 과정에서 문제 발생 시 대여 예약이 취소될 수 있습니다
        </p>
        <p>
          대여 취소는 픽업 시간 기준 24시간 전까지 가능합니다
        </p>
        <p>
          [주문확인중] 상태 이후 [픽업예정] 상태가 되면 주문이 확정된 것입니다
        </p>
      </section>
    </section>
  );
}
