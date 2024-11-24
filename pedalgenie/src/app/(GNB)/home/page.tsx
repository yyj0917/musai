import Search from '@/public/svg/search.svg';


export default function Home() {
  return (
    // header, nav는 고정되어 스크롤했을 때 고정되어있어야 함. 
    <div className="w-full flex flex-col">
      <header className="w-full flex flex-col">
        <div className='w-full flex justify-between items-center px-4 pt-2'>
          <span className="text-ivory text-head0 line-[30px] font-outfit">MUSAI</span>
          <Search className="text-grey250" />
        </div>
        <div className='mt-3 pl-4 text-grey250 text-head1 border-b-[0.5px] border-grey750'>
          <button>제품</button>
          <button>매장</button>
        </div>
      </header>
    </div>
  );
}
