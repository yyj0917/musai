import dataset from '@/data/dataset.json';
import { Suspense } from 'react';
import ProductSection from './_components/product-section';
import ArticleSection from './_components/article-section';
import PreviewSection from './_components/preview-section';
import { fetchArticles } from '@/lib/api/article';
import { fetchProductGenre } from '@/lib/api/(product)/product-genre';

export default async function Home() {
  const { article, product, effector } = dataset;

  // // 아티클 목록 조회
  // const articleList = await fetchArticles();
  // // 시연해볼 수 있는 장르별 악기 조회
  // const productGenre = await fetchProductGenre('guitar');
  // data api로 불러올 부분

  return (
    <main id="main" className="w-full h-[calc(100dvh-88.5px-87px)] overflow-y-auto scrollbar-hide">
      {/* article이 들어갈 section */}
      <ArticleSection article={article} />
      {/* 시연가능한 제품(기준미정) section */}
      <PreviewSection product={product} />
      {/* 전체 제품들 카테고리, 앵커링할 section - Client Comp.*/}
      <Suspense fallback={<div>Loading...</div>}>
        <ProductSection effector={effector} />
      </Suspense>
    </main>
  );
}
