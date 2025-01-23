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
        <p className="text-grey550 font-semibold text-sm pb-2">구매</p>
        <p className="text-white font-semibold">{formatPrice(price)}원</p>
        <p className="text-grey550 text-xs">매장에 직접 구매 문의</p>
      </div>
          
      {/* 대여료 표시 부분 */}
      <div className="flex flex-col w-full bg-grey950 rounded px-4 py-3.5">
        <p className="text-grey550 font-semibold text-sm pb-2">대여</p>
        <p className="text-white font-semibold">{formatPrice(rentPricePerDay)}원</p>
        <p className="text-grey550 text-xs">수수료 별도 10% 부가</p>
      </div>
    </section>
  );
}
