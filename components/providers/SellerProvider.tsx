"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

import axios, { AxiosInstance } from "axios";
import { SellerType } from "@/types/types";
import { useAuth } from "./AuthProvider";

interface SellerContextType {
  seller: SellerType | null;
  business: string;
  handlebusinessDropdown: (value: string) => void;
  sellerFacilities: any;
}

const SellerContext = createContext<SellerContextType | null>(null);

function SellerProvider({ children }: { children: React.ReactNode }) {
  const { userToken } = useAuth();

  const [seller, setSeller] = useState<SellerType | null>(null);
  const [sellerFacilities, setSellerFacilities] = useState([]);
  const [business, setbusiness] = useState<string>("B2C");

  const { toast } = useToast();
  const router = useRouter()

  const axiosConfig = {
    baseURL: process.env.BACKEND_API_URL || 'http://localhost:4000',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
    },
  };

  const axiosIWAuth: AxiosInstance = axios.create(axiosConfig);

  const handlebusinessDropdown = (value: string) => {
    setbusiness(value);
  }
  const getSellerFacilities = useCallback(async () => {
    try {
      const response = await axiosIWAuth.get('/hub');
      setSellerFacilities(response.data.hubs) ;
    } catch (error) {
      console.error(error);
    }
  },[axiosIWAuth])
 
  

  useEffect(() => {
    getSellerFacilities();
  }, [seller]);

  return (
    <SellerContext.Provider
      value={{
        seller,
        business,
        handlebusinessDropdown,
        sellerFacilities

      }}
    >
      {children}
    </SellerContext.Provider>
  );
}

export default SellerProvider;

export function useSellerProvider() {
  const context = useContext(SellerContext);
  if (context == undefined) {
    throw new Error("component and page must be inside the provider");
  }
  return context;
}
