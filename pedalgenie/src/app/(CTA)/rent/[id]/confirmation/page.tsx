import TopBar from '../_components/topBar';
import RentFeeSummary from './_components/rentFeeSummary';
import RentFeeInfo from './_components/rentFeeInfo';
import SubmitButton from './_components/submitButton';

// 입금계좌

export default function Confirmation() {

  return (
    <div className="w-full h-full flex flex-col text-grey250 font-pretendard">
      <TopBar />
      <div className="flex-1 w-full p-4">
        <RentFeeSummary />
        <RentFeeInfo account="신한 110203923432" />
      </div>
      <div className='px-4 pt-3 pb-8'>
      <SubmitButton text="300,000원 입금하기" />
      </div>
    </div>
  );
}
