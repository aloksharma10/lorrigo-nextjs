import { NavigationBar } from "@/components/navigation/navigation-bar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full overflow-hidden">
            <div className="">
                <NavigationBar />
            </div>
            <main className="h-full lg:pl-[290px]">{children}</main>
        </div>
    );
}