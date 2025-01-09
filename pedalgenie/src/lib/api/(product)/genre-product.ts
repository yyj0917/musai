import { GenreProductList } from "@/types/product-type";
import axiosInstance from "../config/axiosConfig";

// 첫 홈화면 시연해볼 수 있는 장르별 악기 조회 - token 필요 x
export async function fetchProductGenre(genre : string): Promise<GenreProductList> {
    try {
      const response = await axiosInstance.get('/products', {
        params: {
            genre: {genre}
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw new Error('Unable to fetch articles. Please try again later.');
    }
  }