import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface BoxDetailsProps {
    form: any;
    isLoading: boolean;
}
export const BoxDetails = ({ form, isLoading }: BoxDetailsProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numericValue = e.target.value.replace(/[^0-9.]/g, '');
        const parts = numericValue.split('.');
        if (parts.length > 2) {
            numericValue = parts[0] + '.' + parts.slice(1).join('');
        }
        const field = e.target.name;
        form.setValue(field, numericValue);
    };

    const isError = (name: string) => {
        return form.formState.isSubmitted && form.formState.errors[name] ? true : false;
    };

    return (
        <CardContent className="grid grid-cols-4 gap-3 items-center justify-items-center">
            <div className="col-span-4">
                <FormField
                    control={form.control}
                    name="numberOfBoxes"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>How many box will you ship?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-3"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            1
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            2
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="3" />
                                        </FormControl>
                                        <FormLabel className="font-normal">3</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="4" />
                                        </FormControl>
                                        <FormLabel className="font-normal">4</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="5" />
                                        </FormControl>
                                        <FormLabel className="font-normal">5</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
            <FormField
                control={form.control}
                name="orderBoxLength"
                render={({ field }) => (
                    <FormItem className='w-full'>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-row justify-between items-center">
                                <Input
                                    disabled={isLoading}
                                    className={cn("w-full bg-zinc-200/50  text-center dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                                        isError(field.name) ? "border-red-500 dark:border-red-500" : "border-0 dark:border-0"
                                    )}
                                    placeholder="L"
                                    {...field}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="orderBoxWidth"
                render={({ field }) => (
                    <FormItem className='w-full'>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-row justify-between items-center">
                                <Input
                                    disabled={isLoading}
                                    className={cn("w-full bg-zinc-200/50 text-center dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                                        isError(field.name) ? "border-red-500 dark:border-red-500" : "border-0 dark:border-0"
                                    )}
                                    placeholder="B"
                                    {...field}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="orderBoxHeight"
                render={({ field }) => (
                    <FormItem className='w-full'>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-row justify-between items-center">
                                <Input
                                    disabled={isLoading}
                                    className={cn("w-full bg-zinc-200/50 text-center dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                                        isError(field.name) ? "border-red-500 dark:border-red-500" : "border-0 dark:border-0"
                                    )}
                                    placeholder="H"
                                    {...field}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                    </FormItem>
                )}
            />
            <Button type='button' variant={"secondary"}>cm</Button>
            <FormDescription className="col-span-4 w-full">Length x Breadth x Height should be at-least 15cm.</FormDescription>
            <div className="col-span-4 flex items-end gap-3 w-full">
                <FormField
                    control={form.control}
                    name="orderWeight"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel
                                className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                            >
                                Weight
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    className={cn("w-full bg-zinc-200/50 dark:bg-zinc-700 dark:text-white focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                                        isError(field.name) ? "border-red-500 dark:border-red-500" : "border-0 dark:border-0"
                                    )}
                                    placeholder="Enter weight"
                                    {...field}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormDescription>Package weight should be 0.5kg.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='button' variant={"secondary"}>kg</Button>
            </div>

        </CardContent>
    );
}