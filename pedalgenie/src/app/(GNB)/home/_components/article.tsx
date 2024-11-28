import ArticleSkeleton from '@/skeleton/article-skeleton';
import Image from 'next/image';


type ArticleProps = {
    article?: {
      image: string;
      title: string;
      category: string[];
    };
  };

export default function Article({ article }: ArticleProps) {
    // Skeleton UI 
    // if (!article) {
    //     return (
    //       <ArticleSkeleton/>
    //     );
    //   }
    // Article UI
    return (
        <article className="relative min-w-80 h-full rounded-sm overflow-hidden">
            <Image
                src={`${article?.image}`}
                alt={`${article?.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 맞춰 이미지의 사이즈 지정
                className="object-fit"
            />
            {/* 그라데이션 효과 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className='absolute left-[22px] bottom-[22px] flex flex-col'>
              <h3 className="text-grey250 text-head1">{article?.title}</h3>
              <p className="text-grey450 text-body1">
                  {article?.category.map((cat, index) => (
                  <span key={index} className="mr-2">
                      #{cat}
                  </span>
                  ))}
              </p>
            </div>
        </article>
    )
}