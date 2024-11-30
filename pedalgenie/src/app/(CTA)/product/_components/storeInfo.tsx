import RightArrowSm from '@public/svg/product/right-arrow-sm.svg'
import Time from '@public/svg/product/time.svg'
import Call from '@public/svg/product/call.svg'

export default function StoreInfo({  }) {
    return (
        <div>
            <div className="flex w-full items-center bg-grey850 rounded p-4">
                <div className="bg-grey450 w-10 h-10 rounded-full"> {/* 매장 이미지 */}</div>
                <p className="font-semibold text-white pl-3"> {/* 매장 이름 */} 낙원월드</p>
                <button><RightArrowSm/></button>
            </div>
            <div className='flex w-full pt-5'>
                <Time/>
                <p className='text-sm text-grey250 pl-1'>
                    평일 9:00 ~ 19:00 (월~일)<br></br>공휴일 정상영업
                </p> {/* 매장 영업 시간 */}
            </div>
            <div className='flex w-full pt-2'>
                <Call/>
                <p className='text-sm text-grey250 pl-1'>
                02-734-9922
                </p> {/* 매장 번호 */}
            </div>
        </div>
    );
}
