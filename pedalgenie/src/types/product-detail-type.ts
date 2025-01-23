// 상품 상세 정보 타입
export interface ProductDetail {
  name: string; // productName
  shopId: number;
  shopName: string;
  price: number;
  rentPricePerDay: number;
  isRentable: boolean;
  isPurchasable: boolean;
  isDemoable: boolean;
  descriptionUrl?: string;
  productImage: { imageUrl: string }[];
  isLiked?: boolean | null; // 로그인 여부에 따라 존재
  shopHours: {
    shopHoursId: number;
    dayType: string;
    openTime: string;
    closeTime: string;
    breakStartTime?: string | null;
    breakEndTime?: string | null;
  }[];
  contactNumber: string;
  address: string;
}
