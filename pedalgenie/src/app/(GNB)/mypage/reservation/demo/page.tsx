
import DemoCard from "../../_components/demo-card";
import PreviewCard from "../../_components/demo-card";
import CancelModal from "@/components/modal/cancel-modal";


export default function Demo() {
    return (
        <>
            <div className="w-full h-[100dvh-98.5px] flex flex-col overflow-y-auto scrollbar-hide">
                <DemoCard preivewStatus={'시연예정'}/>
                <DemoCard preivewStatus={'시연완료'}/>
                <DemoCard preivewStatus={'취소완료'}/>
            </div>
            <CancelModal/>
        </>

    )
}