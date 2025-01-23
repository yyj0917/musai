
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
    shopName?: string;
    shopId?: number;
    name: string;
    rentPricePerDay: number;
    isRentable?: boolean;
    isPurchasable?: boolean;
    isDemoable?: boolean;
    imageUrl: string;
    isLiked?: boolean;
}
export type ProductList = Product[];

// 임시 장르별 악기 목록 타입

export type GenreProductList = Product[];

// 매장 목록 조회에 사용될 products 타입

export type ShopProductList = Product[];

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
// 시연 상태 변경 patch api response type
export interface PatchDemoProductStatus {
    demoId: number;
    demoStatus: string;
    demoDate: string;
    editedDate: string;
}


// 대여 상품 목록 조회 api - token 필요 - tanstackquery 캐싱
export interface RentProduct {
    rentId: number;
    rentStatus: string;
    rentStartTime: string;
    rentEndTime: string;
    pickUpTime: string;
    productId: number;
    productName: string;
    productImageUrl: string;
    shopName: string;
    shopDetailAddress: string;
}
export type RentProductList = RentProduct[];

// 대여 상품 상세 조회 api - token 필요 - tanstackquery 캐싱
export interface RentProductDetail {
    rentId: number;
    rentStatus: string;
    productName: string;
    productImage: string;
    shopName: string;
    shopDetailAddress: string;
    rentStartDate: string;
    rentEndDate: string;
    rentDuration: number;
    price: number;
    rentStartDateTime: string;
    memberNickName: string;
    paymentDate: string;
}
