import CopyButton from "./copyButton";

export default function RentFeeInfo() {
  const accountInfo = '신한 110203923432';

  return (
    <>
      <h2 className="text-title2 pt-8">결제 정보</h2>
      <p className="font-normal text-label2 text-red pb-3">입금자명을 ‘뮤뮤’로 해주세요</p>

      {/* 결제 금액 요약 섹션 */}
      <section className="flex flex-col bg-grey850 p-4 rounded-sm space-y-1">
        <h3 className="font-normal text-label2 text-grey550">입금 계좌</h3>
        <div className="flex">
          <div className="flex flex-col flex-1">
            <p>{accountInfo}</p>
            <p>예금주 : 구연성</p>
          </div>

          {/* 계좌 복사 버튼 */}
          <CopyButton textToCopy={accountInfo} />
        </div>
      </section>
    </>
  );
}
