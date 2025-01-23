import Image from 'next/image';

interface ProductImgProps {
  productImg?: { imageUrl: string }[]; // 이미지 URL 배열
}

export default function ProductImg({ productImg }: ProductImgProps) {
  // productImg 배열이 없는 경우를 처리
  if (!productImg || productImg.length === 0) {
    return (
      <section className="w-full h-[375px] flex items-center justify-center bg-grey850">
        <p className="text-grey450 text-sm">이미지가 없습니다.</p>
      </section>
    );
  }

  const imageUrls = productImg.map((image) => image?.imageUrl).filter(Boolean); // 유효한 URL만 필터링

  return (
    <section className="w-full h-[375px] relative">
      <div className="w-full h-full absolute flex overflow-x-scroll scrollbar-hide">
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0" style={{ minWidth: '100%' }}>
              <Image
                src={url}
                alt={`상품 이미지 ${index + 1}`}
                fill
                sizes='w-full h-full'// 이미지가 부모 컨테이너를 채우도록 설정
                style={{ objectFit: 'cover' }} // 이미지가 부모 크기에 맞게 잘리거나 확장되도록 설정
                priority={index === 0} // 첫 번째 이미지를 우선 로드
              />
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-grey450 text-sm">유효한 이미지가 없습니다.</p>
          </div>
        )}
      </div>
      {/* 이미지 페이지 표시 */}
      <div className="absolute bottom-4 right-4 text-grey450 text-sm">
        {imageUrls.length > 0 ? `1/${imageUrls.length}` : '이미지가 없습니다.'}
      </div>
    </section>
  );
}
