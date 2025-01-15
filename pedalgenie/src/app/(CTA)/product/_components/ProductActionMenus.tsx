interface ProductActionMenuProps {
    availableAction: string;
}

const ProductActionMenu = ({ availableAction: availableAction }: ProductActionMenuProps) => {
    return (
        <div className="flex bg-grey750 rounded text-grey150 text-xs font-medium px-2 py-[5px]">
            {availableAction}
        </div>
    );
};

{/* DB에서 시연,대여,구매 true/false 값을 받아와서 각 박스 랜더링 여부 선택 */}

export default function ProductActionMenus() {
    return (
        <div className="flex w-full space-x-1 pb-3">
            <ProductActionMenu availableAction="시연" />
            <ProductActionMenu availableAction="대여" />
            <ProductActionMenu availableAction="구매" />
        </div>
    );
}
