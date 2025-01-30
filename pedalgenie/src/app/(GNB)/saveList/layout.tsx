import FloatingButton from '@/components/floating-button';
import SaveListHeader from './_components/saveList-header';

export default function SaveListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full flex flex-col">
      {/* Scroll시 고정되어 있는 header */}
      <SaveListHeader />
      <div id="likeSection" className="w-full h-[calc(100dvh-88.5px-87px)] overflow-y-auto scrollbar-hide">
        {children}
      </div>
      <div className="mb-[-10px]">
        <FloatingButton scrollContainer={'likeSection'} />
      </div>
    </div>
  );
}
