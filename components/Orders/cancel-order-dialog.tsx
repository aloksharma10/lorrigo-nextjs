"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSellerProvider } from "../providers/SellerProvider"
import { buttonVariants } from "../ui/button"
export const CancelOrderDialog = ({ orderId, clientRefId }: { orderId: string, clientRefId: string }) => {
    const { handleCancelOrder } = useSellerProvider()
    return (
        <AlertDialog>
            <AlertDialogTrigger className="text-red-500 w-full relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors">Cancel Order</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your order: <span className="font-medium text-sm underline underline-offset-4 text-blue-800 flex items-center">#{clientRefId}</span> 
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className={buttonVariants({
                        variant: 'destructive'
                    })} onClick={()=>handleCancelOrder(orderId)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}