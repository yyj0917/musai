import Image from 'next/image';

interface ProductImgProps {
  productImg: { imageUrl: string }[]; // 이미지 URL 배열
}

export default function ProductImg({ productImg }: ProductImgProps) {
  const imageUrls = productImg.map((image) => image.imageUrl); // 내부에서 URL 추출

  return (
    <section className="w-full h-[375px] relative">
      <div className="w-full h-full absolute flex overflow-x-scroll scrollbar-hide">
        {imageUrls.map((url, index) => (
          <div key={index} className="relative w-full h-full flex-shrink-0" style={{ minWidth: '100%' }}>
            <Image
              src={url}
              alt={`상품 이미지 ${index + 1}`}
              layout="fill" // 이미지가 부모 컨테이너를 채우도록 설정
              objectFit="cover" // 이미지가 부모 크기에 맞게 잘리거나 확장되도록 설정
              priority={index === 0} // 첫 번째 이미지를 우선 로드
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-4 text-grey450 text-sm">
        {imageUrls.length > 0 ? `1/${imageUrls.length}` : '이미지가 없습니다.'}
      </div>
    </section>
  );
}
