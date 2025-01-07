import { create } from 'zustand';

interface FilterStore {
  // 정렬 기준 (단일)
  nameFilter: string;
  setNameFilter: (filter: string) => void;

  // 이용 범위 (복수 선택)
  usageConditions: string[];
  toggleUsageCondition: (condition: string) => void;
  resetUsageConditions: () => void;

  // 세부 종류 (복수 선택)
  detailFilters: string[];
  toggleDetailFilter: (detail: string) => void;
  resetDetailFilters: () => void;

  // 현재 Active된 필터들 state
  isActiveCondition: string[];
  setIsActiveCondition: (conditions: string[]) => void;

  isCategoryActiveName: string | null;
  setIsCategoryActiveName: (categoryName: string | null) => void;

  isActiveDetail: string[];
  setIsActiveDetail: (details: string[]) => void;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  nameFilter: '최신순',
  usageConditions: [],
  detailFilters: [],
  isActiveCondition: [],
  isCategoryActiveName: null,
  isActiveDetail: [],

  setNameFilter: (filter) => {
    set({ nameFilter: filter });
  },

  toggleUsageCondition: (condition) => {
    const { usageConditions } = get();
    if (usageConditions.includes(condition)) {
      // 이미 있으면 제거
      set({
        usageConditions: usageConditions.filter((c) => c !== condition),
      });
    } else {
      // 없으면 추가
      set({
        usageConditions: [...usageConditions, condition],
      });
    }
  },
  resetUsageConditions: () => {
    set({ usageConditions: [] });
  },

  toggleDetailFilter: (detail) => {
    const { detailFilters } = get();
    if (detailFilters.includes(detail)) {
      set({
        detailFilters: detailFilters.filter((d) => d !== detail),
      });
    } else {
      set({
        detailFilters: [...detailFilters, detail],
      });
    }
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
