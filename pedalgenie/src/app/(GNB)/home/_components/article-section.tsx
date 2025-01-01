import { Suspense } from "react";
import Article from "./article";


export default function ArticleSection({article} : any) {
    return (
        <section className='mt-5 pl-4'>
          <p className='text-title1 text-grey250'>오늘의 영감</p>
          <div className='mt-3 w-full h-[300px] flex gap-[10px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide'>
            <Suspense fallback={<Article />}>
                {article.map((item: any, index: number) => (
                    <Article key={index} article={item}/>
                ))}
            </Suspense>
          </div>
        </section>
      );
}