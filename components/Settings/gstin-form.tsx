'use client'
import React, { useState } from 'react'
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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Save } from 'lucide-react';

export const GstinFormSchema = z.object({
    gstin: z.string().min(1, "Account holder's name is required"),
    tan: z.string().min(1, "Account type is required"),
    // deductTDS: z.string(),
})

const GstinForm = () => {
    const { handleCreateHub } = useHubProvider();
    const { onClose } = useModal();
    const router = useRouter();
    const [selectedValue, setSelectedValue] = useState('yes');

    const handleChange = (value: React.SetStateAction<string>) => {
        setSelectedValue(value);
    };


    const form = useForm({
        resolver: zodResolver(GstinFormSchema),
        defaultValues: {
            gstin: '',
            // deductTDS: 'yes',
            tan: '',
        }
    });

    const onSubmit = async (values: z.infer<typeof GstinFormSchema>) => {
        try {

            handleCreateHub({
                gstin: values.gstin,
                // deductTDS: values.deductTDS,
                tan: values.tan,
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
                        name={'gstin'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                    GSTIN
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className=" border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md w-1/2"
                                        {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    {/* <FormField
                        control={form.control}
                        name={'deductTDS'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                    I want to deduct TDS payment <span className='text-red-600'>*</span>
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup value={field.value} onChange={(value) => field.onChange(value)}>
                                        <RadioGroupItem value="yes">Yes</RadioGroupItem>
                                        <RadioGroupItem value="no">No</RadioGroupItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )} /> */}
                    <FormField
                        control={form.control}
                        name={'tan'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold dark:text-secondary/70">
                                    TAN Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className=" border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md w-1/2"
                                        {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                </div>
                <button className='bordder-0 flex h-[42px] w-[147px] justify-between text-white my-8' type='submit'>
                    <div className='grid place-content-center bg-red-700 w-full h-full rounded-l-md text-xl'><p>Save</p></div>
                    <div className='bg-red-800 h-[42px] w-[43px] grid place-content-center rounded-r-md'><Save /></div>
                </button>
            </form>
        </Form>
    )
}

export default GstinForm