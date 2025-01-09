import axiosInstance from "./config/axiosConfig";
import { ShopDetail, ShopList } from "@/types/shop-type";

// 매장 목록 조회 - 로그인한 유저는 access token 필요 - isLiked 확인을 위해 - array 반환
export async function fetchShopList(): Promise<ShopList> {
    try {
        const response = await axiosInstance.get('/shops');
        return response.data.data;
    } catch (error) {
        throw new Error('Unable to fetch shops. Please try again later.');
    }
}

// 매장 상세 조회 - 로그인한 유저는 access token 필요 - isLiked 확인을 위해
export async function fetchShopDetail(shopId: number): Promise<ShopDetail> {
    try {
        const response = await axiosInstance.get(`/shops/${shopId}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Unable to fetch shop detail. Please try again later.');
    }
}