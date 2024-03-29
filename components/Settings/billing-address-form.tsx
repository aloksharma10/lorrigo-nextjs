'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import Image from "next/image";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from '../ui/input';
import { useHubProvider } from '../providers/HubProvider';
import { useModal } from '@/hooks/use-model-store';
import { useRouter } from 'next/navigation';

export const BillingAddressSchema = z.object({
    address_line_1: z.string().min(1, "Address Line 1 is required"),
    address_line_2: z.string().min(1, "Company ID is required").optional(),
    pincode: z.string().min(1, "Pincode is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    phone: z.string().min(1, "Phone is required")
})
const BillingAddressForm = () => {
    const { handleCreateHub } = useHubProvider();
    const { onClose } = useModal();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(BillingAddressSchema),
        defaultValues: {
            address_line_1: '',
            address_line_2: '',
            pincode: '',
            city: '',
            state: '',
            phone: '',
        }
    });

    const onSubmit = async (values: z.infer<typeof BillingAddressSchema>) => {
        try {

            handleCreateHub({
                // @ts-ignore  
                address_line_1: values.address_line_1,
                address_line_2: values.address_line_2,
                pincode: values.pincode,
                city: values.city,
                state: values.state,
                phone: values.phone,
            });

            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-5 ">
                    <FormField
                        control={form.control}
                        name={'address_line_1'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                    Address Line 1 <span className='text-red-600'>*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className=" border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md "
                                        {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name={'address_line_2'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                    Address Line 2
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md "
                                        {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    <div className='grid gap-y-6 gap-x-16 py-5 grid-cols-2'>
                        <FormField
                            control={form.control}
                            name={'pincode'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                        Pincode <span className='text-red-600'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md "
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name={'city'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                        City <span className='text-red-600'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md "
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name={'state'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                        State <span className='text-red-600'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name={'phone'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                        Phone <span className='text-red-600'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <button className='border-2 flex h-[42px] w-[147px] justify-between text-white my-8' type='submit'>
                            <div className='grid place-content-center bg-red-700 w-full h-full rounded-l-md text-xl'><p>Save</p></div>
                            <div className='bg-red-800 h-[39px] w-[43px] grid place-content-center rounded-r-md'><Image src={"/assets/material-symbols_save.png"} width={20} height={20} alt="Logo" /></div>
                        </button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default BillingAddressForm