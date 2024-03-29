'use client'
import React from 'react'
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
  company_id: z.string().min(1, "Company ID is required"),
  name: z.string().min(1, "Company ID is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().min(1, "Company ID is required").optional(),
  logo: z.string().min(1, "Company ID is required").optional(),
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
        // @ts-ignore
        id: values.company_id,
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
        <div className="space-y-5 px-6">
          <div className='grid grid-cols-2 gap-3 '>
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
                      className="bg-zinc-300/50 border-0 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      {...field} />
                  </FormControl>
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
                      className="bg-zinc-300/50 border-0 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      {...field} />
                  </FormControl>
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
                      className="bg-zinc-300/50 border-0 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      {...field} />
                  </FormControl>
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
                      className="bg-zinc-300/50 border-0 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      {...field} />
                  </FormControl>
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name={'logo'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    Logo 
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-300/50 border-0 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0"
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
