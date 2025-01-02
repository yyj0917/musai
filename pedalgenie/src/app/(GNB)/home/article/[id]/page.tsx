'use client';

import dataset from '@/data/dataset.json'; // JSON 파일 경로 수정
import Image from 'next/image';
import ArticleProducts from '../_components/article-products';

export default function ArticlePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const article = dataset.article.find((item) => item.id === parseInt(id));

  if (!article) {
    return <div>아티클을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="w-full h-[calc(100vh-50px-87px)] flex flex-col overflow-y-auto scrollbar-hide">
      {/* Article Header */}
      <article className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
        <Image
          src={`${article?.image}`}
          alt={`${article?.title}`}
          layout="fill" // 가로/세로 비율로 조정
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
          className="object-fit"
          priority
        />
        {/* 그라데이션 효과 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="absolute left-[22px] bottom-[22px] flex flex-col">
          <h3 className="text-grey250 text-head1">{article?.title}</h3>
          <div className="w-72 flex justify-between items-center text-grey450 text-body1">
            <div>
              {article?.category.map((cat, index) => (
                <span key={index} className="mr-2">
                  #{cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
      {/* Article Content */}
      <section className="relative w-full h-full" style={{ aspectRatio: '1 / 2' }}>
        <Image
          src={'/img/article/article-virtual.jpg'}
          alt={'아티클 가상 이미지'}
          layout="fill" // 가로/세로 비율로 조정
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
          className="object-fit"
          priority
        />
      </section>

      {/* Article Products */}
      <ArticleProducts />
    </div>
  );
}
