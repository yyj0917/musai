import Loading from '@/components/loading';
import { Suspense } from 'react';
import SearchedSection from './_components/searched-section';


export default function Search() {
  

  return (
      <div className="w-full h-full">
          <Suspense fallback={<Loading/>}>
            <SearchedSection/>
          </Suspense>
      </div>
  );
}
