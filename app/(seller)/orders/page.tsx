import { NavigationItem } from "@/components/navigation/navigation-item";

export default function OrdersPage({ searchParams }: { searchParams: { status: string } }) {
    const DASHBOARD_LINKS = [
        {
            label: "New",
            href: "/orders?status=new",
        },
        {
            label: "Ready for Pickup",
            href: "/orders?status=ready-for-pickup",
        },
        {
            label: "In-Transit",
            href: "/orders?status=in-transit",
        },
        {
            label: "Delivered",
            href: "/orders?status=delivered",
        },
        {
            label: "RTO",
            href: "/orders?status=rto",
        },
        {
            label: "NDR",
            href: "/orders?status=ndr",
        },
        {
            label: "All Shipments",
            href: "/orders",
        }
    ]

    return (
        <>
            <NavigationItem links={DASHBOARD_LINKS} />
        </>
    );

}