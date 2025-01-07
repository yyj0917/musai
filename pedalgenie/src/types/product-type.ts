
// 아티클 상세 조회에 달릴 상품 정보
export interface ArticleProduct {
    id: number;
    name: string;
    shopName: string;
    rentPricePerDay: number;
    thumbnailImageUrl: string;
}
export type ArticleProductList = ArticleProduct[];