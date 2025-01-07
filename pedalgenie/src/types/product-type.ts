
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
export interface GenreProduct {
    id: number;
    shopName: string;
    name: string;
    rentPricePerDay: number;
    isRentable: boolean;
    isPurchasable: boolean;
    isDemoable: boolean;
    thumbnailImageUrl: string;
}
export type GenreProductList = GenreProduct[];