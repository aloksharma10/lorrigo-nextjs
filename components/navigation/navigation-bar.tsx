"use client";

import { Nav } from "./nav";
import { Archive, ArchiveX, Banknote, Database, File, Headset, Home, Inbox, Send, Settings, ShoppingCart, Trash2, TrendingUpIcon } from "lucide-react";
import { TopNav } from "./top-nav";
import { useState } from "react";


export function NavigationBar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(false)
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
                className={`fixed top-16 pt-2 shadow-md h-full transition-all duration-500 ${
                    isNavCollapsed ? '' : ''
                }`}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
            >
                <Nav
                    isCollapsed={isNavCollapsed}
                    links={[
                        {
                            title: "Home",
                            label: "128",
                            icon: Home,
                            variant: "default",
                        },
                        {
                            title: "Dashboard",
                            label: "9",
                            icon: TrendingUpIcon,
                            variant: "ghost",
                        },
                        {
                            title: "Your Orders",
                            label: "",
                            icon: ShoppingCart,
                            variant: "ghost",
                        },
                        {
                            title: "Setting",
                            label: "",
                            icon: Settings,
                            variant: "ghost",
                        },
                    ]}
                />
            </div>
        </div>
    );
}