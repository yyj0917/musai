import Navigation from '@/components/navigation';

export default function GNBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full bg-grey1000">
      {children}
      <Navigation />
    </div>
  );
}
