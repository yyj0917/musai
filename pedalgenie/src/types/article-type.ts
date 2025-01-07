import { ArticleProductList } from "./product-type";

// 아티클 목록 조회 타입
export interface ArticleData {
    articleId: number;
    title: string;
    hashTag: string[];
    thumbnailUrl: string;
}
export type ArticleList = ArticleData[];

// 아티클 상세 조회 타입
export interface ArticleDetail {
    articleId: number;
    title: string;
    hashTag: string[];
    thumbnailUrl: string;
    bodyUrl: string;
    products: ArticleProductList;
}