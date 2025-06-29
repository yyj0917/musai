import { GenreProductList } from '@/types/product-type';
import { mockGenreProductList } from '@/mockdata/genre-product.mock';
import axiosInstance from '../config/axiosConfig';

// 첫 홈화면 시연해볼 수 있는 장르별 악기 조회 - token 필요 x - tanstackquery 캐싱
export async function fetchProductGenre(genre: string): Promise<GenreProductList> {
  try {
    const response = await axiosInstance.get('/api/products', {
      params: {
        genre: genre,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Unable to fetch genre product. Please try again later.');
  }
}

// 임시: mockdata 반환
export async function fetchGenreProductList(): Promise<GenreProductList> {
  // TODO: 실제 API 연동 시 아래 mockdata 사용 부분을 제거하세요.
  return mockGenreProductList;
}
