
// 아티클 상세 조회에 달릴 상품 정보
export interface ArticleProduct {
    id: number;
    name: string;
    shopName: string;
    rentPricePerDay: number;
    thumbnailImageUrl: string;
}
export type ArticleProductList = ArticleProduct[];

// 첫 홈화면 시연해볼 수 있는 장르별 악기 목록 조회 타입
export interface Product {
    id: number;
    shopName: string;
    shopId: number;
    name: string;
    rentPricePerDay: number;
    isRentable: boolean;
    isPurchasable: boolean;
    isDemoable: boolean;
    imageUrl: string;
    isLiked?: boolean;
}
export type ProductList = Product[];

// 매장 목록 조회에 사용될 products 타입
export interface ShopProduct {
    id: number;
    name: string;
    rentPricePerDay: number;
    thumbnailImage: string;
    isLiked?: boolean;
}
export type ShopProductList = ShopProduct[];

// 시연 상품 목록 조회 api - token 필요 - tanstackquery 캐싱
export interface DemoProduct {
    demoId: number;
    demoStatus: string;
    demoDate: string;
    productName: string;
    productThumbnailImageUrl: string;
    shopName: string;
    shopAddress: string;
}
export type DemoProductList = DemoProduct[];

// 시연 상품 상세 조회 api - token 필요 - tanstackquery 캐싱
export interface DemoProductDetail {
    demoId: number;
    demoStatus: string;
    demoDate: string;
    reservedDate: string;
    productName: string;
    productThumbnailImageUrl: string;
    shopName: string;
    shopAddress: string;
    memberNickName: string;
}