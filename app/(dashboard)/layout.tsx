import { NavigationBar } from "@/components/navigation/navigation-bar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full overflow-hidden">
            <NavigationBar>
                <main className="h-full pt-20">{children}</main>
            </NavigationBar>
        </div>
    );
}