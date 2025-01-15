'use client';

import { useModalStore } from "@/lib/zustand/useModalStore";
import Image from "next/image";
import { useState } from "react";

export default function PreviewCard({preivewStatus} : {preivewStatus: string}) {
    const { openCancelModal } = useModalStore();

    return (
        <section className="px-4 py-5 w-full flex flex-col justify-center items-center gap-2">
            {/* 상품 현재 시연관련 상태 및 취소하기 버튼 */}
            <nav className="w-full flex justify-between items-center">
                <p
                    className={`text-body1 ${
                        preivewStatus === '시연예정'
                        ? 'text-green'
                        : preivewStatus === '시연완료'
                        ? 'text-grey150'
                        : 'text-red'
                    }`}
                >
                    {preivewStatus}
                </p>
                {preivewStatus === '시연예정' && (
                    <button
                    onClick={() => openCancelModal()}
                    className="text-body2 text-grey550"
                    >
                    취소하기
                    </button>
                )}
            </nav>
            <div className="w-full flex justify-between items-center">
                <Image 
                    src={'/img/preview-card.jpg'}
                    alt="preview card"
                    width={100}
                    height={100}
                    className="rounded-[2px]" />
                <div className="w-auto flex flex-col gap-2">
                    <div className="w-auto flex flex-col justify-start">
                        <h2 className="max-w-[227px] text-body1 text-grey150 line-clamp-1">제품 이름은 MAX W227, MAX H54입니다.</h2>
                        <p className="flex justify-start text-caption2 text-grey550">
                            <span>매장명 ㅣ </span>
                            <span>서울뮤즈악기</span>
                        </p>
                    </div>
                    <div className="w-auto flex flex-col gap-1">
                        <span className="w-full flex justify-start gap-2">
                            <span className="px-[6px] py-[3px] rounded bg-darkRed text-red text-caption2">대여기간</span>
                            <p className="text-body2 text-grey150">2024.09.17 - 2024.09.24</p>
                        </span>
                        <span className="w-full flex justify-start gap-2">
                            <span className="px-[6px] py-[3px] rounded bg-darkRed text-red text-caption2">픽업일정</span>
                            <p className="text-body2 text-grey150">2024.09.17 오후 1:00</p>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}