import Logo from './_components/logo';

export default function ReservationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col bg-grey1000 font-pretendard">
      {/* 고정되어 있는 header */}
      <Logo />
      <main className="w-full h-[calc(100dvh - 60px)] overflow-y-auto scrollbar-hide">{children}</main>
    </div>
  );
}
