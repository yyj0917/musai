"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import DownArrow from '@public/svg/home/down-arrow.svg';
import UpDownArrow from '@public/svg/home/updown-arrow.svg';
import ProductItem from "./product";
import FilterModal from "./filter-modal";

export default function ProductSection({product} : any) {
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterType, setFilterType] = useState<'name' | 'condition' | 'detail'>('name');

    const handleOpenModal = (type: 'name' | 'condition' | 'detail') => {
        setFilterType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const category =['전체', '기타', '베이스', '키보드', '드럼', '현악기'];

    const handleScroll = (targetId : any, item : any) => {
        setSelectedCategory(item);
        const targetSection = document.getElementById(targetId);
        const mainContainer = document.getElementById("main");
        if (targetSection && mainContainer) {
            const scrollPosition = targetSection.offsetTop;
            mainContainer.scrollTo({ top: scrollPosition-100, behavior: "smooth" });
        }
    };
    return (
        <section className="mt-11">
            <div id='product-section' className="w-full flex flex-col">
                <nav className="px-4 w-full flex justify-between items-center">
                    {category.map((item, index) => (
                        <Button 
                            key={index}
                            variant="primary"
                            className={`${
                                selectedCategory === item ? "bg-white text-black !text-body1" : ""
                            }`}
                            onClick={() => handleScroll("product-section", item)}
                        >{item}</Button>
                    ))}
                </nav>
                {/* filter span */}
                <span className="mt-4 mb-5 pl-4 w-full flex gap-2">
                    <Button 
                        variant="filter" 
                        className="gap-[2px] bg-grey750"
                        onClick={() => handleOpenModal('name')}
                        >
                        <div className="flex items-center gap-[1px]" >
                            <UpDownArrow/>
                            <span>이름순</span>
                        </div>
                    </Button>
                    <Button 
                        variant="filter" 
                        className="gap-[1px]"
                        onClick={() => handleOpenModal('condition')}
                        >
                        <div className="flex items-center gap-[1px]">
                            <span>이용조건</span>
                            <DownArrow/>
                        </div>
                    </Button>
                    <Button 
                        variant="filter" 
                        className="gap-[1px]"
                        onClick={() => handleOpenModal('detail')}
                        >
                    <div className="flex items-center gap-[1px]">
                            <span>세부종류</span>
                            <DownArrow/>
                        </div>
                    </Button>
                </span>
                <main className="w-full grid grid-cols-2 gap-[2px]">
                    {product.map((product: any, index: number) => (
                        <ProductItem key={index} product={product}/>
                        // <section key={index} className="w-full flex gap-[2px]">
                        //     <ProductItem/>
                        // </section>
                    ))}
                    
                </main>
                <FilterModal isOpen={isModalOpen} onClose={handleCloseModal} filterType={filterType} />
            </div>
        </section>
    )
}