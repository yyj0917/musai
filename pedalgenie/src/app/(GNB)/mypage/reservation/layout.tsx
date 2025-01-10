import ReservationHeader from "../_components/header-reservation";

export default function ReservationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col">
      {/* 고정되어 있는 header */}
      <ReservationHeader />
      {children}
    </div>
  );
}
