import RightArrow from '@public/svg/product/right-arrow-sm-white.svg';


export default function StoreNameBar({  }) {
    return (
        <div className="flex w-full justify-between py-3.5 px-4 border-b-[1px] border-grey850">
            <div className='text-grey450 text-sm'>
                낙원월드
            </div>
            <div className="flex items-center px-2">
                <RightArrow/>
            </div>
        </div>
    );
}
