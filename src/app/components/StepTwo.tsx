"use client";
import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { stepTwoSchema } from '@/app/utils/validation';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/app/utils/FormContext';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {CircleChevronLeft, CircleCheckBig } from "lucide-react";

interface StepTwoFormValues {
    terms: boolean;
    favorite: string;
}

const optionsMap: Record<string, string[]> = {
    Cars: ['Convertible', 'Sedan', 'SUV', 'Other'],
    Music: ['Folk', 'Jazz', 'Punk', 'Other'],
    Sport: ['Baseball', 'Basketball', 'Football', 'Ice Hockey', 'Other'],
};

export default function StepTwo() {
    const router = useRouter();
    const { stepOneData, setStepOneData } = useFormContext();
    const [loading, setLoading] = React.useState(false); // Add loading state

    const form = useForm<StepTwoFormValues>({
        resolver: yupResolver(stepTwoSchema),
        defaultValues: {
            terms: false,
            favorite: '',
        },
    });
    const { handleSubmit } = form;

    const onSubmit = async (data: StepTwoFormValues) => {
        setLoading(true); // Set loading to true
        console.log({ ...stepOneData, ...data });

        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay
        setLoading(false); // Set loading to false after the action
    };

    const handleBack = () => {
        setStepOneData(stepOneData);
        router.push('/');
    };

    return (
        <>
            <Form {...form}>
                <Card>
                    <CardHeader>
                        <CardTitle>2/2 Can you tell us something about yourself?</CardTitle>
                    </CardHeader>
                    {stepOneData && <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="favorite"
                                    render={({field}) => (
                                        <FormItem>
                                            <div className='mb-2'>Tell us more about your interest:</div>
                                            <FormLabel>
                                                {stepOneData.interest === 'Cars' ? 'Favorite Car Type' :
                                                    stepOneData.interest === 'Music' ? 'Favorite Music Genre' :
                                                        'Favorite Sport'}
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue
                                                            placeholder={stepOneData.interest === 'Cars' ? 'Select a car type' :
                                                                stepOneData.interest === 'Music' ? 'Select a music genre' :
                                                                    'Select a sport'}/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {optionsMap[stepOneData.interest].map(option => (
                                                            <SelectItem key={option} value={option}>
                                                                {option}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="terms"
                                    render={({field}) => (
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    ref={field.ref}
                                                />
                                            </FormControl>
                                            <FormLabel
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">I accept the <a href='#'>Terms and Conditions</a></FormLabel>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button type="button" variant="secondary" onClick={handleBack}>
                                <CircleChevronLeft/> Back
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Loading...' : <>Submit <CircleCheckBig /></>}
                            </Button>
                        </CardFooter>
                    </form>
                    }
                </Card>
            </Form>
        </>
    );
}
