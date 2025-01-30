import { ArticleDetail, ArticleList } from '@/types/article-type';
import axiosInstance from './config/axiosConfig';

/**
 * 첫 홈화면 아티클 목록 조회 - token 필요 x - tanstackquery 캐싱
//  * @returns Array of articles or an error message
 */
export async function fetchArticles(): Promise<ArticleList> {
  try {
    const response = await axiosInstance.get('/api/articles');
    return response.data.data; // data.data로 받아옴 - type 일치 때문에
  } catch (error) {
    throw new Error('Unable to fetch articles. Please try again later.');
  }
}

/**
 * 아티클 상세 조회 - token 필요 x - tanstackquery 캐싱
 * @param articleId The ID of the article to fetch
 * @returns Article details or an error message
 */
export async function fetchArticleDetail(articleId: string): Promise<ArticleDetail> {
  try {
    const response = await axiosInstance.get(`/api/articles/${articleId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching article with ID ${articleId}:`, error);
    throw new Error('Unable to fetch the article. Please try again later.');
  }
}
