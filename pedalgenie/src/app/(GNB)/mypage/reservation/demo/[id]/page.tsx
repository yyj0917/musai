'use client';

import EmplyCheckModal from "@/components/modal/employ-check-modal";
import { fetchDemoProductDetail } from "@/lib/api/(product)/demo-product";
import { useModalStore } from "@/lib/zustand/useModalStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const demoInfoBox = [
    { label: '시연일정', value: '2024.09.17 오후 1:00' },
    { label: '시연금액', value: '무료' },
    { label: '예약자명', value: '뮤뮤' },
    { label: '예약날짜', value: '2024.09.15' },
];
const demoGuide = [
    '시연 예약을 신청하면 관리자가 해당 시간대의 가능 여부를 확인하고, 예약 상태를 변경해요',
    '시연 예약 신청은 시연하고자 하는 시간 기준 24시간 전까지 가능해요',
    '시연 해보고 싶은 다른 사람들도 있으니 노쇼는 안돼요',
    '시연 방문 시 금속제 악세사리나 지퍼 등 악기에 상처가 생길 수 있는 의류는 지양해주세요',
    '안내 사항을 숙지하고 악기점에 방문하면 사장님의 안내를 따라주세요',
]
// demoDate, demoPrice, memberNickName, reservedDate

type DemoStatus = '시연예정' | '시연완료' | '취소완료';

export default function DemoDetailPage({ params }: { params: { demoId: number } }) {

    const { demoId } = params;

    if (demoId !== 1) null;

    // 가상 state
    const [demoStatus, setDemoStatus] = useState<DemoStatus>('시연예정'); // 초기 상태 설정

    const { openEmployCheckModal } = useModalStore();

    // useEffect(() => {
    //     const fetchDemoInfo = async () => {
    //         const demoDetail = await fetchDemoProductDetail(demoId);
    //     }
    //     fetchDemoInfo();
    // }, [demoId]);



    return (
        <div className="relative px-4 w-full flex flex-col">
            {/* 예약 상태 확인 nav 파트 */}
            <nav className="-mx-4 py-3 flex justify-between items-center border-b-[0.5px] border-grey850">
                {/* <p className="text-body1 text-grey150">{demoDetail.demoStatus}</p> */}
                <p className={`pl-4 text-body1
                ${
                    demoStatus === '시연예정' ? 'text-green' :
                        demoStatus === '시연완료' ? 'text-grey150' :
                            demoStatus === '취소완료' ? 'text-red' : ''
                }`}>{demoStatus}</p>
                {demoStatus !== '시연완료' && demoStatus !== '취소완료' && (
                    <button className="pr-4 text-grey550 text-body2">취소하기</button>
                )}
            </nav>
            {/* 상품 정보 카드 */}
            <div className="py-5 w-full flex justify-between items-center">
                <Image
                    src={'/img/preview-card.jpg'}
                    alt="preview card"
                    width={100}
                    height={100}
                    className="rounded-[2px]" />
                <div className="w-auto h-[100px] flex flex-col justify-start gap-1">
                    <h2 className="max-w-[227px] max-h-[54px] text-body1 text-grey150 line-clamp-2">제품 이름은 MAX W227, MAX H54입니다.</h2>
                    <p className="flex justify-start text-caption2 text-grey550">
                        <span>매장명 ㅣ </span>
                        <span>서울뮤즈악기</span>
                    </p>
                </div>
            </div>
            {/* 예약 정보 section 일단 마진으로 벌려놓고 나중에 다시 css 간격 수정 */}
            <section className="mb-5 w-full flex flex-col">
                <p className="py-2 text-label1 text-grey150 text-left">예약 정보</p>
                <div className="flex flex-col border-[0.5px] border-grey850">
                    {demoInfoBox.map((info, index) => (
                        <div key={index} className={`
                            px-4 py-2 w-full flex justify-start items-center gap-5 border-b-[0.5px] border-grey850
                            ${index === demoInfoBox.length-1 ? 'border-none' : ''}`}>
                            <p className="text-body2 text-grey550 flex-shrink-0">{info.label}</p>
                            <div className="w-full flex justify-between">
                                <p className="text-body2 text-grey150">{info.value}</p>
                                {demoStatus === '시연완료' && index === 0 && (
                                    <p className="text-body2 text-red">시연완료</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* 시연 안내 및 취소, 환불 안내 footer */}
            <footer className="w-full flex flex-col gap-5">
                <div className="space-y-1">
                    <h2 className="py-2 text-label1 text-grey150">시연 안내</h2>
                    <ul className="text-body2 text-grey450">
                        {demoGuide.map((guide, index) => (
                            <li key={index} className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-grey450">{guide}</li>
                        ))}
                    </ul>
                </div>
                <div className='pb-10 flex flex-col'>
                    <h2 className="py-2 text-label1 text-grey150">취소 및 환불 안내</h2>
                    <p className="text-body2 text-grey450 relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-grey450">
                        취소는 1시간 이전에 취소하기 버튼을 통해 진행해주세요
                    </p>
                </div>
            </footer>
            {demoStatus === '시연예정' && (
            <div className="sticky bottom-0 pt-3 pb-[30px] bg-grey1000">
                <button 
                    className="py-4 w-full flex justify-center items-center bg-red text-grey150 text-label1 rounded"
                    onClick={()=>openEmployCheckModal()}>
                    시연 확인 (직원용)
                </button>
            </div>
            )}
            <EmplyCheckModal status={'시연 예약'}/>
            
        </div>
    )

}