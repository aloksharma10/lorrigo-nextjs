import { B2CForm } from "@/components/Shipment/b2c-form";
import { axiosIWAuth } from "@/lib/axiosConfig";
import { Suspense } from "react";

export default async function B2CPage() {
    let res = {
        data: { hubs: [] },
        status: 0,
        statusText: "",
        headers: {},
        config: {} 
    }; 

    try {
        res = await axiosIWAuth.get('/hub')
    } catch (error) {
        console.log(error)
    }
    return (
        <Suspense fallback={<div>Loading...</div>} >
            <B2CForm sellerFacilities={res?.data?.hubs || []} />
        </Suspense>
    );
}