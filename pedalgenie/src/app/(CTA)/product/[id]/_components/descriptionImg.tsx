import Image from 'next/image';

interface DescriptionImgProps {
  descriptionImg?: string; // 추후 배열로 수정
}

export default function DescriptionImg({ descriptionImg }: DescriptionImgProps) {
  if (!descriptionImg) {
    return (
      <div className="flex w-full px-4 py-10">
        <p>상품 상세 이미지가 없습니다.</p>
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
