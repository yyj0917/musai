
import PreviewCard from "../../_components/preview-card";
import CancelModal from "@/components/cancel-modal";


export default function Preview() {
    return (
        <>
            <div className="w-full h-[100dvh-98.5px] flex flex-col overflow-y-auto scrollbar-hide">
                <PreviewCard preivewStatus={'시연예정'}/>
                <PreviewCard preivewStatus={'시연완료'}/>
                <PreviewCard preivewStatus={'취소완료'}/>
            </div>
            <CancelModal/>
        </>

    )
}