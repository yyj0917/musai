import Floating from '@public/svg/floating.svg';

export default function FloatingButton({ onClick } : { onClick: () => void }) {
    return (
        <button
            type="button"
            className="w-11 h-11 bg-darkRed text-red rounded-full shadow-md flex items-center justify-center"
            onClick={onClick}
        >
            <Floating/>
        </button>
    );
}