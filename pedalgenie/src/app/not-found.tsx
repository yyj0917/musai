'use client';

import { useRouter } from "next/navigation";
import SymbolLogo from "@public/svg/symbol-logo.svg";

// not found page
export default function NotFound() {
    const router = useRouter();
    
    return (
        <div className="relative h-[100dvh] min-w-[360px] max-w-[415px] lg:max-w-[375px] mx-auto bg-grey1000">
            <div className=" w-full h-full flex flex-col justify-center items-center overflow-hidden">
                <div className="mb-16 flex flex-col items-center gap-[14px] text-grey650 text-body1">
                    <SymbolLogo/>
                    <p>해당 페이지를 찾을 수 없습니다</p>
                </div>
                <div className="absolute bottom-[30px] px-4 w-full h-[52px] flex gap-2 text-label1 text-grey150">
                    <button 
                        onClick={() => router.back()}
                        className="bg-grey750 rounded flex-1 flex justify-center items-center">뒤로 가기</button>
                    <button 
                        onClick={() => router.push('/')}
                        className="bg-red rounded flex-1 flex justify-center items-center">홈으로 가기</button>
                </div>
            </div>
        </div>
    )
}