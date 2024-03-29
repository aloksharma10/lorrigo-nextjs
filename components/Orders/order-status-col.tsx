"use client";
import { ColumnDef } from "@tanstack/react-table";
import { B2COrderType } from "@/types/types";
import { Copy, MoreHorizontal, ShoppingCartIcon } from "lucide-react";
import { formatDate } from "date-fns";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { formatCurrencyForIndia, handleCopyText } from "@/lib/utils";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

export const columns: ColumnDef<B2COrderType>[] = [
    {
        header: 'Order Details',
        accessorKey: 'order_reference_id',
        cell: ({ row }) => {
            const rowData = row.original;
            return (
                <div className="space-y-1 items-center">
                    <p className="font-medium underline underline-offset-4 text-base text-blue-800 flex items-center">
                        {
                            rowData?.awb ?
                                <Link className="cursor-pointer" href={`/orders/${rowData.order_reference_id}`}>{rowData.order_reference_id}</Link>
                                :
                                <span>{rowData.order_reference_id}</span>
                        }
                        <Copy className="ml-2 cursor-pointer" size={15} onClick={() => handleCopyText(`${rowData.order_reference_id}`)} /></p>
                    <p>{formatDate(`${rowData?.order_invoice_date}`, 'dd MM yyyy | HH:mm a')}</p>
                    <p className="uppercase flex gap-1"><ShoppingCartIcon size={18} /> Custom</p>
                </div>
            )
        }
    },
    {
        header: 'Customer Details',
        accessorKey: 'customerDetails',
        cell: ({ row }) => {
            const rowData = row.original;
            return (
                <div className="space-y-1 items-center">
                    <p>{rowData.customerDetails?.name}</p>
                    <p>{rowData.customerDetails?.email}</p>
                    <p>{formatPhoneNumberIntl(`${rowData.customerDetails?.phone}`)}</p>
                </div>
            )
        }
    },
    {
        header: 'Package Details',
        cell: ({ row }) => {
            const rowData = row.original;
            return (
                <div className="space-y-1 items-center">
                    <p>Dead wt. 0.5kg</p>
                    <p>{rowData.orderBoxLength} x {rowData.orderBoxWidth} x {rowData.orderBoxHeight} ({rowData.orderSizeUnit})</p>
                    <p>Vol. weight: {(rowData?.orderBoxLength || 1 * (rowData?.orderBoxWidth || 1) * (rowData?.orderBoxHeight || 1)) / 5000} ({rowData?.orderWeightUnit})</p>
                </div>
            )
        }
    },
    {
        header: 'Payment',
        accessorKey: 'payment_mode',
        cell: ({ row }) => {
            const rowData = row.original;
            return (
                <div className="space-y-1 items-center">
                    <p>{formatCurrencyForIndia(Number(rowData.productId?.taxable_value))}</p>
                    <Badge variant={rowData.payment_mode == 0 ? "success" : "failure"}>{rowData.payment_mode == 0 ? "Prepaid" : "COD"}</Badge>
                </div>
            )
        }
    },

    {
        header: 'Pickup Address',
        accessorKey: 'pickupAddress',
        cell: ({ row }) => {
            const rowData = row.original;
            return (
                <div className="space-y-1 items-center">
                    <p className="capitalize">{rowData.pickupAddress?.address1}</p>
                </div>
            )
        }
    },
    {
        header: 'Status',
        accessorKey: 'orderStages',
        cell: ({ row }) => {
            const rowData = row.original;
            const action = rowData?.orderStages?.slice(-1)[0].action
            console.log(action)
            return (
                <div className="space-y-1">
                    <Badge variant="success">{action}</Badge>
                </div>
            )
        }
    },
    {
        header: 'Action',
        cell: ({ row }) => {
            const rowData = row.original;
            return (
                <div className="flex gap-3 items-center">
                    <Link href={`/orders/${rowData.order_reference_id}`} className={buttonVariants({
                        variant: "themeButton",
                        size: "sm",
                    })}>
                        Ship Now
                    </Link>
                    <DropdownMenu>

                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>Edit Order</DropdownMenuItem>
                            <DropdownMenuItem>Add Order Tag</DropdownMenuItem>
                            <DropdownMenuItem>Clone Order</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    },
];