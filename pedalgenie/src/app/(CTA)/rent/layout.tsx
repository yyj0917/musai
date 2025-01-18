export default function CTALayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <div className="w-full h-full bg-grey1000">
      {children}
    </div>
  );
}
