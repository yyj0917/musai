'use client';

import Image from 'next/image';
import ArticleProducts from '../_components/article-product-section';
import { fetchArticleDetail } from '@/lib/api/article';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import NotFoundAll from '@/components/not-found-all';

export default function ArticlePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: article, isLoading } = useQuery({
    queryKey: ['articleDetail', id],
    queryFn: () => fetchArticleDetail(id), // 실행이 아니라 함수 참조 전달
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: true,
  });

  if (!article) {
    return (
      <div className='w-full h-[calc(100dvh - 50px)] my-auto flex justify-center items-center'>
        <NotFoundAll alertText='해당 아티클을 찾을 수 없습니다'/>
      </div>
    );
  }


  return (
    <div id='articleSection' className="w-full h-[calc(100dvh-50px)] flex flex-col overflow-y-auto scrollbar-hide">
      {/* Article Header */}
      <article className="relative w-full h-full">
        <div className="relative w-full h-auto " style={{ aspectRatio: '1 / 1' }}>
          <Image
            src={`${article?.thumbnailUrl}`}
            alt={`${article?.title}`}
            layout="fill" // 가로/세로 비율로 조정
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
            className="object-fit"
            priority
          />
        </div>
        {/* 그라데이션 효과 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="absolute left-[22px] bottom-[22px] flex flex-col">
          <h3 className="text-grey250 text-head1">{article?.title}</h3>
          <div className="w-72 flex justify-between items-center text-grey450 text-body1">
            <div>
              {article?.hashTag?.length > 0 ? (
                article.hashTag.map((cat, index) => (
                  <span key={index} className="mr-2">
                    {cat}
                  </span>
                ))
              ) : (
                <span>해시태그가 없습니다.</span>
              )}
            </div>
          </div>
        </div>
      </article>
      {/* Article Content */}
      <section className="relative w-full h-auto" style={{ aspectRatio: '1 / 2' }}>
        <Image
          src={`${article?.bodyUrl}`}
          alt={'article 상세 이미지'}
          layout="fill" // 가로/세로 비율로 조정
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
          className="object-fit"
          priority
        />
      </section>

      {/* Article Products */}
      <ArticleProducts articleProducts={article?.products} />
      
      {isLoading && <Loading/>}
    </div>
  );
}
