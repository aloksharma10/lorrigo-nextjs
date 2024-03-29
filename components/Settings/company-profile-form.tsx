'use client'
import React from 'react'
import { Form, useForm } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from '../ui/input';

export const CompanyProfileForm = () => {

  const form = useForm({
    
  })

  return (
    <Form>
      <form>
        <div className="space-y-5 px-6">
          <div className='grid grid-cols-2 gap-3 '>
            <FormField
              control={form.control}
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
              )} name={''}            />
          </div>
        </div>
      </form>
    </Form>

  )
}
