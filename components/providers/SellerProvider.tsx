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
    baseURL: process.env.BACKEND_API_URL || 'http://3.27.246.35:4000/api',
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


  const handleCreateOrder = useCallback(async (order: any) => {
    try {

      /*
       let data = {
      order_reference_id: order_reference_id,
      //  total_order_value: total_order_value,
      payment_mode: payment_mode === "COD" ? 1 : 0,
      orderWeight: orderWeight,
      orderWeightUnit: orderWeightUnit,
      order_invoice_date: order_invoice_date,
      order_invoice_number: order_invoice_number,
      numberOfBoxes: noOfBox,
      orderSizeUnit: orderSizeUnit,
      orderBoxHeight: orderBoxHeight,
      orderBoxWidth: orderBoxWidth,
      orderBoxLength: orderBoxLength,
      amount2Collect: productDetails.amount2Collect,
      customerDetails: {
        name: customerDetails?.name,
        email: customerDetails?.email,
        phone: customerDetails?.phone,
        address: customerDetails?.address,
        city: customerDetails?.city,
        pincode: Number(customerDetails?.pincode),
      },
      productDetails: {
        name: productDetails?.name,
        category: productDetails?.category,
        hsn_code: productDetails?.hsn_code,
        quantity: productDetails?.quantity,
        taxRate: productDetails?.taxRate,
        taxableValue: productDetails?.taxableValue,
      },
      pickupAddress: pickupAddress,
    };



    
     */

    const payload = {

    }
      const res = await axiosIWAuth.post('/order', order);
      toast({
        variant: "default",
        title: "Order created successfully",
        description: "Order has been created successfully",
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
