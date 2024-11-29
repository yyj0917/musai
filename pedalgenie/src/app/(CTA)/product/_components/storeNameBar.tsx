import RightArrow from '@public/svg/product/right-arrow.svg';


export default function StoreNameBar({  }) {
    return (
        <div className="flex w-full justify-between py-[13.5px] px-4 border-b-[1px] border-grey850">
            <div className='text-grey450'>
                낙원월드
            </div>
            <div className="">
                <RightArrow/>
            </div>
        </div>
    );
}
