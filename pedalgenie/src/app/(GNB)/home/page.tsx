import dataset from '@/data/dataset.json';
import { Suspense } from 'react';
import ProductSection from './_components/product-section';
import ArticleSection from './_components/article-section';
import PreviewSection from './_components/preview-section';
import { fetchArticles } from '@/lib/api/article';
import { fetchProductGenre } from '@/lib/api/(product)/genre-product';
import { fetchProductList } from '@/lib/api/(product)/product';

export default async function Home() {
  const { product } = dataset;

  // // 아티클 목록 조회
  const articleList = await fetchArticles();
  // // 시연해볼 수 있는 장르별 악기 조회
  const genreProduct = await fetchProductGenre('클래식');
  // // 초기 상품 조회 - 10개만 (SEO용)
  // const initialProduct = await fetchProductList(params);

  return (
    <main id="main" className="w-full h-[calc(100dvh-88.5px-87px)] overflow-y-auto scrollbar-hide">
      {/* article이 들어갈 section */}
      <ArticleSection articleList={articleList} />
      {/* 시연가능한 제품(기준미정) section */}
      <PreviewSection genreProduct={genreProduct} genre={'클래식'} />
      {/* 전체 제품들 카테고리, 앵커링할 section - Client Comp.*/}
      <Suspense fallback={<div>Loading...</div>}>
        <ProductSection />
      </Suspense>
    </main>
  );
}
