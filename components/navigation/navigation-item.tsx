"use client"

import * as React from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavigationItem({ links }: { links: { label: string; href: string }[] }) {
    const pathname = usePathname()
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {links.map((link) => (
                    <NavigationMenuItem key={link.label}>
                        <Link href={link.href} legacyBehavior passHref>
                            <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900", link.href === pathname && "text-red-500 font-medium bg-gray-100 shadow-sm ")}>
                                {link.label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

