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

export const CompanyProfileSchema = z.object({
    holder_name: z.string().min(1, "Account holder's name is required"),
    acc_type: z.string().min(1, "Account type is required"),
    acc_number: z.string().min(1, "Account number is required"),
    ifsc_number: z.string().min(1, "IFSC Number is required"),
})
const BankDetailsForm = () => {
    const { handleCreateHub } = useHubProvider();
    const { onClose } = useModal();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(CompanyProfileSchema),
        defaultValues: {
            holder_name: '',
            acc_type: '',
            acc_number: '',
            ifsc_number: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof CompanyProfileSchema>) => {
        try {

            handleCreateHub({
                // @ts-ignore
                holder_name: values.holder_name,
                acc_type: values.acc_type,
                acc_number: values.acc_number,
                ifsc_number: values.ifsc_number
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
                    <div className='grid grid-cols-2 gap-y-6 gap-x-28 py-5 mt-6'>
                        <FormField
                            control={form.control}
                            name={'holder_name'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                        Account holder's name <span className='text-red-600'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className=" border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name={'acc_type'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                        Account type<span className='text-red-600'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className=" border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name={'acc_number'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                        Account number <span className='text-red-600'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className=" border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name={'ifsc_number'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                        IFSC number <span className='text-red-600'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className=" border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default BankDetailsForm