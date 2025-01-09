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
    id: number;
    shopname: string;
    isLiked?: boolean;
    products: ShopProductList;
}
export type ShopList = Shop[];

// 매장 상세 정보 타입
export interface ShopDetail {
    id: number;
    shopname: string;
    address: string;
    contactNumber: string;
    businessHours: string;
    imageUrl: string;
    isLiked?: boolean;
    products: ProductList;
}