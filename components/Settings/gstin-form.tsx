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
    gstin: z.string().min(1, "Account holder's name is required"),
    acc_type: z.string().min(1, "Account type is required"),
    acc_number: z.string().min(1, "Account number is required"),
})

const GstinForm = () => {
  return (
    <div>GstinForm</div>
  )
}

export default GstinForm