"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Form } from '../ui/form';

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { OrderDetailForm } from './b2c-order-form';
import { DeliveryDetailsForm } from './delivery-details-form';
import { MapPin } from 'lucide-react';

// Define the schema for customer details
const customerDetailsSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    pincode: z.string(),
});

// Define the schema for product details
const productDetailsSchema = z.object({
    name: z.string().min(3),
    category: z.string().min(2),
    hsn_code: z.string().optional(),
    quantity: z.number().int().positive(),
    taxRate: z.string().min(1),
    taxableValue: z.string().min(1),
});

// Define the schema for pickup address form
const pickupAddressFormSchema = z.object({
    facilityName: z.string(),
    contactPersonName: z.string(),
    pickupLocContact: z.string(),
    email: z.string().email(),
    address: z.string(),
    country: z.string(),
    pincode: z.string(),
    state: z.string(),
    city: z.string(),
});

// Define the main schema for the form data
export const formDataSchema = z.object({
    order_reference_id: z.string().min(3),
    fragile_items: z.boolean().default(false).optional(),
    payment_mode: z.enum(["COD", "Prepaid"]), // Assuming payment mode is either 0 or 1
    orderWeight: z.number().min(0).positive(),
    order_invoice_date: z.date(),
    order_invoice_number: z.string(),
    numberOfBoxes: z.number().int().positive().min(1),
    orderSizeUnit: z.string(),
    orderBoxHeight: z.number().int().positive(),
    orderBoxWidth: z.number().int().positive(),
    orderBoxLength: z.number().int().positive(),
    amount2Collect: z.string(),
    customerDetails: customerDetailsSchema,
    productDetails: productDetailsSchema,
    pickupAddress: z.string(),
});


export const B2CForm = () => {
    // const { register, handleSubmit } = useForm();
    const [collectableFeild, setCollectableFeild] = useState(false);
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);

    const form = useForm({
        resolver: zodResolver(formDataSchema),
        defaultValues: {
            order_reference_id: "",
            payment_mode: "" as "COD" | "Prepaid",
            orderWeight: 0,
            order_invoice_date: currentDate,
            order_invoice_number: "",
            numberOfBoxes: 0,
            orderSizeUnit: "",
            orderBoxHeight: 0,
            orderBoxWidth: 0,
            orderBoxLength: 0,
            amount2Collect: "",
            customerDetails: {
                name: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                pincode: "",
            },
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
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                    <Card >
                        <CardHeader>
                            <CardTitle className='flex items-center'><MapPin className='mr-3' size={20} />Delivery status</CardTitle>
                        </CardHeader>
                        <DeliveryDetailsForm
                            form={form}
                            isLoading={isLoading}
                        />
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </Form>
    );
}