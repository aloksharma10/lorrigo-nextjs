import { Circle, Square } from "lucide-react";
import { CardContent } from "../ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useSellerProvider } from "../providers/SellerProvider";

interface DeliveryDetailsFormProps {
    form: any;
    isLoading: boolean;
}

export const DeliveryDetailsForm = ({ form, isLoading }: DeliveryDetailsFormProps) => {
    const { sellerFacilities } = useSellerProvider();
    return (
        <CardContent>
            <div className="grid grid-cols-7">
                <div className="space-y-3 items-center flex flex-col max-w-10">
                    <Circle strokeWidth={3.4} className="text-yellow-500" size={50} />
                    <hr className="w-[1px] bg-black h-full" />
                    <Square strokeWidth={3.4} className="text-emerald-600" size={50} />
                </div>

                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name="payment_mode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                >
                                    Select Facility
                                </FormLabel>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className="bg-zinc-300/50 dark:bg-zinc-700 dark:text-white border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none"
                                        >
                                            <SelectValue placeholder="Select a payment mode" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            sellerFacilities?.map((facility: any) => (
                                                <SelectItem
                                                    key={facility.id}
                                                    value={facility.id}
                                                    className="capitalize"
                                                >
                                                    {facility.name}
                                                </SelectItem>
                                            ))

                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </CardContent>
    )
}