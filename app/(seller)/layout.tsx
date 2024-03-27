import { NavigationBar } from "@/components/navigation/navigation-bar";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full overflow-hidden">
            <NavigationBar>
                <main className="h-full">{children}</main>
            </NavigationBar>
        </div>
    );
}