"use client"
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { B2COrderType } from "@/types/types";
import { useModal } from "@/hooks/use-model-store";

type ButtonStyles = {
    [key: string]: string;
};

export const OrderButton: React.FC<{ rowData: B2COrderType }> = ({ rowData }) => {
    const orderStage = rowData?.orderStages?.slice(-1)[0]?.stage;
    const { onOpen } = useModal();
    const buttonStyles: ButtonStyles = {
        "0": "bg-green-500",
        "1": "bg-blue-500",
        "default": "bg-gray-300 cursor-not-allowed",
    };

    const buttonText: ButtonStyles = {
        "0": "Ship Now",
        "1": "Schedule Pickup",
        "-1": "Comming Soon",
        "default": "Disabled Button",
    };

    const style = buttonStyles[orderStage?.toString() ?? "default"];
    const text = buttonText[orderStage?.toString() ?? "default"];
    const disabled = orderStage !== 0 && orderStage !== 1;

    if (orderStage === 0) {
        return (
            <Link href={`/orders/${rowData._id}`}>
                <Button variant={"themeButton"} size={"sm"} disabled={disabled}>
                    {text}
                </Button>
            </Link>
        );
    }

    if (orderStage === 1) {
        return (
            <Button variant={"themeButton"} size={"sm"} onClick={() => { onOpen("schedulePickup", { order: rowData }) }}
            >
                {text}
            </Button>
        );
    }

    return (
        <Button variant={"themeButton"} size={"sm"} disabled={disabled}>
            {text}
        </Button>
    );
};