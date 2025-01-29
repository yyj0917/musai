import Navigation from '@/components/navigation';
import './../globals.css';
export default function GNBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed-safari relative w-full h-full bg-grey1000">
      {children}
      <Navigation />
    </div>
  );
}
