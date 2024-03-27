"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

// import { differenceInMonths } from "date-fns";
import axios, { AxiosInstance } from "axios";
import { SellerType } from "@/types/types";
import { getCookie } from "cookies-next";

interface SellerContextType {
  seller: SellerType | null;
  business: string;
  handlebusinessDropdown: (value: string) => void;
}
// Add type assertion to createContext
const SellerContext = createContext<SellerContextType | null>(null);

function SellerProvider({ children }: { children: React.ReactNode }) {
  const [seller, setSeller] = useState<SellerType | null>(null);
  const [userToken, setUserToken] = useState<string>("");

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


  return (
    <SellerContext.Provider
      value={{
        seller,
        business,
        handlebusinessDropdown,

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
