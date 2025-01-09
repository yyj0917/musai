import CTA from '@/components/ui/CTA';

export default function CTALayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full bg-grey1000">
      {children}
      <CTA />
    </div>
  );
}
