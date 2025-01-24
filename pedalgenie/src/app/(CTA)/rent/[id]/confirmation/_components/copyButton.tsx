'use client';

interface CopyButtonProps {
  textToCopy: string; // 복사할 텍스트
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  {/* 은행명, 계좌 번호 클립보드 복사 함수 */}
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    alert('계좌가 복사되었습니다!'); // 복사 성공 알림
  };

  return (
    <div
      className="bg-red text-ivory text-body2 rounded-[20px] h-[29px] w-[68px] flex items-center justify-center cursor-pointer"
      onClick={handleCopy}
    >
      계좌 복사
    </div>
  );
}
