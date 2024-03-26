"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

// import { differenceInMonths } from "date-fns";
import axios from "axios";
import { SellerType } from "@/types/types";

interface SellerProviderProps {
  children: React.ReactNode;
}

interface SellerContextType {
  user: SellerType | null;
}
// Add type assertion to createContext
const SellerContext = createContext<SellerContextType | null>(null);

function SellerProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const [user, setUser] = useState<SellerType | null>(null);


  return (
    <SellerContext.Provider
      value={{
        user
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
