'use client';

import { useEffect, useState } from 'react';
import Article from './article';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

import './../../../globals.css';
import ArticleSkeleton from '@/skeleton/article-skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/lib/api/article';
import { ArticleData, ArticleList } from '@/types/article-type';

type ArticleProps = {
  articleList: ArticleList;
};

export default function ArticleSection({ articleList }: ArticleProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // 콘텐츠 로딩 상태

  const {
    data: articleData, // fetch해서 props로 받아온 article 데이터
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ArticleList, Error>({
    queryKey: ['articles'],
    queryFn: fetchArticles, // 타입 생각해서 잘 맞춰야 함.
    initialData: articleList,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7일
  });

  useEffect(() => {
    // 약간의 딜레이 추가 (2초)
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

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
    <section className="mt-5 ">
      <p className="pl-4 text-title1 text-grey250">오늘의 영감</p>

      <>
        {/* shadcn-ui Carousel 사용 */}
        <Carousel
          className="fade-in mt-3 w-full h-auto transition-all duration-500 ease-in-out"
          opts={{
            loop: true,
          }}
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 4000, // 2초마다 넘어가도록
            }),
          ]}>
          {/* 마지막 아티클 오른쪽 마진 추가하는 거 + 다른 아티클 겹쳐보이는 거 확실히 하기 */}
          <CarouselContent>
            {isLoaded
              ? articleData.map((article: ArticleData, index: number) => (
                  <CarouselItem
                    key={index}
                    className={`flex-shrink-0 min-w-80 min-h-80 ${
                      index === articleData.length - 1 ? 'mr-[10px]' : ''
                    }`}>
                    <Article currentIdx={index + 1} articleLength={count} article={article} />
                  </CarouselItem>
                ))
              : Array.from({ length: articleData.length }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className={`flex-shrink-0 min-w-80 min-h-80 ${
                      index === articleData.length - 1 ? 'mr-[10px]' : ''
                    }`}>
                    <ArticleSkeleton />
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>

        {/* 하단의 페이지네이션 표시 (슬라이드 개수만큼 점 생성) */}
        <div className="flex justify-center items-center gap-[5px] mt-4">
          {articleData.map((article: ArticleData, idx: number) => (
            <div
              key={article.articleId}
              className={` w-2 h-2 rounded-full transition-all duration-500 ease-in-out
                  ${idx === current - 1 ? 'w-4 bg-red animate-bubble' : 'bg-grey550'}`}
            />
          ))}
        </div>
      </>
    </section>
  );
}
