import { Button } from '@/components/ui/button';
import Link from 'next/link';
import MainLogo from '@public/svg/main-logo.svg';

export default function SaveListHeader() {
  const link = [
    { name: '제품', href: '/saveList/product' },
    { name: '매장', href: '/saveList/shop' },
  ];
  return (
    <header className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center px-4 py-3 text-grey250">
            <Link href={'/'}>
                <MainLogo />
            </Link>
        </div>
        <div className="mb-2 pl-4 flex gap-4 text-head1 border-b-[0.5px] border-grey750">
            {link.map((link) => (
                <Button key={link.href} variant="link" asChild href={link.href}>
                <Link href={link.href}>{link.name}</Link>
                </Button>
            ))}
        </div>
    </header>
  );
}
