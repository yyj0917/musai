import Image from 'next/image';
import SymbolLogo from '@public/svg/symbol-logo.svg';

interface DescriptionImgProps {
  descriptionImg?: string; // 추후 배열로 수정
}

export default function DescriptionImg({ descriptionImg }: DescriptionImgProps) {
  if (!descriptionImg) {
    return (
      <div className="flex w-full items-center justify-center py-28">
        <div className="flex flex-col items-center gap-[14px] text-grey650 text-body1">
          <SymbolLogo />
          <p>제품 상세 이미지가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <Image
        src={descriptionImg}
        alt="상품 상세 이미지"
        layout="responsive" // 반응형 레이아웃
        width={100} // 기본 비율을 위한 너비
        height={100} // 기본 비율을 위한 높이
        priority={true}
      />
    </div>
  );
}
