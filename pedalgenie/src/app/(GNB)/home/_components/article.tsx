import { ArticleData } from '@/types/article-type';
import Image from 'next/image';
import Link from 'next/link';

type ArticleItemProps = {
  article: ArticleData;
  currentIdx: number;
  articleLength: number;
};

export default function Article({ article, currentIdx, articleLength }: ArticleItemProps) {
  // Skeleton UI
  // if (!article) {
  //     return (
  //       <ArticleSkeleton/>
  //     );
  //   }
  // Article UI
  return (
    <Link href={`/home/article/${article?.articleId}`}>
      <article className="relative min-w-80 min-h-80 rounded-sm overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <Image
          src={`${article?.thumbnailUrl}`}
          alt={`${article?.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
          className="object-fit"
          priority
        />
        {/* 그라데이션 효과 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="absolute left-[22px] bottom-[22px] flex flex-col gap-1">
          <h3 className="text-grey150 text-head0">{article?.title}</h3>
          <div className="w-72 flex justify-between items-center text-grey450 text-body2">
            <div>
              {article?.hashTag.map((cat, index) => (
                <span key={index} className="mr-2">
                  {cat}
                </span>
              ))}
            </div>
            <span>
              {currentIdx}/{articleLength}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
