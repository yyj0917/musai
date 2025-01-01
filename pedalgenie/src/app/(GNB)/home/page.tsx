import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Article from './_components/article';
import Item from './_components/preview';
import dataset from '@/data/dataset.json';
import { Suspense } from 'react';
import ProductSection from './_components/product-section';
import ArticleSection from './_components/article-section';
import Preview from './_components/preview';
import PreviewSection from './_components/preview-section';
import Header from './_components/header';


export default function Home() {
  
  const { article, product, effector } = dataset;
  return (
    <div className="w-full flex flex-col">
      {/* Scroll시 고정되어 있는 header */}
      <Header/>
      
      <main id='main' className='w-full h-[calc(100vh-88.5px-87px)] overflow-y-auto scrollbar-hide'>
        {/* article이 들어갈 section */}
        <ArticleSection article={article}/>
        {/* 시연가능한 제품(기준미정) section */}
        <PreviewSection product={product}/>
        {/* 전체 제품들 카테고리, 앵커링할 section - Client Comp.*/}
        <ProductSection product={effector}/>
      </main>
    </div>
  );
}
