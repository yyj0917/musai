import { ProductList, ShopProductList } from "./product-type";

// 좋아요한 상점 정보
export interface LikeShop {
    shopId: number;
    shopName: string;
    thumbnailImageUrl: string;
}
export type LikeShopList = LikeShop[];

// 모든 매장 정보 타입
export interface Shop {
    shopId: number;
    shopname: string;
    // thumbnailImageUrl: string;
    isLiked?: boolean;
    products: ShopProductList;
}
export type ShopList = Shop[];

// 매장 상세 정보 타입
export interface ShopDetail {
    shopId: number;
    shopname: string;
    address: string;
    contactNumber: string;
    businessHours: string;
    instrumentCount: number;
    imageUrl: string;
    isLiked?: boolean;
    products: ProductList;
}