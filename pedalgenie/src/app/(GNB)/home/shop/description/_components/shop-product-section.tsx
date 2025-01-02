"use client";

import { useState } from "react";
import ProductItem from "../../../_components/product";
import ShopDetail from "../../_components/shop-detail";
import dataset from '@/data/dataset.json';
import FilterSpan from "../../../_components/(filter)/filter-span";


export default function ShopProductSection() {
    const { effector } = dataset;
    const [productCount, setProductCount] = useState(52);
    return (
        <section className="
            w-full h-auto flex flex-col justify-center items-center 
            text-head1 text-grey450">
                <p className="px-4 pt-4 pb-1 w-full flex gap-1">
                    <span className="text-title1 text-grey150">전체</span>
                    <span className="text-title1 text-grey550">{productCount}</span>
                </p>
                <FilterSpan/>
                <main className="pt-2 w-full grid grid-cols-2 gap-[2px]">
                    {effector.map((product: any, index: number) => (
                        <ProductItem key={index} product={product}/>
                    ))}
                    
                </main>
        </section>
    );
}
