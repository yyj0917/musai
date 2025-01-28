import { create } from 'zustand';
import qs from 'query-string';

interface FilterStore {
  // 정렬 기준 (단일)
  nameFilter: string;
  setNameFilter: (filter: string) => void;

  // 이용 범위 (복수 선택)
  usageConditions: string[];
  toggleUsageCondition: (condition: string[]) => void;
  resetUsageConditions: () => void;

  // 세부 종류 (복수 선택)
  detailFilters: string[];
  toggleDetailFilter: (detail: string[]) => void;
  resetDetailFilters: () => void;

  // 현재 Active된 필터들 state
  isActiveCondition: string[];
  setIsActiveCondition: (conditions: string[]) => void;

  isCategoryActiveName: string | null;
  setIsCategoryActiveName: (categoryName: string | null) => void;

  isActiveDetail: string[];
  setIsActiveDetail: (details: string[]) => void;
}

// 상태 초기화: URL 쿼리에서 가져오기
const initialState = (() => {
  if (typeof window === 'undefined') {
    return {
      selectedCategory: undefined,
      nameFilter: '최신순',
      usageConditions: [],
      detailFilters: [],
    };
  }
  const queryParams = qs.parse(window.location.search, {
    parseBooleans: true,
    parseNumbers: true,
  });
  return {
    selectedCategory: queryParams.category as string | undefined,
    nameFilter: (queryParams.nameFilter as string) || '최신순',
    usageConditions: (queryParams.usageConditions as string)?.split(',') || [],
    detailFilters: (queryParams.detailFilters as string)?.split(',') || [],
  };
})();

export const useFilterStore = create<FilterStore>((set) => ({
  nameFilter: initialState.nameFilter,
  usageConditions: initialState.usageConditions,
  detailFilters: initialState.detailFilters,
  isActiveCondition: [],
  isCategoryActiveName: null,
  isActiveDetail: [],

  setNameFilter: (filter) => {
    set({ nameFilter: filter });
  },

  toggleUsageCondition: (condition: string[]) => {
    set({
      usageConditions: condition,
    });
  },
  resetUsageConditions: () => {
    set({ usageConditions: [] });
  },

  // query Key 변경 때 배열로 한번에 넘겨주기 위해
  toggleDetailFilter: (details: string[]) => {

    // 상태 업데이트
    set({
      detailFilters: details,
    });
  },
  resetDetailFilters: () => {
    set({ detailFilters: [] });
  },
  // 추가 상태 메서드
  setIsActiveCondition: (conditions) => {
    set({ isActiveCondition: conditions });
  },

  setIsCategoryActiveName: (categoryName) => {
    set({ isCategoryActiveName: categoryName });
  },

  setIsActiveDetail: (details) => {
    set({ isActiveDetail: details });
  },
}));
