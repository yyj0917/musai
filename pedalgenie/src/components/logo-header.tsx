import Link from 'next/link';
import Logo from '@public/svg/main-logo.svg';

export default function LogoHeader() {
  return (
    <header className="w-full flex ">
      <Link href={'/'} className="w-full flex justify-start items-center px-4 py-3">
        <Logo />
      </Link>
    </header>
  );
}
