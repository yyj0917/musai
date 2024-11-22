import Navigation from "@/components/ui/Navigation";


export default function GNBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full">
        {children}
        <Navigation/>
    </div>
  );
}
