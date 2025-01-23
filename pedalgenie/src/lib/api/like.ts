import { LikeShopList } from '@/types/shop-type';
import axiosInstance from "./config/axiosConfig";
import { ProductList } from '@/types/product-type';

// 악기 좋아요 post 요청 - header bearer type access token 필요
export async function likeProduct(productId: number): Promise<void> {
    try {
        await axiosInstance.post(`/likes/products/${productId}`);
    } catch (error) {
      throw new Error('Unable to like product. Please try again later.');
    }
}

// 악기 좋아요 delete 요청 - header bearer type access token 필요
export async function unlikeProduct(productId: number): Promise<void> {
    try {
        await axiosInstance.delete(`/likes/products/${productId}`);
    } catch (error) {
      throw new Error('Unable to unlike product. Please try again later.');
    }
}

// 좋아요한 악기 목록 조회 - header bearer type access token 필요 - tanstackquery 캐싱
export async function fetchLikedProductList(): Promise<ProductList> {
    try {
        const response = await axiosInstance.get('/likes/products');
        return response.data.data;
    } catch (error) {
        throw new Error('Unable to fetch liked products. Please try again later');
    }
}

// 가게 좋아요 post 요청 - header bearer type access token 필요
export async function likeShop(shopId: number): Promise<void> {
    try {
        await axiosInstance.post(`/likes/shops/${shopId}`);
    } catch (error) {
      throw new Error('Unable to like product. Please try again later.');
    }
}

// 가게 좋아요 delete 요청 - header bearer type access token 필요
export async function unlikeShop(shopId: number): Promise<void> {
    try {
        await axiosInstance.delete(`/likes/shops/${shopId}`);
    } catch (error) {
      throw new Error('Unable to unlike product. Please try again later.');
    }
}

// 좋아요한 가게 목록 조회 - header bearer type access token 필요 - tanstackquery 캐싱
export async function fetchLikedShopList(): Promise<LikeShopList> {
    try {
        const response = await axiosInstance.get('/likes/shops');
        return response.data.data;
    } catch (error) {
        throw new Error('Unable to fetch liked products. Please try again later');
    }
}