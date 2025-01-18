import LeftArrow from '@public/svg/product/left-arrow.svg';


export default function TopBar({  }) {
    return (
        <div className="flex w-full py-3 pl-4">
            <button>
                <LeftArrow/>
            </button>
        </div>
    );
}
