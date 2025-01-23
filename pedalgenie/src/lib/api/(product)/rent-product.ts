import { RentProductDetail, RentProductList } from '@/types/product-type';
import axiosInstance from '../config/axiosConfig';


// 시연 상품 목록 조회 api - token 필요 - tanstackquery 캐싱
export async function fetchRentProductList(): Promise<RentProductList> {
    try {
        const response = await axiosInstance.get('/rents/list');
        return response.data.data;
    } catch (error) {
        console.log(error);

        throw new Error('Unable to fetch demo products. Please try again later.');
    }
}

// 시연 상품 상세 조회 api - token 필요 - tanstackquery 캐싱
export async function fetchRentProductDetail(rentId: number): Promise<RentProductDetail> {
    try {
        const response = await axiosInstance.get(`/rents/${rentId}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Unable to fetch demo product detail. Please try again later.');
    }
}