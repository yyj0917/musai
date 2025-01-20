'use client';

import { patchDemoProductStatus } from '@/lib/api/(product)/demo-product';
import { useModalStore } from '@/lib/zustand/useModalStore';
import CloseX from '@public/svg/close-x.svg';
import { useQueryClient } from '@tanstack/react-query';

type EmplyCheckModalProps = {
    status: string;
    id: number;
};

export default function EmployCheckModal({status , id} : EmplyCheckModalProps) {
    const { isEmployCheckOpen, closeEmployCheckModal } = useModalStore();
    
    // refetch를 위한 queryClient
    const queryClient = useQueryClient();

    if (!isEmployCheckOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

    // status에 따라 호출 함수 다르게 -> 시연예약, 픽업, 반납 변경하는 api호출 handleDemoCheck
    const handleStatusUpdate = async () => {
        await patchDemoProductStatus(id);
        closeEmployCheckModal();

        // status 변경 후 변경된 데이터 refetch
        queryClient.invalidateQueries({
            queryKey: ["demoProductDetail", id], // 형태가 일치해야 함.
          });
    }
    return (
        <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={closeEmployCheckModal}>
        <div
            className="relative px-5 pt-[50px] pb-6 bg-grey850 text-center w-[90%] max-w-[320px] max-h-[276px] rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-5 right-5 text-grey450" onClick={closeEmployCheckModal}>
            <CloseX />
            </button>
            <div className="flex flex-col justify-center items-center gap-6">
            <div className="p-0 flex flex-col justify-center items-center gap-[10px]">
                <h2 className="text-title1 text-grey150 flex flex-col">
                <span>직원이신가요?</span>
                <span>{status} 확인이 되었다면</span>
                <span>확인 버튼을 눌러주세요</span>
                </h2>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-1">
                <button onClick={handleStatusUpdate} className='w-full h-11 rounded text-center text-body1 text-grey150 bg-red'>
                    네, 직원이 확인했어요
                </button>
                <button onClick={closeEmployCheckModal} className="w-full h-11 text-center text-grey150 text-body1">
                    아니요, 잘못 눌렀어요
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}
