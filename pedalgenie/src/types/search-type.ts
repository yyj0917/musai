import { ProductList } from "./product-type";

export type SearchShop = {
    shopId: number;
    shopname: string;
    imageUrl: string;
    isLiked?: boolean;
    description: string;
}
// 검색 매장, 상품 타입 - Item
export type SearchItem = {
    products: ProductList;
    shops: SearchShop[];
    totalProducts: number;
    totalShops: number;
}