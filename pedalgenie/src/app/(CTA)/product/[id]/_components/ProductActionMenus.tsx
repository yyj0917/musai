interface ProductActionMenusProps {
  isRentable?: boolean;
  isPurchasable?: boolean;
  isDemoable?: boolean;
}

const ProductActionMenus = ({ isRentable, isPurchasable, isDemoable }: ProductActionMenusProps) => {
  return (
    <div className="flex w-full space-x-1 pb-3">
      {isDemoable && <div className="flex bg-grey750 rounded text-grey150 text-xs font-medium px-2 py-[5px]">시연</div>}
      {isRentable && <div className="flex bg-grey750 rounded text-grey150 text-xs font-medium px-2 py-[5px]">대여</div>}
      {isPurchasable && (
        <div className="flex bg-grey750 rounded text-grey150 text-xs font-medium px-2 py-[5px]">구매</div>
      )}
    </div>
  );
};

export default ProductActionMenus;
