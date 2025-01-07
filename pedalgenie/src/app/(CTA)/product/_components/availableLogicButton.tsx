interface AvailabilityBoxProps {
    availability: string;
}

const AvailabilityBox = ({ availability }: AvailabilityBoxProps) => {
    return (
        <div className="flex bg-grey850 rounded text-white text-sm px-1.5 py-[3px]">
            {availability}
        </div>
    );
};

{/* DB에서 시연,대여,구매 true/false 값을 받아와서 각 박스 랜더링 여부 선택 */}

export default function AvailableLogicButton() {
    return (
        <div className="flex w-full space-x-2 pb-5">
            <AvailabilityBox availability="시연" />
            <AvailabilityBox availability="대여" />
            <AvailabilityBox availability="구매" />
        </div>
    );
}
