import CTA from '@/components/ui/cta';

export default function CTALayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full">
      {children}
      <CTA />
    </div>
  );
}
