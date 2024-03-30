import CourierPage from "@/components/Orders/CourierPage";
import { Suspense } from "react";

export default function OrderPage() {
    return (
        <div className="grid grid-cols-3 gap-3 my-8">
            <Suspense fallback={<div>Loading...</div>}>
                <CourierPage />
            </Suspense>
        </div>
    )
}