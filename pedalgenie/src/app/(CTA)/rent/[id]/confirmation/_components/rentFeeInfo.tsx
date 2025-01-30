'use client'

import { fetchUserInfo } from '@/lib/api/auth';
import CopyButton from './copyButton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import Loading from '@/components/loading';

interface RentFeeInfoProps {
  account: string;
}

export default function RentFeeInfo({ account }: RentFeeInfoProps) {
  const queryClient = useQueryClient();

  const fetchMembers = async () => {
      const accessToken = queryClient.getQueryData<string>(['authToken']);
      useAuthStore.getState().setAccessToken(accessToken);
      try {
        const response = await fetchUserInfo(); // API 호출
        return response;
      } catch (error) {
        // error handling 필요
        return;
      }
    };

  // React Query로 fetchUserInfo 데이터 캐싱
  const { data: memberData, isLoading } = useQuery({
    queryKey: ['memberInfo'], // 캐싱 키
    queryFn: fetchMembers, // fetchMembers 함수
    staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선하다고 간주
    gcTime: 1000 * 60 * 10, // 10분 동안 캐싱 유지
    enabled: false, // 활성화
  });

  return (
    <>
      <h2 className="text-title2 pt-8">결제 정보</h2>
      <p className="text-label2 font-normal text-red pb-3">
        입금자명을 {memberData?.nickname ? '‘'+memberData.nickname+'’' : '‘사용자명’으'}로 해주세요
      </p>
      {/* 결제 금액 요약 섹션 */}
      <section className="flex flex-col bg-grey850 p-4 rounded-sm space-y-1">
        <h3 className="font-normal text-label2 text-grey550">입금 계좌</h3>
        <div className="flex">
          <div className="flex flex-col flex-1">
            <p>{account}</p>
            <p>예금주 : 구연성</p>
          </div>

          {/* 계좌 복사 버튼 */}
          <CopyButton textToCopy={account} />
          {/* 복사 완료 후 로직 수정 */}
        </div>
      </section>
      {isLoading ? <Loading /> : null}
    </>
  );
}
