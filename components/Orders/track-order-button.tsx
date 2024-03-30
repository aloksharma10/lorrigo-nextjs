"use client"
import { useModal } from "@/hooks/use-model-store"
import { B2COrderType } from "@/types/types"

export const TrackOrder = ({ order }: { order: B2COrderType }) => {

    const { onOpen } = useModal()

    if (order.awb) {
        return (
            <button className="cursor-pointer" onClick={() => onOpen("trackModal", { order })} >{order.order_reference_id}</button>
        )
    }
    return (
        <span>{order.order_reference_id}</span>
    )
}