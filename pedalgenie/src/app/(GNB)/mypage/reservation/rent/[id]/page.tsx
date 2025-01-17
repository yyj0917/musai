'use client';

import EmplyCheckModal from "@/components/modal/employ-check-modal";
import { fetchDemoProductDetail } from "@/lib/api/(product)/demo-product";
import { useModalStore } from "@/lib/zustand/useModalStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import AlertCircle from '@public/svg/alert-circle.svg';

// 예약 정보 박스 데이터
const rentInfoBox = [
    { label: '대여일정', value: '2024.09.17 ~ 2024.09.26' },
    { label: '대여기간', value: '총 10일' },
    { label: '대여금액', value: '300,000원' },
    { label: '픽업일정', value: '2024.09.17 • 오후 1:00' },
    { label: '반납일정', value: '2024.09.26' },
  ];
  
  // 결제 정보 박스 데이터
  const paymentInfoBox = [
    { label: '결제금액', value: '300,000원' },
    { label: '결제방법', value: '무통장 입금' },
    { label: '입금자명', value: '뮤뮤' },
    { label: '결제날짜', value: '2024.09.15' },
  ];
  
  // 대여 안내 데이터
  const rentGuide = [
    '대여를 예약하고 대여료를 입금하면, 관리자가 확인 후 악기를 준비해요.',
    '대여 예약 신청은 픽업 시간 기준 48시간 전까지 가능해요.',
    '악기 픽업 시 대여 상태를 확인하고 픽업 완료 버튼을 눌러주세요. 픽업 이후 사용 중 직접 확인받지 않은 하자에 대한 책임은 사용자에게 부담돼요.',
  ];
  
  // 취소 및 환불 안내 데이터
  const cancellationGuide = [
    '대여 예약 취소는 [주문확인중] 상태까지만 가능하고, 예약 승인이 완료된 이후 상태부터는 개인 사정으로 인한 예약 취소는 원칙적으로 불가능해요.',
    '입금을 완료하고 [픽업예정] 상태가 되더라도 악기점 사정으로 거래가 취소되는 경우 전액 환불이 가능해요.',
    '환불을 원할 때 취소하기 버튼을 통해 취소를 접수하고, 채널톡으로 대여료 환불을 도와드릴게요.',
  ];
  
// demoDate, demoPrice, memberNickName, reservedDate

type RentStatus = '주문확인중' | '픽업예정' | '사용중' | '반납완료' | '취소접수' | '취소완료';

export default function RentDetailPage({ params }: { params: { rentId: number } }) {

    const { rentId } = params;

    if (rentId !== 1) null;

    // 가상 state
    const [rentStatus, setRentStatus] = useState<RentStatus>('사용중'); // 초기 상태 설정

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
                    rentStatus === '픽업예정' || rentStatus === '사용중' ? 'text-green' :
                    rentStatus === '주문확인중' || rentStatus === '반납완료' ? 'text-grey150' :
                    rentStatus === '취소완료' ? 'text-red' : ''
                }`}>{rentStatus}</p>
                {(rentStatus === '주문확인중' || rentStatus === '픽업예정') && (
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
                    {rentInfoBox.map((info, index) => (
                        <div key={index} className={`
                            px-4 py-2 w-full flex justify-start items-center gap-5 border-b-[0.5px] border-grey850
                            ${index === rentInfoBox.length-1 ? 'border-none' : ''}`}>
                            <p className="text-body2 text-grey550 flex-shrink-0">{info.label}</p>
                            <div className="w-full flex justify-between">
                                <p className="text-body2 text-grey150">{info.value}</p>
                                {(rentStatus === '사용중' || rentStatus === '반납완료') && index === 3 && (
                                    <p className="text-body2 text-red">픽업완료</p>
                                )}
                                {rentStatus === '반납완료' && index === 4 && (
                                    <p className="text-body2 text-red">반납완료</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <span className="mt-2 flex justify-start items-center gap-[6px] text-caption2 text-red">
                    <AlertCircle/>
                    <p>반납은 매장 운영시간 1시간 전까지 해주세요</p>
                </span>
            </section>
            {/* 결제 정보 section 일단 마진으로 벌려놓고 나중에 다시 css 간격 수정 */}
            <section className="mb-5 w-full flex flex-col">
                <p className="py-2 text-label1 text-grey150 text-left">결제 정보</p>
                <div className="flex flex-col border-[0.5px] border-grey850">
                    {paymentInfoBox.map((info, index) => (
                        <div key={index} className={`
                            px-4 py-2 w-full flex justify-start items-center gap-5 border-b-[0.5px] border-grey850
                            ${index === rentInfoBox.length-1 ? 'border-none' : ''}`}>
                            <p className="text-body2 text-grey550 flex-shrink-0">{info.label}</p>
                            <p className="text-body2 text-grey150">{info.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 시연 안내 및 취소, 환불 안내 footer */}
            <footer className="w-full flex flex-col gap-5">
                <div className="space-y-1">
                    <h2 className="py-2 text-label1 text-grey150">결제 및 대여 안내</h2>
                    <ul className="text-body2 text-grey450">
                        {rentGuide.map((guide, index) => (
                            <li key={index} className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-grey450">{guide}</li>
                        ))}
                    </ul>
                </div>
                <div className="pb-10 space-y-1">
                    <h2 className="py-2 text-label1 text-grey150">취소 및 환불 안내</h2>
                    <ul className="text-body2 text-grey450">
                        {cancellationGuide.map((guide, index) => (
                            <li key={index} className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-grey450">{guide}</li>
                        ))}
                    </ul>
                </div>
            </footer>
            {(rentStatus === '픽업예정' || rentStatus === '사용중') && (
            <div className="sticky bottom-0 pt-3 pb-[30px] bg-grey1000">
                <button 
                    className="py-4 w-full flex justify-center items-center bg-red text-grey150 text-label1 rounded"
                    onClick={()=>openEmployCheckModal()}>
                    {rentStatus === '픽업예정' ? '픽업 확인 (직원용)' : '반납 확인 (직원용)'}
                </button>
            </div>
            )}
            <EmplyCheckModal status={`${rentStatus === '픽업예정' ? '픽업' : '반납'}`}/>
            
        </div>
    )

}