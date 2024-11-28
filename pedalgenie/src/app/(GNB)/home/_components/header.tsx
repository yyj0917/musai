import { Button } from "@/components/ui/button";
import Link from "next/link";
import Search from '@public/svg/search.svg';

export default function Header() {
    const link = [
        { name: '제품', href: '/home' },
        { name: '매장', href: '/home/store' },
      ]
    return (
        <header className="w-full flex flex-col">
        <div className='w-full flex justify-between items-center px-4 pt-2'>
          <span className="text-ivory text-logo font-outfit">MUSAI</span>
          <Search className="text-grey250" />
        </div>
        <div className='mt-3 pl-4 flex gap-4 text-head1 border-b-[0.5px] border-grey750'>
          {link.map((link) => (
            <Button
              key={link.href}
              variant="link"
              asChild
              href={link.href}>
              <Link href={link.href}>
                {link.name}
              </Link>
            </Button>
        ))}
        </div>
      </header>
      );
}