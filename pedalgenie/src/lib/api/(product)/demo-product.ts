import { DemoProductDetail, DemoProductList, PatchDemoProductStatus } from '@/types/product-type';
import axiosInstance from '../config/axiosConfig';

// 시연 상품 목록 조회 api - token 필요 - tanstackquery 캐싱
export async function fetchDemoProductList(): Promise<DemoProductList> {
  try {
    const response = await axiosInstance.get('/demos');
    return response.data.data;
  } catch (error) {
    throw new Error('Unable to fetch demo products. Please try again later.');
  }
}

// 시연 상품 상세 조회 api - token 필요 - tanstackquery 캐싱
export async function fetchDemoProductDetail(demoId: number): Promise<DemoProductDetail> {
  try {
    const response = await axiosInstance.get(`/demos/${demoId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Unable to fetch demo product detail. Please try again later.');
  }
}

// 시연 상품 확인 -> 시연 상태 변경 api patch(특정 필드만 업데이트하는 용도) - token 필요
export async function patchDemoProductStatus(demoId: number): Promise<PatchDemoProductStatus> {
  try {
    const response = await axiosInstance.patch(`/demos/${demoId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Unable to patch demo product status. Please try again later');
  }
}
