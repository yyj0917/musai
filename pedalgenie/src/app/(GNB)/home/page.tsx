import { Button } from '@/components/ui/button';
import Search from '@/public/svg/search.svg';


export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* Scroll시 고정되어 있는 header */}
      <header className="w-full flex flex-col">
        <div className='w-full flex justify-between items-center px-4 pt-2'>
          <span className="text-ivory text-head0 line-[30px] font-outfit">MUSAI</span>
          <Search className="text-grey250" />
        </div>
        <div className='mt-3 pl-4 flex gap-4 text-grey250 text-head1 border-b-[0.5px] border-grey750'>
          <Button variant={'link'}>제품</Button>
          <Button variant={'link'}>매장</Button>
        </div>
      </header>
    </div>
  );
}
