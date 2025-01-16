import { ProductList } from "@/types/product-type";
import axiosInstance from "../config/axiosConfig";
import { SearchItem } from "@/types/search-type";

interface FetchProductListParams {
    category?: string;
    isRentable?: boolean;
    isPurchasable?: boolean;
    isDemoable?: boolean;
    sortBy?: string;
    subCategoryIds?: string[]; // Assuming subCategoryIds are sent as a comma-separated list
    page?: number;
    size?: number;
  }
  
// 상품 목록 조회 - category, filter, sort, page, size로 - tanstackquery 캐싱
export async function fetchProductList(params: FetchProductListParams): Promise<ProductList> {
    try {
      const {
        category,
        isRentable,
        isPurchasable,
        isDemoable,
        sortBy,
        subCategoryIds,
        page,
        size = 10, // Default size is 10
      } = params;
  
      const queryParams = new URLSearchParams();
  
      if (category) queryParams.append('category', category);
      if (isRentable !== undefined) queryParams.append('isRentable', String(isRentable));
      if (isPurchasable !== undefined) queryParams.append('isPurchasable', String(isPurchasable));
      if (isDemoable !== undefined) queryParams.append('isDemoable', String(isDemoable));
      if (sortBy) queryParams.append('sortBy', sortBy);
      if (subCategoryIds && subCategoryIds.length > 0) {
        queryParams.append('subCategoryIds', subCategoryIds.join(','));
      }
      if (page !== undefined) queryParams.append('page', String(page));
      queryParams.append('size', String(size));
  
      const response = await axiosInstance.post(`/products/search?${queryParams.toString()}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw new Error('Unable to fetch product list. Please try again later.');
    }
}

// 상품, 매장 검색 api - 로그인했으면 토큰 o - tanstackquery 캐싱
export async function fetchSearchItem(keyword: string): Promise<SearchItem> {
    try {
      const response = await axiosInstance.get(`/api/search`, {
        params: {
          keyword,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product search:', error);
      throw new Error('Unable to fetch product search. Please try again later.');
    }
}