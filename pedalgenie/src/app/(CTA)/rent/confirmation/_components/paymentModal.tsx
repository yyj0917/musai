import { Button } from '@/components/ui/button';
import CopyButton from './copyButton';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
    if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음
    
  const accountInfo = '신한 110203923432'; // 임시 계좌 정보

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
          <div className="bg-grey850 px-4 pt-6 pb-8 rounded-t-2xl rounded-b-none w-[375px] transition-transform duration-300 transform translate-y-"
          onClick={(e) => e.stopPropagation()} // 모달 안쪽 클릭 시 닫히지 않도록
            style={{ animation: `${isOpen ? 'slideUp' : 'slideDown'} 0.3s ease-in-out` }}>
              <h2 className="text-title2 pb-2 text-grey150">입금 계좌</h2>
              <p className="font-semibold pb-3 text-body2 text-red white-space: pre-line">입금자명을 ‘뮤뮤'로 해주세요.<br/>입금자명이 카카오 닉네임과 다르면 관리자 승인이 어려워요. </p>
              <section className="flex flex-col bg-grey750 p-4 rounded-sm space-y-1">
                      <div className="flex items-center">
                        <div className="flex flex-col flex-1">
                          <p>{accountInfo}</p>
                          <p>예금주 : 구연성</p>
                        </div>
                        {/* 계좌 복사 버튼 */}
                        <CopyButton textToCopy={accountInfo} />
                      </div>
                    </section>
        
        {/* 닫기 버튼 */}
            <Button
          variant={'custom'}
                  className={'mt-6 bg-red text-ivory px-4 rounded w-full text-body2'}
              onClick={onClose}>
          300,000원 입금 완료했어요
        </Button>
      </div>
    </div>
  );
}
