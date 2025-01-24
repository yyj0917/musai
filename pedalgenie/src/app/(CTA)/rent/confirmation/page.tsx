import TopBar from '../[id]/_components/topBar';
import RentFeeSummary from './_components/rentFeeSummary';
import RentFeeInfo from './_components/rentFeeInfo';
import SubmitButton from './_components/submitButton';

// 입금계좌

export default function Confirmation() {
  return (
    <div className="w-full flex flex-col text-grey250 font-pretendard">
      <TopBar />
      <div className="w-full p-4">
        <RentFeeSummary />
        <RentFeeInfo account="신한 110203923432" />
        <SubmitButton text="300,000원 입금하기" />
      </div>
    </div>
  );
}
