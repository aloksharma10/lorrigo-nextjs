"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatusTable } from "./order-status-table";
import { columns } from "./order-status-col";
import { useEffect } from "react";
import { useSellerProvider } from "../providers/SellerProvider";
import { useSearchParams } from "next/navigation";

export default function Orders() {

    const { getAllOrdersByStatus, orders } = useSellerProvider()

    const searchParams = useSearchParams()
    const status = searchParams.get("status")

    useEffect(() => {
        async function fetchData() {
            await getAllOrdersByStatus(status ? status : "all")
        }
        fetchData()
    }, [status])

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle className="md:flex justify-between space-y-3">
                    View Shipment
                    <div className="md:flex space-y-3 md:space-y-0 md:space-x-3 mt-6 md:mt-0">
                        {/* <DatePickerWithRange date={date} setDate={()=>setDate} disabledDates={{ after: new Date() }} /> */}
                        {/* <form action={() => handleSendReport(tableData.data, date)}>
                            <SendReportButton />
                        </form> */}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <OrderStatusTable columns={columns} data={orders} />
            </CardContent>
        </Card>
    )
}


/*

<div className="items-center bg-white rounded p-4 font-bold text-lg my-auto" style={{
    display: "grid",
    gridTemplateColumns: "repeat(9, minmax(230px, 1fr))",
    gap: 3,
    gridRowGap: "20px",
    fontWeight: 600,
    fontSize: "14px",
}}>
    {HEADER.map((item) => (
        <div key={item}>
            {item}
        </div>
    ))}
</div>
{orders?.length > 0 ?
    orders?.map((order) => {
        return (
            <div key={order._id} className="items-center bg-white rounded p-4 mt-4 font-bold my-auto" style={{
                fontSize: "13px",
                display: "grid",
                gridTemplateColumns: "repeat(9, minmax(230px, 1fr))",
                gap: 3,
                gridRowGap: "20px",
                fontWeight: 550,
            }}>
                <div >
                    <div>AWB: {order.awb ? order.awb : "_"}</div>
                    <div>Invoice: {order.order_invoice_number}</div>
                    <div>Date: {order.order_invoice_date}</div>
                </div>
                <div >
                    <div>{order.order_reference_id}</div>
                    <div>{order.pickupAddress.hub_id}</div>
                </div>
                <div >
                    <div>{order.customerDetails.name}</div>
                    <div>{order.customerDetails.email}</div>
                    <div>{order.customerDetails.phone}</div>
                    <div>Order Min-weight: {(order.orderWeight) / 2}{order.orderWeightUnit}</div>
                </div>
                <div >
                    <div>Weight: {order.orderWeight}{order.orderWeightUnit}</div>
                    <div>{order.orderBoxLength} x {order.orderBoxWidth} x{order.orderBoxHeight} {order.orderSizeUnit}</div>
                    <div>Vol. weight: {(order.orderBoxLength * order.orderBoxWidth * order.orderBoxHeight) / 5000} {order.orderWeightUnit}</div>
                </div>
                <div >
                    <div>₹{order?.productId?.taxable_value || 0}</div>
                    <div style={{
                        backgroundColor: "#E5F6E7",
                        color: "#69b372",
                        padding: "4px",
                        borderRadius: "8px",
                        textAlign: "center",
                        width: "45%",
                        marginTop: "10px"
                    }}> {order.payment_mode ? "COD" : "Prepaid"}</div>
                </div>
                <div >
                    <div>{order.pickupAddress.address1}</div>
                    <div>{order.pickupAddress.city}, {order.pickupAddress.state}</div>
                    <div>Pin: {order.pickupAddress.pincode}</div>
                </div>
                <div >
                    <span style={{
                        backgroundColor: "#E5F6E7",
                        color: "#69b372",
                        padding: "6px",
                        borderRadius: "7px"

                    }}>Unavailable</span>
                </div>

                <div className="d-flex " style={{
                    alignItems: "center",
                }}>
                    <div>
                        {order.orderStage ?
                            (<div className="flex items-center">
                                <Select >
                                    <SelectTrigger className="w-16">
                                        <MoreHorizontal size={30} className="mr-3" />
                                    </SelectTrigger>
                                    <SelectContent className="max-w-10 max-h-72">
                                        <SelectItem value="clone" className="capitalize">
                                            <Button type="button" variant={'ghost'} size={"sm"} onClick={() => onOpen("cloneOrder", { order })}>Clone</Button>
                                        </SelectItem>
                                        <SelectItem value="track" className="capitalize">
                                            Track
                                        </SelectItem>
                                        <SelectItem value="cancel" className="capitalize">
                                            
                                            <Button type="button" variant={'ghost'} size={"sm"} onClick={() => onOpen("cancelOrder", { order })}>Cancel</Button>

                                        </SelectItem>

                                    </SelectContent>
                                </Select>
                               {order.awb &&  <Button variant={"ghost"} size={"icon"}><Clock size={24} className="cursor-pointer"  onClick={()=>onOpen("schedulePickup", {order})} /></Button>}
                            </div>

                            ) :

                            (<button
                                style={{
                                    fontSize: "13px",
                                    background: "rgba(193, 57, 43, 1)",
                                    color: "white",
                                    fontWeight: "700",
                                    borderRadius: "6px",
                                    padding: ".5rem 1rem ",
                                    fontFamily: "IBM Plex Sans Condensed",
                                }}
                                type="button"
                                onClick={() => router.push(`/orders/${order._id}`)}
                            >
                                Ship Now
                            </button>)
                        }
                    </div>



                </div>

            </div>
        )
    }).reverse() :
    <div className="text-center" style={{
        gridColumn: "1/9",
        padding: "20px",
    }}>
        No orders found
    </div>
}

*/
