"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import DownArrow from '@public/svg/home/down-arrow.svg';
import UpDownArrow from '@public/svg/home/updown-arrow.svg';
import ProductItem from "./product";

export default function ProductSection() {
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');

    const category =['전체', '기타', '베이스', '키보드', '드럼', '현악기'];

    return (
        <div className="w-full flex flex-col">
            <nav className="px-4 w-full flex items-center">
                {category.map((item, index) => (
                    <Button 
                        key={index}
                        variant="primary"
                        className={`${
                            selectedCategory === item ? "bg-white text-black !text-body1" : ""
                          }`}
                        onClick={() => setSelectedCategory(item)}
                    >{item}</Button>
                ))}
            </nav>
            {/* filter span */}
            <span className="mt-4 mb-5 pl-4 w-full flex gap-2">
                <Button variant="filter" className="gap-[2px] bg-grey750">
                    <UpDownArrow/>
                    <span>이름순</span>
                </Button>
                <Button variant="filter" className="">시연가능</Button>
                <Button variant="filter" className="gap-[1px]">
                    <span>세부종류</span>
                    <DownArrow/>
                </Button>
            </span>
            <main className="w-full flex gap-[2px]">
                <ProductItem/>
                <ProductItem/>

            </main>
        </div>
    )
}