import { ProductList } from '@/types/product-type';
import axiosInstance from '../config/axiosConfig';
import { SearchItem } from '@/types/search-type';
import { mockProductList } from '@/mockdata/product.mock';

export interface FetchProductListParams {
  category?: string;
  isRentable?: boolean;
  isPurchasable?: boolean;
  isDemoable?: boolean;
  sortBy?: string;
  subCategoryNames?: string; // Assuming subCategoryIds are sent as a comma-separated list
  page?: number | unknown;
  size?: number;
}

// 상품 목록 조회 - category, filter, sort, page, size로 - tanstackquery 캐싱
export async function fetchProductList(params: FetchProductListParams): Promise<ProductList> {
  // try {
  //   const response = await axiosInstance.get('/api/products/search', {
  //     params: params,
  //   });
  //   return response.data.data;
  // } catch (error) {
  //   throw new Error('Unable to fetch product list. Please try again later.');
  // }
  return mockProductList;
}

// 상품, 매장 검색 api - 로그인했으면 토큰 o - tanstackquery 캐싱
export async function fetchSearchItem(keyword: string): Promise<SearchItem> {
  try {
    const response = await axiosInstance.get('/api/search', {
      params: {
        keyword,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Unable to fetch product search. Please try again later.');
  }
}
