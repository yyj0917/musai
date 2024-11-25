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
    if (!article) {
        return (
          <ArticleSkeleton/>
        );
      }
    // Article UI
    return (
        <article className="min-w-80 h-full rounded-sm bg-grey750">
            <Image
                src={article.image}
                alt={article.title}
                width={300}
                height={200}
                className="object-cover w-full h-full absolute top-0 left-0 -z-10"
            />
            <h3 className="text-white text-lg font-semibold">{article.title}</h3>
            <p className="text-grey250 text-sm mt-1">
                {article.category.map((cat, index) => (
                <span key={index} className="mr-2">
                    #{cat}
                </span>
                ))}
            </p>
        </article>
    )
}