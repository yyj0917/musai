import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FetchProductListParams, fetchProductList } from '../api/(product)/product';
import { ProductList } from '@/types/product-type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// product-section에서 한글 카테고리 api 요구 params로 변환해주는 함수
export function mapCategoryToParam(category: string | undefined): string | undefined {
  switch (category) {
    case '기타':
      return 'GUITA'; // 또는 'GUITAR' (API 스펙에 맞춰 수정)
    case '베이스':
      return 'BASE';
    case '키보드':
      return 'KEYBOARD';
    case '드럼':
      return 'DRUM';
    case '관현악':
      return 'ORCHESTRA';
    case '전체':
    default:
      return undefined; // '전체'이면 category 파라미터를 생략
  }
}

// product-section에서 정렬기준 필터 api 요구 params로 변환해주는 함수
export function mapFilterToSortBy(nameFilter: string): string {
  switch (nameFilter) {
    case '최신순':
      return 'RECENT';
    case '이름순':
      return 'NAME_ASC';
    case '좋아요순':
      return 'LIKE_DESC';
    default:
      return 'RECENT'; // 기본값
  }
}

// product-section에서 이용조건 필터 api 요구 params로 변환해주는 함수
export function mapUsageConditions(usageConditions: string[]): {
  isRentable?: boolean;
  isPurchasable?: boolean;
  isDemoable?: boolean;
} {
  // 타입 고치기
  const result: any = {};

  console.log('usageConditions:', usageConditions);
  if (usageConditions.includes('대여 가능')) {
    result.isRentable = true;
  }
  if (usageConditions.includes('구매 가능')) {
    result.isPurchasable = true;
  }
  if (usageConditions.includes('시연 가능')) {
    result.isDemoable = true;
  }
  return result;
}

