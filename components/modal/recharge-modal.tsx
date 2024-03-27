"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";
import { formatCurrencyForIndia } from '@/lib/utils';

const schema = z.object({
    rechargeAmount: z.number().int().min(500).max(10000)
});

export const RechargeModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "wallet";

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            rechargeAmount: 500
        }
    });

    const handleSelect = (amount: number) => {
        form.setValue('rechargeAmount', amount);
    };

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {

            //   await createChannel(values, String(params?.serverId));
            console.log(values);
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    const PRICE = [500, 1000, 2000, 5000, 10000]

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white dark:text-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Recharge You Wallet
                    </DialogTitle>
                    <DialogDescription>
                        Current Wallet Amount: {formatCurrencyForIndia(1000)}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="rechargeAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Enter Amount in Multiple of 100
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter the amount to recharge"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Min value: ₹500 & Max value ₹10000
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                {
                                    PRICE.map((amount) => (
                                        <Button
                                            key={amount}
                                            type='button'
                                            variant={'ghost'}
                                            size={'sm'}
                                            onClick={() => handleSelect(amount)}
                                        >
                                            {formatCurrencyForIndia(amount)}
                                        </Button>
                                    ))
                                }
                            </div>
                        </div>
                        <DialogFooter className="px-6 py-4">
                            <Button disabled={isLoading} variant={'themeButton'}>
                                Pay ₹{form.watch('rechargeAmount')}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
};