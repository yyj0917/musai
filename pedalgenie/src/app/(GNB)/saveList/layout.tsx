import SaveListHeader from './_components/saveList-header';


export default function SaveListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col">
      {/* Scroll시 고정되어 있는 header */}
        <SaveListHeader />
        <div className="w-full h-[calc(100vh-88.5px-87px)] overflow-y-auto scrollbar-hide">
            {children}
        </div>
    </div>
  );
}
