import { B2CForm } from "@/components/Shipment/b2c-form";
import { axiosIWAuth } from "@/lib/axiosConfig";

export default async function B2CPage() {
const res = await axiosIWAuth.get('/hub')

    return (
        <B2CForm sellerFacilities={res.data.hubs}/>
    );
}