"use client";

import { z } from "zod";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosInstance } from "axios";
import { customerDetailsSchema } from "@/components/modal/add-customer-modal";
import { sellerSchema } from "@/components/modal/add-seller-modal";


import { useToast } from "@/components/ui/use-toast";

import { SellerType } from "@/types/types";
import { useAuth } from "./AuthProvider";

interface SellerContextType {
  seller: SellerType | null;
  business: string;
  sellerFacilities: any;
  handlebusinessDropdown: (value: string) => void;
  sellerCustomerForm: sellerCustomerFormType;
  setSellerCustomerForm: React.Dispatch<React.SetStateAction<sellerCustomerFormType>>;
}

interface sellerCustomerFormType {
  sellerForm: z.infer<typeof sellerSchema>;
  customerForm: z.infer<typeof customerDetailsSchema>;

}
const SellerContext = createContext<SellerContextType | null>(null);

function SellerProvider({ children }: { children: React.ReactNode }) {
  const { userToken } = useAuth();

  const [seller, setSeller] = useState<SellerType | null>(null);
  const [sellerFacilities, setSellerFacilities] = useState([]);

  const [sellerCustomerForm, setSellerCustomerForm] = useState<sellerCustomerFormType>({
    sellerForm: {
      name: "",
      gstNo: "",
      isSellerAddressAdded: false,
      pincode: "",
      address: "",
      phone: "",
      city: "",
      state: "",
    },
    customerForm: {
      name: "",
      phone: "",
      state: "",
      country: "",
      address1: "",
      address2: "",
      city: "",
      pincode: "",
    }
  });
  const [business, setbusiness] = useState<string>("B2C");

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

  const handlebusinessDropdown = (value: string) => {
    setbusiness(value);
  }



  return (
    <SellerContext.Provider
      value={{
        seller,
        business,
        sellerFacilities,
        handlebusinessDropdown,
        sellerCustomerForm,
        setSellerCustomerForm

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
