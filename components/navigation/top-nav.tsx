import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { formatCurrencyForIndia } from "@/lib/utils";
import ActionTooltip from "../action-tooltip";
import { Menu, Wallet } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";

interface NavProps {
    isCollapsed: boolean;
    links: {
        title: string;
        label?: string;
        icon: React.ComponentType;
        variant: "default" | "ghost";
    }[];
}

export function TopNav() {
    return (
        <div
            className="group flex flex-col gap-4 py-2"
        >
            <nav className="flex justify-between gap-1 px-4 min-w-full p-2">
                <div className="flex space-x-4 cursor-pointer items-center">
                    <span className="text-lg font-bold"><Menu size={24} /></span>
                    <Image src="/assets/logogosog.png" alt="logo" width={130} height={130} />
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <ActionTooltip
                            side="bottom"
                            align="center"
                            label="wallet"
                        >
                            <Button variant={"ghost"} size={"icon"}><Wallet size={24} /></Button>
                        </ActionTooltip>
                        <span>{formatCurrencyForIndia(1000)}</span>
                        <Button variant={"themeButton"} size={"sm"}>Recharge Wallet</Button>
                    </div>

                    <Separator orientation="vertical" className="w-[1px] bg-gray-400" />
                    
                    <div>
                        <Button variant={"themeButton"} size={"sm"}>Logout</Button>
                    </div>
                </div>
            </nav>
        </div>
    );
}