import Gradient from './_components/gradient';
import Header from './_components/header';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id='homeLayout' className="relative w-full flex flex-col overflow-hidden">
      {/* Scroll시 고정되어 있는 header */}
      <Header />
      {/* 동그란 그라데이션 요소 */}
      <Gradient/>
      {children}
    </div>
  );
}
