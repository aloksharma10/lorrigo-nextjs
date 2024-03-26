"use client";

import { Nav } from "./nav";
import { Home, Settings, ShoppingCart, TrendingUpIcon } from "lucide-react";
import { TopNav } from "./top-nav";
import { useState } from "react";
import { cn } from "@/lib/utils";


export function NavigationBar({ children }: { children: React.ReactNode }) {
    const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(true)
    const handleMouseEnter = () => {
        setIsNavCollapsed(false); // Expand when mouse enters
    };

    const handleMouseLeave = () => {
        setIsNavCollapsed(true); // Collapse when mouse leaves
    };
    return (
        <div className="w-full">
            <div className="fixed shadow-md w-full">
                <TopNav />
            </div>
            <div
                className={cn("fixed top-16 mt-2 shadow-md h-full flex flex-col transition-all duration-300 ease-in-out bg-gray-800 items-center text-white",
                    isNavCollapsed ? 'w-16' : ' w-64'
                )}
                onClick={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Nav
                    isCollapsed={isNavCollapsed}
                    links={[
                        {
                            title: "Home",
                            icon: Home,
                            variant: "themeNavActiveBtn",
                        },
                        {
                            title: "Dashboard",
                            icon: TrendingUpIcon,
                            variant: "themeNavBtn",
                        },
                        {
                            title: "Your Orders",
                            icon: ShoppingCart,
                            variant: "ghost",
                        },
                        {
                            title: "Setting",
                            icon: Settings,
                            variant: "ghost",
                        },
                    ]}
                />
            </div>
            <div
                className={cn(
                    "container transition-all duration-300 ease-in-out",
                    isNavCollapsed ? "pl-14" : "pl-64"
                )}
            >
                {children}
            </div>
        </div>
    );
}