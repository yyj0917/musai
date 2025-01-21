import axiosInstance from '../config/axiosConfig';
import { ProductDetail } from '@/types/product-detail-type';

// 상품 상세 조회 api - 로그인 했으면 토근 o
export async function fetchProductDetail(productId: number): Promise<ProductDetail> {
  try {
    const response = await axiosInstance.get(`/api/products/${productId}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error('Unable to fetch product detail. Please try again later.');
  }
}
