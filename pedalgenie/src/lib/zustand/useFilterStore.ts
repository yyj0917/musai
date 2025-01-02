import { create } from "zustand"


interface FilterStore {
  // 정렬 기준 (단일)
  nameFilter: string
  setNameFilter: (filter: string) => void

  // 이용 범위 (복수 선택)
  usageConditions: string[]
  toggleUsageCondition: (condition: string) => void
  resetUsageConditions: () => void

  // 세부 종류 (복수 선택)
  detailFilters: string[]
  toggleDetailFilter: (detail: string) => void
  resetDetailFilters: () => void
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  nameFilter: "최신순",
  usageConditions: [],
  detailFilters: [],

  setNameFilter: (filter) => {
    set({ nameFilter: filter })
  },

  toggleUsageCondition: (condition) => {
    const { usageConditions } = get()
    if (usageConditions.includes(condition)) {
      // 이미 있으면 제거
      set({
        usageConditions: usageConditions.filter((c) => c !== condition),
      })
    } else {
      // 없으면 추가
      set({
        usageConditions: [...usageConditions, condition],
      })
    }
  },
  resetUsageConditions: () => {
    set({ usageConditions: [] })
  },

  toggleDetailFilter: (detail) => {
    const { detailFilters } = get()
    if (detailFilters.includes(detail)) {
      set({
        detailFilters: detailFilters.filter((d) => d !== detail),
      })
    } else {
      set({
        detailFilters: [...detailFilters, detail],
      })
    }
  },
  resetDetailFilters: () => {
    set({ detailFilters: [] })
  },
}))
