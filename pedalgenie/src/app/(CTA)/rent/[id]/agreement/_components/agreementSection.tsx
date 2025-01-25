'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Checked from '@public/svg/rent/agreement/checked.svg';
import Unchecked from '@public/svg/rent/agreement/unchecked.svg';

// 동의 항목의 키 타입 정의
type AgreementKeys = 'personalInfo' | 'terms';

// 상태 타입 정의
interface Agreements {
  personalInfo: boolean;
  terms: boolean;
}

// AllCheckButton, CheckButton의 props 타입 정의
interface CheckButtonProps {
  text: string;
  isChecked: boolean;
  onClick: () => void;
}

interface AgreementSectionProps {
  id : number;
}

export default function AgreementSection({id}: AgreementSectionProps) {
  const router = useRouter();

  // 개별 동의 상태 관리
  const [agreements, setAgreements] = useState<Agreements>({
    personalInfo: false,
    terms: false,
  });

  // 모두 동의 상태
  const isAllChecked = agreements.personalInfo && agreements.terms;

  // 모두 동의 버튼 클릭 핸들러
  const handleAllCheck = () => {
    const newState = !isAllChecked; // 현재 반대 상태로 토글
    setAgreements({
      personalInfo: newState,
      terms: newState,
    });
  };

  // 개별 동의 버튼 클릭 핸들러
  const handleIndividualCheck = (key: AgreementKeys) => {
    const newAgreements = { ...agreements, [key]: !agreements[key] };
    setAgreements(newAgreements);
  };

  // 다음으로 버튼 클릭 핸들러
  const handleNextStep = () => {
    if (isAllChecked) {
      router.push(`/rent/${id}/confirmation`); // 다음 페이지로 이동
    }
  };

  // 모두 동의 버튼 컴포넌트
  const AllCheckButton = ({ text, isChecked, onClick }: CheckButtonProps) => {
    return (
      <div
        className={`flex items-center gap-2 px-[14px] py-[10px] border rounded-sm cursor-pointer ${
          isChecked ? 'border-red' : 'border-grey650'
        }`}
        onClick={onClick}>
        {isChecked ? <Checked /> : <Unchecked />}
        <span className="text-body2">{text}</span>
      </div>
    );
  };

  // 개별 동의 버튼 컴포넌트
  const CheckButton = ({ text, isChecked, onClick }: CheckButtonProps) => {
    return (
      <div className="flex items-center gap-2 px-[14px] pt-3 cursor-pointer" onClick={onClick}>
        {isChecked ? <Checked /> : <Unchecked />}
        <span className="text-body2">{text}</span>
      </div>
    );
  };

  return (
    <section className="w-full pt-6 text-grey150 pb-10">
      <h2 className="text-title2 pb-3">약관 동의</h2>

      {/* 모두 동의 버튼 */}
      <AllCheckButton text="모두 동의합니다" isChecked={isAllChecked} onClick={handleAllCheck} />

      {/* 개별 동의 버튼 */}
      <CheckButton
        text="개인정보 제3자 제공 동의"
        isChecked={agreements.personalInfo}
        onClick={() => handleIndividualCheck('personalInfo')}
      />
      <CheckButton text="이용약관 동의" isChecked={agreements.terms} onClick={() => handleIndividualCheck('terms')} />

      {/* 다음으로 버튼 */}
      <div className="mt-6">
        <Button
          variant={'custom'}
          className={`w-full ${
            isAllChecked ? 'bg-red text-white' : 'bg-grey750 text-grey550 opacity-30 cursor-not-allowed'
          }`}
          onClick={handleNextStep}
          disabled={!isAllChecked} // 모두 동의하지 않으면 비활성화
        >
          다음으로
        </Button>
      </div>
    </section>
  );
}
