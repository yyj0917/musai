import { Suspense } from "react";
import Preview from "./preview";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function PreviewSection({product} : any) {
    return (
        <section className='mt-11 pl-4'>
          <div className='pr-4 w-full flex justify-between items-center'>
            <p className='text-title1 text-grey250'>시연해볼 수 있는 [ 실리카겔 ]</p>
            <Button variant='ghost' asChild>
              <Link href='/home'>더보기</Link>
            </Button>
          </div>
          <div className='mt-3 w-full h-[300px] flex gap-[10px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide'>
            <Suspense fallback={<Preview/>}>
            {product.map((product: any, index: number) => (
                    <Preview key={index} product={product}/>
                ))}
            </Suspense>
          </div>
        </section>
      );
}