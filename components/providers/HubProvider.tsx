"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosInstance } from "axios";



import { useToast } from "@/components/ui/use-toast";

import { HubType, SellerType } from "@/types/types";
import { useAuth } from "./AuthProvider";

interface reqPayload {
    name: string;
    pincode: string;
    address1: string;
    address2: string;
    phone: string;
    city: string;
    state: string;
}

interface HubContextType {
    handleCreateHub: (hub: reqPayload) => void;
}

const HubContext = createContext<HubContextType | null>(null);

function HubProvider({ children }: { children: React.ReactNode }) {
    const { userToken } = useAuth();

    const { toast } = useToast();
    const router = useRouter()

    const axiosConfig = {
        baseURL: process.env.BACKEND_API_URL || 'http://localhost:4000/api',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
        },
    };

    const axiosIWAuth: AxiosInstance = axios.create(axiosConfig);

    const handleCreateHub = useCallback(async (hub: reqPayload) => {
        try {
            const res = await axiosIWAuth.post('/hub', hub);
            toast({
                variant: "default",
                title: "Hub created successfully",
                description: "Hub has been created successfully",
            });
            router.refresh()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "error.response.data.message",
            });

        }
    }, [axiosIWAuth, router, toast])

    return (
        <HubContext.Provider
            value={{
                handleCreateHub,
            }}
        >
            {children}
        </HubContext.Provider>
    );
}

export default HubProvider;

export function useHubProvider() {
    const context = useContext(HubContext);
    if (context == undefined) {
        throw new Error("component and page must be inside the provider");
    }
    return context;
}
