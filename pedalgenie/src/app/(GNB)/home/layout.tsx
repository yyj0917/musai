import Header from './_components/header';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col">
      {/* Scroll시 고정되어 있는 header */}
      <Header />
      {children}
    </div>
  );
}
