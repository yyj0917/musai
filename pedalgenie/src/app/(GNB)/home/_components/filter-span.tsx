import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/lib/zustand/useFilterStore";
import DownArrow from '@public/svg/home/down-arrow.svg';

type FilterProps = {
    handleOpenModal: (filterType: 'name' | 'condition' | 'detail') => void;
}
export default function FilterSpan({ handleOpenModal }: FilterProps) {

    const { nameFilter, usageConditions, detailFilters } = useFilterStore()

    const detailLabel = () => {
        // 선택된 세부 종류 배열
        if (detailFilters.length === 0) {
          // 디폴트 문구
          return "세부조건"
        } else if (detailFilters.length === 1) {
          // 단일 항목
          return detailFilters[0]
        } else {
          // 2개 이상
          return `${detailFilters[0]} 외 ${detailFilters.length - 1}`
        }
      }

    const usageLabel = () => {
        if (usageConditions.length === 0) {
          return "이용범위"
        } else if (usageConditions.length === 1) {
          return usageConditions[0]
        } else {
          return `${usageConditions[0]} 외 ${usageConditions.length - 1}`
        }
      }
      
      

    return (
        <span className="pl-4 py-5 w-full flex gap-2">
            <Button 
                variant="filter" 
                className="gap-[2px] border-red bg-darkRed"
                onClick={() => handleOpenModal('name')}
                >
                <div className="flex items-center gap-[2px]" >
                    <span>{nameFilter}</span>
                    <DownArrow/>
                </div>
            </Button>
            <Button 
                variant="filter" 
                className={`gap-[2px]
                ${detailFilters.length >= 1 ? "border-red bg-darkRed" : ""}`}
                onClick={() => handleOpenModal('detail')}
                >
                <div className="flex items-center gap-[2px]">
                    <span>{detailLabel()}</span>
                    <DownArrow/>
                </div>
            </Button>
            <Button 
                variant="filter" 
                className={`gap-[2px]
                ${usageConditions.length >= 1 ? "border-red bg-darkRed" : ""}`}
                onClick={() => handleOpenModal('condition')}
                >
                <div className="flex items-center gap-[2px]">
                    <span>{usageLabel()}</span>
                    <DownArrow/>
                </div>
            </Button>
            
        </span>
    )
}