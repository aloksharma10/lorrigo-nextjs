"use client"

import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SearchBar from "@/components/search-bar";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useSellerProvider } from "@/components/providers/SellerProvider";

export const DashboardHeader = () => {
    const { handlebusinessDropdown } = useSellerProvider()
    return (
        <div className="flex space-x-6 py-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Dashboard
            </h2>
            <Select onValueChange={handlebusinessDropdown}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="B2C" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="B2C">B2C</SelectItem>
                    <SelectItem value="B2B">B2B</SelectItem>
                </SelectContent>
            </Select>
            <SearchBar
                data={[
                    {
                        label: "Orders",
                        type: "channel",
                        data: [{ icon: null, name: "", id: "" }]
                    },
                    {
                        label: "Hub",
                        type: "channel",
                        data: [{ icon: null, name: "", id: "" }]
                    },
                    {
                        label: "AWB",
                        type: "channel",
                        data: [{ icon: null, name: "", id: "" }]
                    },
                ]}
            />
            <Link href="/new/b2c" className={buttonVariants({
                variant: "themeButton"
            })}>Create B2C Order</Link>
            <Link href="/new/b2b" className={buttonVariants({
                variant: "themeButton"
            })}>Create B2B Order</Link>
        </div>
    );
}