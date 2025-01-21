import { ProductList, ShopProductList } from "./product-type";

// 좋아요한 상점 정보
export interface LikeShop {
    shopId: number;
    shopName: string;
    thumbnailImageUrl: string;
    isLiked?: boolean;
}
export type LikeShopList = LikeShop[];

// 모든 매장 정보 타입
export interface Shop {
    shopId: number;
    shopname: string;
    shopImageUrl: string;
    isLiked?: boolean;
    products: ShopProductList;
}
export type ShopList = Shop[];

// 매장 상세 정보 타입
export interface ShopDetail {
    shopId: number;
    shopname: string;
    description: string;
    address: string;
    contactNumber: string;
    shopHours: string[];
    instrumentCount: number;
    shopImageUrl: string;
    isLiked?: boolean;
    products: ProductList;
}