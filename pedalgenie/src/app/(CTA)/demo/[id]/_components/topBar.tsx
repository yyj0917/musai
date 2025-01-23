import LeftArrow from '@public/svg/product/left-arrow.svg';

export default function TopBar({}) {
  return (
    <div className="flex w-full items-center justify-between py-[17.5px] pl-4 border-b-[1px] border-grey850">
      <button>
        <LeftArrow />
      </button>
      <p className="flex-grow text-center font-semibold text-white">시연 예약하기</p>
      <div className="w-10"></div> {/* 텍스트 가운데 정렬을 위한 오른쪽 빈 공간*/}
    </div>
  );
}
