"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Form, FormField } from '../ui/form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { OrderDetailForm } from './b2c-order-form';
import { DeliveryDetailsForm } from './delivery-details-form';
import { MapPin, PackageOpen } from 'lucide-react';
import { useSellerProvider } from '../providers/SellerProvider';
import { Button } from '../ui/button';
import { BoxDetails } from './box-details';


// Define the schema for product details
const productDetailsSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Product category is required"),
    hsn_code: z.string().optional(),
    quantity: z.number().int().positive().min(1, "Product quantity is required"),
    taxRate: z.string().min(1, "Product tax rate is required"),
    taxableValue: z.string().min(1, "Product taxable value is required"),
});


export const formDataSchema = z.object({
    order_reference_id: z.string().min(1, "Order reference id is required"),
    fragile_items: z.boolean().default(false).optional(),
    payment_mode: z.enum(["COD", "Prepaid"], {
        required_error: "Payment mode is required"
    }), // Assuming payment mode is either 0 or 1
    orderWeight: z.string().min(1, "Order weight is required"),
    order_invoice_date: z.date(),
    order_invoice_number: z.string().min(1, "Order invoice number is required"),
    numberOfBoxes: z.number().int().positive().min(1, "Number of boxes is required"),
    orderSizeUnit: z.string().min(1, "Order size unit is required"),
    orderBoxHeight: z.string().min(1, "Order box height is required"),
    orderBoxWidth: z.string().min(1, "Order box width is required"),
    orderBoxLength: z.string().min(1, "Order box length is required"),
    amount2Collect: z.string().min(1, "Amount to collect is required"),
    productDetails: productDetailsSchema,
    pickupAddress: z.string().min(1, "Pickup address is required")
});


export const B2CForm = ({ sellerFacilities }: { sellerFacilities: any }) => {
    const { sellerCustomerForm } = useSellerProvider();

    const [collectableFeild, setCollectableFeild] = useState(false);
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);

    const form = useForm({
        resolver: zodResolver(formDataSchema),
        defaultValues: {
            order_reference_id: "",
            fragile_items: false,
            payment_mode: "" as "COD" | "Prepaid",
            orderWeight: "",
            order_invoice_date: currentDate,
            order_invoice_number: "",
            numberOfBoxes: 0,
            orderSizeUnit: "",
            orderBoxHeight: "",
            orderBoxWidth: "",
            orderBoxLength: "",
            amount2Collect: "",
            productDetails: {
                name: "",
                category: "",
                hsn_code: "",
                quantity: 0,
                taxRate: "",
                taxableValue: "",
            },
            pickupAddress: ""
        }
    });

    const { setValue, getValues } = form
    const isLoading = form.formState.isSubmitting;

    const isCOD = form.watch('payment_mode') === "COD";

    useEffect(() => {
        if (isCOD) {
            setCollectableFeild(true);
        } else {
            setCollectableFeild(false);
        }
    }, [isCOD]);

    const handleIncrement = () => {
        const currentValue = parseInt(form.watch('productDetails.quantity').toString()) || 0;
        setValue('productDetails.quantity', currentValue + 1);
    };

    const handleDecrement = () => {
        const currentValue = parseInt(form.watch('productDetails.quantity').toString(), 10) || 0;
        if (currentValue > 0) {
            setValue('productDetails.quantity', currentValue - 1);
        }
    };

    const onSubmit = async (values: z.infer<typeof formDataSchema>) => {
        try {
            console.log(values);
            // await createChannel(values, String(params?.serverId));

            form.reset();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-4 gap-2">
                    <Card className='col-span-3 space-y-3'>
                        <CardHeader>
                            <CardTitle>Create a new shipment (B2C)</CardTitle>
                            <CardDescription>Order Details</CardDescription>
                        </CardHeader>
                        <OrderDetailForm
                            form={form}
                            isLoading={isLoading}
                            handleDecrement={handleDecrement}
                            handleIncrement={handleIncrement}
                            collectableFeild={collectableFeild}
                        />
                        <CardFooter className='flex-row-reverse'>
                            <Button type='submit' variant={'themeButton'} >Create Shipment</Button>
                            <Button variant={'secondary'} type='button' onClick={() => form.reset()}>Reset</Button>
                        </CardFooter>
                    </Card>

                    <div className='space-y-3'>
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center'><MapPin className='mr-3' size={20} />Delivery status</CardTitle>
                            </CardHeader>
                            <DeliveryDetailsForm
                                sellerFacilities={sellerFacilities}
                                form={form}
                                isLoading={isLoading}
                            />
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center'><PackageOpen size={23} className='mr-3' />Box Size</CardTitle>
                            </CardHeader>
                            <BoxDetails
                                form={form}
                                isLoading={isLoading}
                            />
                            {/* <CardFooter>
                            </CardFooter> */}
                        </Card>
                    </div>
                </div>
            </form>
        </Form>
    );
}