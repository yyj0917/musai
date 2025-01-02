import ShopDetail from './_components/shop-detail';

export default function Shop() {
  return (
    <div className="py-5 w-full h-[calc(100vh-88.5px-87px)] flex flex-col gap-6 overflow-y-auto scrollbar-hide">
      <ShopDetail />
      <ShopDetail />
      <ShopDetail />
    </div>
  );
}
