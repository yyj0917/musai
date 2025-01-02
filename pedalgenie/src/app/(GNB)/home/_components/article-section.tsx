'use client';

import { useEffect, useState } from 'react';
import Article from './article';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

import './../../../globals.css';

export default function ArticleSection({ article }: ArticleProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="mt-5 pl-4">
      <p className="text-title1 text-grey250">오늘의 영감</p>

      {/* shadcn-ui Carousel 사용 */}
      <Carousel
        className="mt-3 w-full h-80"
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000, // 2초마다 넘어가도록
          }),
        ]}>
        {/* 마지막 아티클 오른쪽 마진 추가하는 거 + 다른 아티클 겹쳐보이는 거 확실히 하기 */}
        <CarouselContent>
          {article.map((item: Article, index: number) => (
            <CarouselItem
              key={index}
              className={`flex-shrink-0 min-w-80 h-80 ${index === article.length - 1 ? 'pr-4' : ''}`}>
              <Article currentIdx={index + 1} articleLength={count} article={item} />
            </CarouselItem>
          ))}
          {/* <Suspense fallback={<Article />}>
          </Suspense> */}
        </CarouselContent>
      </Carousel>

      {/* 하단의 페이지네이션 표시 (슬라이드 개수만큼 점 생성) */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {article.map((_, idx: number) => (
          <div
            key={idx}
            className={` w-2 h-2 rounded-full transition-all duration-500 ease-in-out
              ${idx === current - 1 ? 'w-4 bg-red animate-bubble' : 'bg-grey550'}`}
          />
        ))}
      </div>
    </section>
  );
}
