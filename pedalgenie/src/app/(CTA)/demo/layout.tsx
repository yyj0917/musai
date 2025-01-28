export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative w-full h-full bg-grey1000">{children}</div>;
}
