interface ProductFeeCardProps {
  price?: number;
  rentPricePerDay?: number;
}

export default function ProductFeeCard({ price, rentPricePerDay }: ProductFeeCardProps) {
  // 숫자값을 천 단위로 쉼표 추가 해주는 함수

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  return (
    <section className="flex w-full space-x-[7px] pb-5">
      {/* 구매료 표시 부분 */}
      <div className="flex flex-col w-full bg-grey950 rounded px-4 py-3.5">
        <p className="text-grey550 text-body2 pb-2">구매</p>
        <p className="text-white font-semibold">{formatPrice(Number(price))}원</p>
      </div>
      {/* 대여료 표시 부분 */}
      <div className="flex flex-col w-full bg-grey950 rounded px-4 py-3.5">
        <p className="text-grey550 text-body2 pb-2">대여</p>
        <span className="flex">
          <p className="text-label1 text-grey550">일</p>
          <p className="flex items-center text-label1 !text-xs text-grey550 px-1">|</p>
          <p className="text-white font-semibold">{formatPrice(Number(rentPricePerDay))}원</p>
        </span>
      </div>
    </section>
  );
}
