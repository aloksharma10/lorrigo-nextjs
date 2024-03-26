export type SellerType = {
    id: string;
    name: string;
    email: string;
    walletBalance?: number;
    companyName?: string;
    entityType?: string;
    address?: string;
    gstno?: string;
    panno?: string;
    margin?: number;
    vendors?: string[];
    codPrice?: number;
    isVerified: boolean;
};

export type AuthType = {
    id: string;
    email: string;
    role?: string;
    isVerified?: boolean;
};


export interface CustomerDetailsType {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    pincode: string;
}

export interface B2COrderType {
    id: string;
    awb?: string;
    sellerId: string;
    orderStage?: number;
    orderStages?: {
        stage: number;
        stageDateTime: Date;
    }[];
    pickupAddress?: string;
    productId?: string;
    order_reference_id?: string;
    payment_mode?: number;
    order_invoice_date?: string;
    order_invoice_number?: string;
    isContainFragileItem?: boolean;
    numberOfBoxes?: number;
    orderBoxHeight?: number;
    orderBoxWidth?: number;
    orderBoxLength?: number;
    orderSizeUnit?: string;
    orderWeight?: number;
    orderWeightUnit?: string;
    amount2Collect?: number;
    ewaybill?: number;
    customerDetails?: CustomerDetailsType;
}

export interface HubType {
    id: string;
    hub_id?: number;
    sellerId: string;
    message?: string;
    code?: number;
    isSuccess?: boolean;
    hub_details: {
        name: string;
        pincode: number;
        city: string;
        state: string;
        address1: string;
        address2?: string;
        phone: number;
        delivery_type_id?: number;
    };
}