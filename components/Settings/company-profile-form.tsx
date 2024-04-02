'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormMessage } from '@/components/ui/form';
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
import { Save, Upload } from 'lucide-react';
import { Button } from '../ui/button';

export const CompanyProfileSchema = z.object({
  company_id: z.string().min(1, "Company ID is required"),
  name: z.string().min(1, "Company ID is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().optional(),
  logo: z.string().optional(),
})

export const CompanyProfileForm = () => {

  const { handleCreateHub } = useHubProvider();
  const { onClose } = useModal();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CompanyProfileSchema),
    defaultValues: {
      company_id: '',
      name: '',
      email: '',
      website: '',
      logo: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof CompanyProfileSchema>) => {
    try {

      handleCreateHub({
        company_id: values.company_id,
        name: values.name,
        email: values.email,
        website: values.website,
        logo: values.logo
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
          <div className='grid grid-cols-2 gap-y-6 gap-x-20 py-5'>
            <FormField
              control={form.control}
              name={'company_id'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Company ID <span className='text-red-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=" border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-sm"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Company Name <span className='text-red-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-sm"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name={'website'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Website
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-md"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name={'email'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Email <span className='text-red-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 shadow-sm"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name={'logo'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Website / Company Logo
                  </FormLabel>
                  <FormControl>
                    <button className='border-2 flex h-[57px] w-[230px] justify-between rounded-lg'>
                      <div className='grid place-content-center text-red-600 w-full h-full'><p>Upload</p></div>
                      <div className='bg-[#E6E6E6] h-[55px] w-[55px] grid place-content-center'><Upload size={20} color='red' /></div>
                    </button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
          <div className='flex justofy-between gap-x-4'>
            <Button variant={'themeButton'} type='submit' className='pr-0'>
              Save
              <div className='bg-red-800 h-[40px] w-[43px] grid place-content-center rounded-r-md text-white ml-4' ><Save /></div>
            </Button>
          </div>
        </div>
      </form>
    </Form>

  )
}
