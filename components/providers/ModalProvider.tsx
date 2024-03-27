"use client"

import { useEffect, useState } from "react";
import { RechargeModal } from "../modal/recharge-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) return null;
  
    return (
      <>
        <RechargeModal />
        
      </>
    );
  };
  