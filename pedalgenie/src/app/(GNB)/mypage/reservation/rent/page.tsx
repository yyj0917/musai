
import DemoCard from "../../_components/demo-card";
import PreviewCard from "../../_components/demo-card";
import CancelModal from "@/components/modal/cancel-modal";
import RentCard from "../../_components/rent-card";


export default function Rent() {
    return (
        <>
            <div className="w-full h-[100dvh-98.5px] flex flex-col overflow-y-auto scrollbar-hide">
                <RentCard preivewStatus={'주문확인중'}/>
                <RentCard preivewStatus={'픽업예정'}/>
                <RentCard preivewStatus={'사용중'}/>
                <RentCard preivewStatus={'반납완료'}/>
                <RentCard preivewStatus={'취소접수'}/>
                <RentCard preivewStatus={'취소완료'}/>
            </div>
            <CancelModal/>
        </>

    )
}