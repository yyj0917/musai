
import Link from "next/link";
import RightArrow from "@public/svg/mypage/right-arrow-mypage.svg";
import ChannelIOScript from "@/utils/channeltalk";

export default function MyPage() {
    const purchase = [
        {
          link: '/mypage/purchase',
          text: '구매 내역 조회'
        },
        {
          link: '/mypage/preview',
          text: '시연 내역 조회'
        },
        {
            link: '/mypage/cancel&return',
            text: '취소 / 반품 내역 조회'
          }
      ];
    const etc = [
        {
          link: '/mypage/open-source',
          text: '오픈소스 라이선스'
        },
        {
          link: '/mypage/qna',
          text: '자주 묻는 질문'
        },
        {
            link: '/mypage/terms-of-use',
            text: '이용약관'
        }
    ]
    
    
    
    return (
        <div className="w-full h-auto flex flex-col ">
            <div className="relative w-full h-[132px] text-grey450">
                <div className="absolute left-5 top-[50px] flex flex-col gap-[5px]">
                    <Link href="/login" className="flex items-center gap-3">
                        <p className="text-head1 ">로그인</p>
                        <RightArrow />
                    </Link>
                    <p className="text-body1">로그인이 필요합니다</p>
                </div>
            </div>
            <div className="w-full h-[9px] bg-grey850"></div>
            {/* 구매 / 예약정보 */}
            <div className="mt-[26px] ml-5 flex flex-col gap-[10px]">
                <h1 className="text-head1 text-grey450">
                    구매 / 예약정보
                </h1>
                <div className="flex flex-col gap-2">
                    {purchase.map((item, index) => (
                        <Link key={index} href={item.link} className="flex items-center">
                            <p className="text-body2 text-grey450">{item.text}</p>
                        </Link>
                    ))}
                </div>
            </div>
            {/* 그 외 필요정보 */}
            <div className="mt-[26px] ml-5 flex flex-col gap-[10px]">
                <h1 className="text-head1 text-grey450">
                    그 외
                </h1>
                <div className="flex flex-col gap-2">
                    {etc.map((item, index) => (
                        <Link key={index} href={item.link} className="flex items-center">
                            <p className="text-body2 text-grey450">{item.text}</p>
                        </Link>
                    ))}
                </div>
            </div>
            {/* 채널톡 커스텀 위치 */}
            {/* <div className="custom fixed bottom-[100px]">
                <button className="bg-grey850 px-2 py-2 rounded-xl animate-pulse">
                    <span className="text-ivory font-outfit text-logo">MUSAI</span>
                </button>
            </div> */}
            <ChannelIOScript />

            
        </div>
        
    );
  }